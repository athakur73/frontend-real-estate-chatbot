// const API_BASE = "http://98.81.182.8:8000";
const API_BASE = "http://localhost:8000";

// const API_BASE = "/backend";


/**
 * Send chat message
 */
export async function sendMessage(message, sessionId) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      session_id: sessionId
    })
  });

  if (!res.ok) throw new Error("Chat failed");
  return res.json();
}

/**
 * Save property
 */
export async function saveProperty(propertyId, sessionId) {
  const res = await fetch(`${API_BASE}/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      property_id: propertyId,
      session_id: sessionId
    })
  });

  if (!res.ok) throw new Error("Save failed");
  return res.json();
}

/**
 * Recommend properties
 */
export async function recommendProperties(filters) {
  const res = await fetch(`${API_BASE}/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters)
  });

  if (!res.ok) throw new Error("Recommend failed");
  return res.json();
}

/**
 * Create property
 */
export async function createProperty(data) {
  const res = await fetch(`${API_BASE}/properties`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Create property failed");
  return res.json();
}

/**
 * Get saved properties
 */
export async function getSavedProperties(sessionId) {
  const res = await fetch(
    `${API_BASE}/users/${sessionId}/saved-properties`
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to fetch saved properties");
  }

  return res.json();
}
