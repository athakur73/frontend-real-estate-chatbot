import { useState } from "react";
import PropertyCard from "../components/PropertyCard";
import { getRecommendations } from "../services/recommendApi";

function RecommendPage() {
  const [filters, setFilters] = useState({
    budget: "",
    min_bedrooms: "",
    location: "",
    amenities: [],
    sortBy: "recommended"
  });

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      budget: "",
      min_bedrooms: "",
      location: "",
      amenities: [],
      sortBy: "recommended"
    });
    setProperties([]);
  };

  const fetchRecommendations = async () => {
    try {
      setLoading(true);

      const payload = {
        budget: filters.budget ? Number(filters.budget) : null,
        min_bedrooms: filters.min_bedrooms
          ? Number(filters.min_bedrooms)
          : null,
        location: filters.location || null,
        amenities: filters.amenities,
        sort_by: filters.sortBy
      };

      const data = await getRecommendations(payload);
      setProperties(data);
    } catch (err) {
      console.error("Recommendation failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageWrapper}>
      {/* ================= LEFT FILTER SIDEBAR ================= */}
      <aside style={sidebar}>
        <div style={sidebarTitle}>Filters</div>

        <FilterInput
          label="Budget"
          type="number"
          placeholder="Max budget"
          value={filters.budget}
          onChange={(v) => updateFilter("budget", v)}
        />

        <FilterInput
          label="Bedrooms"
          type="number"
          placeholder="Minimum bedrooms"
          value={filters.min_bedrooms}
          onChange={(v) => updateFilter("min_bedrooms", v)}
        />

        <FilterInput
          label="Location"
          placeholder="New York, Brooklyn…"
          value={filters.location}
          onChange={(v) => updateFilter("location", v)}
        />

        <AmenitySelect
          value={filters.amenities}
          onChange={(v) => updateFilter("amenities", v)}
        />

        <FilterSelect
          value={filters.sortBy}
          onChange={(v) => updateFilter("sortBy", v)}
        />

        <button style={primaryButton} onClick={fetchRecommendations}>
          Update Results
        </button>

        <button style={secondaryButton} onClick={clearFilters}>
          Clear Filters
        </button>

        {/* SELECTED AMENITY CHIPS */}
        {filters.amenities.length > 0 && (
          <div style={chipContainer}>
            {filters.amenities.map((a) => (
              <span
                key={a}
                style={amenityChip}
                onClick={() =>
                  updateFilter(
                    "amenities",
                    filters.amenities.filter((x) => x !== a)
                  )
                }
              >
                {a} ✕
              </span>
            ))}
          </div>
        )}
      </aside>

      {/* ================= RESULTS ================= */}
      <main style={content}>
        <h1 style={title}>Recommended for You</h1>
        <p style={subtitle}>
          Properties ranked by price fit, size, and amenities.
        </p>

        {loading && <p>Finding best matches…</p>}

        <div style={grid}>
          {properties.map((property, index) => (
            <div key={property.id}>
              <div style={rankRow}>
                <div style={rankBadge}>#{index + 1}</div>

                <div style={{ textAlign: "right" }}>
                  {property.price && (
                    <div style={priceText}>
                      ${property.price.toLocaleString()}
                    </div>
                  )}
                  <ScoreBar score={property.total_score} />
                </div>
              </div>

              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* ================= FILTER COMPONENTS ================= */

function FilterInput({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div style={filterBlock}>
      <div style={labelStyle}>{label}</div>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      />
    </div>
  );
}

function FilterSelect({ value, onChange }) {
  return (
    <div style={filterBlock}>
      <div style={labelStyle}>Sort By</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      >
        <option value="recommended">Recommended</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
}

function AmenitySelect({ value, onChange }) {
  const OPTIONS = ["Gym", "Parking", "Elevator", "Pool", "Garage", "Garden"];

  return (
    <div style={filterBlock}>
      <div style={labelStyle}>Amenities</div>
      <select
        value=""
        onChange={(e) => {
          const v = e.target.value;
          if (v && !value.includes(v)) onChange([...value, v]);
        }}
        style={inputStyle}
      >
        <option value="">
          {value.length === 0 ? "Select amenities" : `${value.length} selected`}
        </option>
        {OPTIONS.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function ScoreBar({ score }) {
  return (
    <div style={{ width: 120 }}>
      <div style={{ fontSize: 12, fontWeight: 600 }}>
        {score}% match
      </div>
      <div style={scoreTrack}>
        <div
          style={{
            ...scoreFill,
            width: `${score}%`,
            background: score > 80 ? "#16A34A" : "#F59E0B"
          }}
        />
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const pageWrapper = {
  display: "flex",
  gap: 32,
  width: "100%",
  alignItems: "flex-start"
};

const sidebar = {
  width: 280,
  minWidth: 280,
  position: "sticky",
  top: 80,
  background: "#F8F7FF",
  borderRadius: 12,
  padding: 20,
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start"
};

const sidebarTitle = {
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 16
};

const filterBlock = {
  width: "100%",
  marginBottom: 14,
  textAlign: "left"
};

const content = {
  flex: 1
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
  gap: 32
};

const title = {
  fontSize: 28,
  fontWeight: 600
};

const subtitle = {
  color: "#6B7280",
  marginBottom: 32
};

const rankRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12
};

const rankBadge = {
  width: 32,
  height: 32,
  borderRadius: "50%",
  background: "#4F46E5",
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700
};

const priceText = {
  fontSize: 16,
  fontWeight: 700,
  color: "#16A34A",
  marginBottom: 6
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 6,
  border: "1px solid #CBD5E1",
  background: "#FFFFFF",
  fontSize: 14,
  boxSizing: "border-box"
};

const labelStyle = {
  fontSize: 12,
  fontWeight: 600,
  marginBottom: 4
};

const primaryButton = {
  width: "100%",
  background: "#111827",
  color: "#FFFFFF",
  padding: "10px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  marginBottom: 8
};

const secondaryButton = {
  width: "100%",
  background: "#FFFFFF",
  border: "1px solid #CBD5E1",
  padding: "10px",
  borderRadius: 6,
  cursor: "pointer"
};

const chipContainer = {
  marginTop: 16,
  display: "flex",
  flexWrap: "wrap",
  gap: 6
};

const amenityChip = {
  padding: "6px 10px",
  background: "#111827",
  color: "#FFFFFF",
  borderRadius: 999,
  fontSize: 12,
  cursor: "pointer"
};

const scoreTrack = {
  height: 6,
  borderRadius: 999,
  background: "#E5E7EB",
  overflow: "hidden"
};

const scoreFill = {
  height: "100%"
};

export default RecommendPage;
