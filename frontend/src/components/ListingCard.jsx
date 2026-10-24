import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ListingCard.css";

// A listing is "new" if it was created in the last 7 days
const isNewListing = (createdAt) => {
  if (!createdAt) return false;
  const days = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
  return days <= 7;
};

function ListingCard({ listing }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const sellerName = listing.seller?.email
    ? listing.seller.email.split("@")[0]
    : "designer";

  const openDetails = () => navigate(`/listing/${listing.listingId}`);

  const toggleLike = (e) => {
    e.stopPropagation(); // don't open the listing when clicking the heart
    setLiked(!liked);
  };

  return (
    <div className="listing-card" onClick={openDetails}>
      <div className="listing-image-container">
        <img
          src={listing.imageUrl || "/images/tshirt1.jpeg"}
          alt={listing.title}
          className="listing-image"
          onError={(e) => {
            e.target.src = "/images/tshirt1.jpeg";
          }}
        />

        {/* Badges */}
        <div className="listing-badges">
          {isNewListing(listing.createdAt) && (
            <span className="listing-badge badge-new">New</span>
          )}
          <span
            className={`listing-badge ${
              listing.listingType === "DESIGN" ? "badge-pod" : "badge-stock"
            }`}
          >
            {listing.listingType === "DESIGN" ? "Print on Demand" : "Ready Stock"}
          </span>
        </div>
      </div>

      <div className="listing-info">
        <h3 className="listing-title">{listing.title}</h3>
        <p className="listing-seller">by @{sellerName}</p>

        <div className="listing-footer">
          <span className="listing-price">
            LKR {listing.price?.toLocaleString()}
          </span>

          <div className="listing-actions">
            <button
              className={`listing-heart ${liked ? "liked" : ""}`}
              onClick={toggleLike}
              title="Save to wishlist"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            <button
              className="listing-view-button"
              onClick={(e) => {
                e.stopPropagation();
                openDetails();
              }}
            >
              View Design →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;