import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getListingById } from "../services/api";
import "../styles/ListingDetail.css";

function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await getListingById(id);
        setListing(response.data);
      } catch (err) {
        setError("Listing not found");
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  if (loading) return <div className="listing-detail-loading">Loading...</div>;
  if (error) return <div className="listing-detail-error">{error}</div>;
  if (!listing) return null;

  return (
    <div className="listing-detail-container">
      {/* Back button */}
      <button onClick={() => navigate(-1)} className="listing-detail-back">
        ← Back
      </button>

      <div className="listing-detail-content">
        {/* Left — Image */}
        <div className="listing-detail-image-section">
          <img
            src={listing.imageUrl && listing.imageUrl.startsWith("http")
              ? listing.imageUrl
              : "https://placehold.co/600x500?text=DesignDrop"}
            alt={listing.title}
            className="listing-detail-image"
          />
          <span className={`listing-detail-badge ${listing.listingType === "DESIGN"
            ? "badge-design" : "badge-stock"}`}>
            {listing.listingType === "DESIGN" ? "Print on Demand" : "Ready Stock"}
          </span>
        </div>

        {/* Right — Info */}
        <div className="listing-detail-info">
          <h1 className="listing-detail-title">{listing.title}</h1>
          <p className="listing-detail-price">
            LKR {listing.price?.toLocaleString()}
          </p>
          <p className="listing-detail-description">{listing.description}</p>

          <div className="listing-detail-meta">
            <div className="listing-detail-meta-item">
              <span className="meta-label">Category</span>
              <span className="meta-value">{listing.category?.name}</span>
            </div>
            <div className="listing-detail-meta-item">
              <span className="meta-label">Type</span>
              <span className="meta-value">{listing.listingType}</span>
            </div>
            {listing.stockQuantity && (
              <div className="listing-detail-meta-item">
                <span className="meta-label">Stock</span>
                <span className="meta-value">{listing.stockQuantity} available</span>
              </div>
            )}
          </div>

          <button className="listing-detail-buy-button">
            Buy Now — LKR {listing.price?.toLocaleString()}
          </button>

          {/* Seller info */}
          <div className="listing-detail-seller">
            <p className="seller-label">Sold by</p>
            <Link
              to={`/profile/${listing.seller?.email}`}
              className="seller-link"
            >
              🎨 {listing.seller?.email}
            </Link>
            <p className="seller-role">{listing.seller?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetail;