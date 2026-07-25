import { useState, useEffect } from "react";
import { getListings } from "../services/api";
import ListingCard from "../components/ListingCard";
import "../styles/Home.css";

function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");

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

  const filteredListings = listings.filter((l) => {
    if (filter === "ALL") return true;
    return l.listingType === filter;
  });

  return (
    <div className="home-container">
      {/* Hero */}
      <div className="home-hero">
        <h1 className="home-title">
          Sri Lanka's First<br />
          <span>Design Marketplace</span>
        </h1>
        <p className="home-subtitle">
          Discover unique t-shirt designs from independent Sri Lankan creators.
          Buy prints or license original artwork for your brand.
        </p>
        <div className="home-hero-buttons">
          <a href="/register" className="home-cta-button">
            Start Selling →
          </a>
          <a href="/register" className="home-cta-secondary">
            Browse as Company
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="home-stats">
        <div className="home-stat">
          <div className="home-stat-number">{listings.length}+</div>
          <div className="home-stat-label">Designs Available</div>
        </div>
        <div className="home-stat">
          <div className="home-stat-number">100%</div>
          <div className="home-stat-label">Original Artwork</div>
        </div>
        <div className="home-stat">
          <div className="home-stat-number">DTF</div>
          <div className="home-stat-label">Print Quality</div>
        </div>
        <div className="home-stat">
          <div className="home-stat-number">LKR</div>
          <div className="home-stat-label">Local Currency</div>
        </div>
      </div>

      {/* Listings */}
      <div className="home-body">
        <div className="home-filters">
          <button
            onClick={() => setFilter("ALL")}
            className={`home-filter-btn ${filter === "ALL" ? "active" : ""}`}
          >
            All Designs
          </button>
          <button
            onClick={() => setFilter("DESIGN")}
            className={`home-filter-btn ${filter === "DESIGN" ? "active" : ""}`}
          >
            Print on Demand
          </button>
          <button
            onClick={() => setFilter("STOCK")}
            className={`home-filter-btn ${filter === "STOCK" ? "active" : ""}`}
          >
            Ready Stock
          </button>
        </div>

        <div className="home-section-header">
          <h2 className="home-section-title">
            {filter === "ALL" ? "All Listings" : filter === "DESIGN" ? "Print on Demand" : "Ready Stock"}
            <span className="home-count"> ({filteredListings.length})</span>
          </h2>
        </div>

        {loading && <p className="home-loading">Loading designs...</p>}
        {error && <p className="home-error">{error}</p>}

        <div className="home-grid">
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <ListingCard key={listing.listingId} listing={listing} />
            ))
          ) : (
            !loading && <p className="home-empty">No listings available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;