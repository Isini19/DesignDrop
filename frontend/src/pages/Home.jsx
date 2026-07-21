import { useState, useEffect } from "react";
import { getListings } from "../services/api";
import ListingCard from "../components/ListingCard";
import "../styles/Home.css";

function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getListings();
        setListings(response.data);
      } catch (err) {
        setError("Failed to load listings");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="home-hero">
        <h1 className="home-title">Discover Unique Designs</h1>
        <p className="home-subtitle">
          Browse original t-shirt designs from Sri Lanka's best creators
        </p>
        <a href="/register" className="home-cta-button">
          Start Selling →
        </a>
      </div>

      {/* Listings Grid */}
      <div className="home-section">
        <h2 className="home-section-title">Latest Designs</h2>

        {loading && <p className="home-loading">Loading listings...</p>}
        {error && <p className="home-error">{error}</p>}

        <div className="home-grid">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <ListingCard key={listing.listingId} listing={listing} />
            ))
          ) : (
            !loading && (
              <p className="home-empty">No listings available yet.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;