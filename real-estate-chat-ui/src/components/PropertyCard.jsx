import { useState } from "react";
import { saveProperty } from "../services/chatApi";

function PropertyCard({ property }) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Image */}
      <div style={{ height: 120, position: "relative" }}>
        <img
          src={property.image_url}
          alt={property.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(0.9)"
          }}
        />

        {/* Save */}
        <button
          onClick={() => setSaved(true)}
          title={saved ? "Saved" : "Save"}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            cursor: "pointer",
            fontSize: 14,
            color: saved ? "#16A34A" : "#64748B"
          }}
        >
          {saved ? "✔" : "♡"}
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: "12px 14px" }}>
        {/* Title + Price */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 4
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#111827",
              lineHeight: "1.3",
              maxWidth: "70%"
            }}
          >
            {property.title}
          </div>

          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#2563EB",
              whiteSpace: "nowrap"
            }}
          >
            ₹{property.price.toLocaleString()}
          </div>
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: 12,
            color: "#6B7280",
            marginBottom: 8
          }}
        >
          📍 {property.location}
        </div>

        {/* Specs */}
        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 12,
            color: "#374151",
            marginBottom: 8
          }}
        >
          <span>{property.bedrooms} BHK</span>
          <span>{property.bathrooms} BEDROOMS</span>
          <span>{property.size_sqft} SQFT</span>
        </div>

        {/* Amenities */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6
          }}
        >
          {property.amenities?.slice(0, 3).map((a, i) => (
            <span
              key={i}
              style={{
                fontSize: 11,
                background: "#F3F4F6",
                color: "#374151",
                padding: "3px 8px",
                borderRadius: 999
              }}
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
