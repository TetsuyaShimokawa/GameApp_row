import { useState, useEffect } from "react";
import SetupScreen from "./components/SetupScreen";
import GameScreen from "./components/GameScreen";
import FinishScreen from "./components/FinishScreen";
import { fetchGames } from "./api/client";
import "./App.css";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [screen, setScreen] = useState("setup");
  const [subjectId, setSubjectId] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGames()
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((e) => {
        setError("ゲームデータの取得に失敗しました。バックエンドが起動しているか確認してください。");
        setLoading(false);
        console.error(e);
      });
  }, []);

  function handleStart(id) {
    setSubjectId(id);
    setGames((prev) => shuffle(prev));
    setScreen("game");
  }

  if (loading) {
    return <div className="screen loading-screen">読み込み中...</div>;
  }

  if (error) {
    return <div className="screen error-screen">{error}</div>;
  }

  return (
    <>
      {screen === "setup" && <SetupScreen onStart={handleStart} />}
      {screen === "game" && (
        <GameScreen
          games={games}
          subjectId={subjectId}
          onFinish={() => setScreen("finish")}
        />
      )}
      {screen === "finish" && <FinishScreen subjectId={subjectId} />}
    </>
  );
}
