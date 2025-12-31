// const API_BASE = "http://98.81.182.8:8000";
// const API_BASE = "https://real-estate-chatbot-shrv.onrender.com/";
const API_BASE = "/api";

/**
 * Send chat message to backend
 */
export async function sendMessage(message, sessionId) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      session_id: sessionId
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to send message");
  }

  return res.json();
}

/**
 * Save property to MongoDB
 */
export async function saveProperty(propertyId, sessionId) {
  const res = await fetch(`${API_BASE}/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      property_id: propertyId,
      session_id: sessionId
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to save property");
  }

  return res.json();
}
