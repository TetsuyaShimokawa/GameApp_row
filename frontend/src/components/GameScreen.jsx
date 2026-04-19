import { useState, useEffect } from "react";
import PayoffTable from "./PayoffTable";
import ChoiceButtons from "./ChoiceButtons";
import { useTimer } from "../hooks/useTimer";
import { postResult } from "../api/client";

export default function GameScreen({ games, subjectId, onFinish }) {
  const [trialIndex, setTrialIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { start, stop } = useTimer();

  const currentGame = games[trialIndex];

  useEffect(() => {
    setSelected(null);
    start();
  }, [trialIndex, start]);

  async function handleSubmit() {
    if (selected === null || submitting) return;
    const rt = stop();
    setSubmitting(true);

    try {
      await postResult({
        subject_id: subjectId,
        trial: trialIndex + 1,
        game_id: currentGame.id,
        game_name: currentGame.name,
        choice: selected,
        reaction_time: rt,
        timed_out: false,
        time_limit: null,
      });
    } catch (e) {
      console.error("Failed to post result:", e);
    }

    if (trialIndex + 1 < games.length) {
      setTrialIndex((i) => i + 1);
    } else {
      onFinish();
    }
    setSubmitting(false);
  }

  return (
    <div className="screen game-screen">
      <div className="game-header">
        <h2 className="game-title">{currentGame.name}</h2>
        <span className="game-progress">
          {trialIndex + 1} / {games.length} 問目
        </span>
      </div>

      <PayoffTable
        payoff={currentGame.payoff}
        numRows={currentGame.num_rows}
        numCols={currentGame.num_cols}
      />

      <div className="game-footer">
        <ChoiceButtons
          numRows={currentGame.num_rows}
          selected={selected}
          onChange={setSelected}
        />
        <button
          className="btn-primary btn-submit"
          disabled={selected === null || submitting}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
