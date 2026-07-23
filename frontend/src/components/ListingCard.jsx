import "../styles/ListingCard.css";

function ListingCard({ listing }) {
  return (
    <div className="listing-card">
      {/* Design image */}
      <div className="listing-image-container">
        <img
          src={listing.imageUrl && listing.imageUrl.startsWith("http")
            ? listing.imageUrl
            : "https://placehold.co/400x300?text=DesignDrop"}
          alt={listing.title}
          className="listing-image"
        />
        {/* Listing type badge */}
        <span className={`listing-badge ${listing.listingType === "DESIGN"
          ? "listing-badge-design"
          : "listing-badge-stock"}`}>
          {listing.listingType === "DESIGN" ? "Print on Demand" : "Ready Stock"}
        </span>
      </div>

      <div className="listing-info">
        <h3 className="listing-title">{listing.title}</h3>
        <p className="listing-description">{listing.description}</p>
        <div className="listing-footer">
          <span className="listing-price">LKR {listing.price?.toLocaleString()}</span>
          <button className="listing-buy-button">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;