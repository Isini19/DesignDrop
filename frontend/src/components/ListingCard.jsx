import "../styles/ListingCard.css";

function ListingCard({ listing }) {
  return (
    <div className="listing-card">
      <div className="listing-image-container">
        <img
          src={listing.imageUrl || "/placeholder.png"}
          alt={listing.title}
          className="listing-image"
        />
      </div>

      <div className="listing-info">
        <h3 className="listing-title">{listing.title}</h3>
        <p className="listing-description">{listing.description}</p>
        <div className="listing-footer">
          <span className="listing-price">LKR {listing.price}</span>
          <span className="listing-type">{listing.listingType}</span>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;