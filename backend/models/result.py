from pydantic import BaseModel
from typing import Optional


class ResultIn(BaseModel):
    subject_id: str
    trial: int
    game_id: int
    game_name: str
    choice: int
    reaction_time: float
    timed_out: bool = False
    time_limit: Optional[float] = None


class ResultOut(ResultIn):
    pass
