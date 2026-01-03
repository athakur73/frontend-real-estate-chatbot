import PropertyCard from "./PropertyCard";
import { saveProperty } from "../services/chatApi";

function PropertyList({ properties = [], sessionId }) {
  if (!properties.length) {
    return <p>No properties found.</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 24
      }}
    >
      {properties.map((property) => (
        <PropertyCard
          key={property.id}                 // ✅ always use property.id
          property={property}
          onSave={() =>
            saveProperty(property.id, sessionId) // ✅ send STRING id
          }
        />
      ))}
    </div>
  );
}

export default PropertyList;
