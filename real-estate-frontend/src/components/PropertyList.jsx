import React from "react";

import "/src/components/styles/property.css"



function PropertyList({ properties = [], onSave }) {
  if (!properties.length) {
    return <p className="no-results">No properties found.</p>;
  }

  return (
    <div className="property-wrapper">
      {properties.map((p) => (
        <div className="property-card" key={p.id}>
          <img
            src={p.image}
            alt={p.title}
            className="property-img"
            onError={(e) => (e.target.src = "/images/default.jpg")}
          />

          <div className="property-body">
            <h3 className="property-title">{p.title}</h3>

            <p className="property-meta">
              📍 {p.city}
            </p>

            <p className="property-meta">
              💰 ₹{p.price?.toLocaleString()}
            </p>

            <p className="property-meta">
              🏡 {p.bhk} BHK
            </p>

            {/* ⭐ Amenities */}
            {p.amenities?.length > 0 && (
              <ul className="amenities">
                {p.amenities.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            )}

            <button
              className="save-btn"
              onClick={() => onSave && onSave(p)}
            >
              💾 Save Property
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
