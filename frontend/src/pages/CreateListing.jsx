import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createListing } from "../services/api";
import axios from "axios";
import "../styles/CreateListing.css";

function CreateListing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    listingType: "DESIGN",
    stockQuantity: "",
    imageUrl: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch categories when page loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categories");
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await createListing(formData, user.email);
      setSuccess("Listing submitted! Waiting for admin approval.");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.response?.data || "Failed to create listing");
    }
  };

  // Only designers and companies can create listings
  if (user?.role === "CUSTOMER" || user?.role === "ADMIN") {
    return (
      <div className="create-listing-container">
        <p className="create-listing-error">
          Only designers and companies can create listings.
        </p>
      </div>
    );
  }

  return (
    <div className="create-listing-container">
      <div className="create-listing-card">
        <h2 className="create-listing-title">Create New Listing</h2>

        {error && <p className="create-listing-error">{error}</p>}
        {success && <p className="create-listing-success">{success}</p>}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-field">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="e.g. Cool Dragon Tee"
            />
          </div>

          {/* Description */}
          <div className="form-field">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input form-textarea"
              placeholder="Describe your design..."
            />
          </div>

          {/* Price */}
          <div className="form-field">
            <label className="form-label">Price (LKR)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="e.g. 1500"
            />
          </div>

          {/* Listing Type */}
          <div className="form-field">
            <label className="form-label">Listing Type</label>
            <select
              name="listingType"
              value={formData.listingType}
              onChange={handleChange}
              className="form-input"
            >
              <option value="DESIGN">Design (Print on Demand)</option>
              <option value="STOCK">Stock (Ready Made)</option>
            </select>
          </div>

          {/* Stock Quantity — only show for STOCK type */}
          {formData.listingType === "STOCK" && (
            <div className="form-field">
              <label className="form-label">Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g. 50"
              />
            </div>
          )}

          {/* Category */}
          <div className="form-field">
            <label className="form-label">Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div className="form-field">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. https://example.com/image.jpg"
            />
          </div>

          <button type="submit" className="create-listing-button">
            Submit Listing
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateListing;