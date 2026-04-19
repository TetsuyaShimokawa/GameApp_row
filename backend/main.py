import csv
import io
import math
from collections import defaultdict
from datetime import datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from data.games import GAMES
from models.result import ResultIn

app = FastAPI(title="GameApp_row API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://gameapp-row-frontend.onrender.com",
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store: subject_id -> list of result dicts
results_store: dict[str, list[dict]] = defaultdict(list)


@app.get("/api/games")
def get_games():
    return GAMES


@app.post("/api/results", status_code=201)
def post_result(result: ResultIn):
    row = result.model_dump()
    results_store[result.subject_id].append(row)
    return {"status": "ok"}


@app.get("/api/results/{subject_id}/csv")
def get_csv(subject_id: str):
    rows = results_store.get(subject_id)
    if not rows:
        raise HTTPException(status_code=404, detail="No results found for this subject_id")

    fieldnames = ["SubjectID", "Trial", "GameID", "GameName", "Choice", "ReactionTime", "TimedOut", "TimeLimit"]

    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=fieldnames)
    writer.writeheader()
    for r in rows:
        writer.writerow({
            "SubjectID": r["subject_id"],
            "Trial": r["trial"],
            "GameID": r["game_id"],
            "GameName": r["game_name"],
            "Choice": r["choice"],
            "ReactionTime": round(r["reaction_time"], 3),
            "TimedOut": r["timed_out"],
            "TimeLimit": "" if r["time_limit"] is None or (isinstance(r["time_limit"], float) and math.isnan(r["time_limit"])) else r["time_limit"],
        })

    output.seek(0)
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"Exp_result_row_{subject_id}_{ts}.csv"
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
