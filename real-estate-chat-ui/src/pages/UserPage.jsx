import { useEffect, useState } from "react";
import { getSavedProperties } from "../services/chatApi";
import PropertyCard from "../components/PropertyCard";
import { getSessionId } from "../utils/session";

function UserPage() {
  // ✅ ONE STABLE SESSION ID
  const sessionId = getSessionId();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSaved = async () => {
      try {
        const data = await getSavedProperties(sessionId);
        setProperties(data);
      } catch (err) {
        console.error("Failed to load saved properties:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSaved();
  }, [sessionId]);

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
        My Saved Properties
      </h2>

      {loading && <p>Loading saved properties...</p>}

      {!loading && properties.length === 0 && (
        <p style={{ color: "#64748B" }}>
          No saved properties yet. Start exploring and save your favorites ❤️
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 16
        }}
      >
        {properties.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  );
}

export default UserPage;
