const API_BASE = "http://localhost:8001";

/**
 * Send chat message to backend
 */
export async function sendMessage(message, sessionId) {
  const response = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      session_id: sessionId
    })
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
}

/**
 * Save property to MongoDB
 */
export async function saveProperty(propertyId, sessionId) {
  const response = await fetch(`${API_BASE}/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      property_id: propertyId,
      session_id: sessionId
    })
  });

  if (!response.ok) {
    throw new Error("Failed to save property");
  }

  return response.json();
}
