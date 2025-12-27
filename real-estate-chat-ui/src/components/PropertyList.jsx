import PropertyCard from "./PropertyCard";

function PropertyList({ properties = [] }) {
  if (properties.length === 0) {
    return (
      <div style={{ color: "#6B7280", fontSize: 14 }}>
        No properties found. Try refining your search.
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 10px 30px rgba(15,23,42,0.08)"
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "#111827",
          marginBottom: 20
        }}
      >
        Results ({properties.length})
      </div>

      {/* ✅ EXACTLY 3 PER ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 👈 key change
          gap: 24,
          alignItems: "stretch"
        }}
      >
        {properties.map((property) => (
          <PropertyCard
            key={property.id || property.title}
            property={property}
          />
        ))}
      </div>
    </div>
  );
}

export default PropertyList;
