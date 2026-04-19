const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function fetchGames() {
  const res = await fetch(`${BASE_URL}/api/games`);
  if (!res.ok) throw new Error("Failed to fetch games");
  return res.json();
}

export async function postResult(result) {
  const res = await fetch(`${BASE_URL}/api/results`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
  });
  if (!res.ok) throw new Error("Failed to post result");
  return res.json();
}

export function getCsvUrl(subjectId) {
  return `${BASE_URL}/api/results/${encodeURIComponent(subjectId)}/csv`;
}
