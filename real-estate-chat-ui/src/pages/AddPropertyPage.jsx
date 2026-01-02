import { useState } from "react";
import { createProperty } from "../services/chatApi";

function AddPropertyPage() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    size_sqft: "",
    amenities: "",
    image_url: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      await createProperty({
        title: form.title,
        location: form.location,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        size_sqft: Number(form.size_sqft),
        amenities: form.amenities
          ? form.amenities.split(",").map((a) => a.trim())
          : [],
        image_url: form.image_url || null
      });

      setSuccess("✅ Property added successfully!");

      setForm({
        title: "",
        location: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        size_sqft: "",
        amenities: "",
        image_url: ""
      });
    } catch (err) {
      alert("Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 520,
        background: "#FFFFFF",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 10px 30px rgba(15,23,42,0.08)"
      }}
    >
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
        Add New Property
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="location" placeholder="Location (e.g. Austin)" value={form.location} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="bedrooms" type="number" placeholder="Bedrooms" value={form.bedrooms} onChange={handleChange} required />
        <input name="bathrooms" type="number" placeholder="Bathrooms" value={form.bathrooms} onChange={handleChange} required />
        <input name="size_sqft" type="number" placeholder="Size (sqft)" value={form.size_sqft} onChange={handleChange} required />
        <input name="amenities" placeholder="Amenities (comma separated)" value={form.amenities} onChange={handleChange} />
        <input name="image_url" placeholder="Image URL (optional)" value={form.image_url} onChange={handleChange} />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 8,
            padding: "10px",
            background: "#4F46E5",
            color: "white",
            borderRadius: 8,
            fontWeight: 600,
            border: "none",
            cursor: "pointer"
          }}
        >
          {loading ? "Saving..." : "Add Property"}
        </button>

        {success && (
          <div style={{ color: "#16A34A", fontSize: 14 }}>
            {success}
          </div>
        )}
      </form>
    </div>
  );
}

export default AddPropertyPage;
