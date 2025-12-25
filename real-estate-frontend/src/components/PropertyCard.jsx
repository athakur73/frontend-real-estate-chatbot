function PropertyList({ properties, onSave }) {
  if (!properties || properties.length === 0) {
    return <p>No properties found.</p>;
  }

  return (
    <div>
      {properties.map((property) => (
        <div
          key={property.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          {/* ✅ PROPERTY IMAGE */}
          <img
              src={`http://localhost:8001${property.image}`}
              alt={property.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "4px",
                marginBottom: "10px",
              }}
              onError={(e) => {
                e.target.src = "http://localhost:8001/images/default.jpg";
              }}
            />


          <h4>{property.title}</h4>

          <p><strong>Location:</strong> {property.city}</p>
          <p><strong>Price:</strong> ${property.price}</p>
          <p><strong>Bedrooms:</strong> {property.bhk}</p>

          <button onClick={() => onSave(property)}>
            💾 Save Property
          </button>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
