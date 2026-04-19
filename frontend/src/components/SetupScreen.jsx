import { useState } from "react";

export default function SetupScreen({ onStart }) {
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  function handleStart() {
    if (!id.trim()) {
      setError("IDを入力してください。");
      return;
    }
    setError("");
    onStart(id.trim());
  }

  return (
    <div className="screen setup-screen">
      <h1 className="setup-title">ゲーム理論実験</h1>
      <div className="setup-form">
        <label htmlFor="subject-id">Input your ID</label>
        <input
          id="subject-id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleStart()}
          placeholder="被験者IDを入力"
        />
        {error && <p className="error-msg">{error}</p>}
        <button className="btn-primary" onClick={handleStart}>
          Start
        </button>
      </div>
    </div>
  );
}
