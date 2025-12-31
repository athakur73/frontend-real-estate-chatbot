import { useState } from "react";

function PropertyCard({ property }) {
  const [expanded, setExpanded] = useState(false);

  if (!property) return null;

  const {
    title,
    location,
    image_url,
    bedrooms,
    bathrooms,
    size_sqft,
    amenities,
    score_breakdown,
    reasons,
    price
  } = property;

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
        border: "1px solid #E5E7EB"
      }}
    >
      {/* ================= IMAGE ================= */}
      {image_url && (
        <div style={{ position: "relative", height: 240 }}>
          <img
            src={image_url}
            alt={title || "Property image"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />

          {/* ===== PRICE BADGE (TOP RIGHT) ===== */}
          {price !== undefined && (
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "#111827",
                color: "#FFFFFF",
                padding: "8px 14px",
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: 0.2,
                boxShadow: "0 6px 16px rgba(0,0,0,0.35)"
              }}
            >
              ${price.toLocaleString()}
            </div>
          )}
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <div style={{ padding: 20 }}>
        {/* TITLE */}
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
          {title}
        </div>

        {/* LOCATION */}
        <div style={{ fontSize: 13, color: "#64748B", marginBottom: 10 }}>
          📍 {location}
        </div>

        {/* SPECS */}
        <div
          style={{
            display: "flex",
            gap: 18,
            fontSize: 13,
            color: "#334155",
            marginBottom: 12
          }}
        >
          <span>{bedrooms} Beds</span>
          <span>{bathrooms} Baths</span>
          <span>{size_sqft} sqft</span>
        </div>

        {/* AMENITIES */}
        {amenities?.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 14
            }}
          >
            {amenities.slice(0, 6).map((a) => (
              <span
                key={a}
                style={{
                  fontSize: 12,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: "#F3F4F6"
                }}
              >
                {a}
              </span>
            ))}
          </div>
        )}

        {/* TOGGLE */}
        {(score_breakdown || reasons) && (
          <button
            onClick={() => setExpanded((v) => !v)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "#4F46E5",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            {expanded ? "Hide details" : "Why this match?"}
          </button>
        )}

        {/* EXPANDED */}
        {expanded && (
          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px solid #E5E7EB"
            }}
          >
            {/* SCORE BREAKDOWN */}
            {score_breakdown && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
                  Match score breakdown
                </div>

                {Object.entries(score_breakdown).map(([key, value]) => (
                  <div key={key} style={{ marginBottom: 8 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 13,
                        marginBottom: 4
                      }}
                    >
                      <span>{formatLabel(key)}</span>
                      <span>{Math.round(value)}%</span>
                    </div>

                    <div
                      style={{
                        height: 6,
                        borderRadius: 999,
                        background: "#E5E7EB"
                      }}
                    >
                      <div
                        style={{
                          width: `${value}%`,
                          height: "100%",
                          borderRadius: 999,
                          background:
                            value > 80
                              ? "#16A34A"
                              : value > 60
                              ? "#F59E0B"
                              : "#EF4444"
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* REASONS */}
            {reasons?.length > 0 && (
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
                  Why this property?
                </div>

                <ul style={{ fontSize: 13, paddingLeft: 18 }}>
                  {reasons.map((r, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function formatLabel(key) {
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default PropertyCard;
