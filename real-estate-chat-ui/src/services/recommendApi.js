const API_BASE = "/api";
export async function getRecommendations(payload) {
  const res = await fetch('${API_BASE}/recommend', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return response.json();
}
