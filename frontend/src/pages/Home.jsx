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

      {/* ===== HERO SECTION ===== */}
<div className="home-hero">
  <div className="home-hero-inner">

    {/* Left content */}
    <div className="home-hero-left">
      <div className="home-hero-badge">✨ WEAR YOUR IDEAS</div>
      <h1 className="home-title">
        Unique T-Shirt Designs<br />
        for Every <span className="home-title-accent">Story</span>
      </h1>
      <p className="home-subtitle">
        Shop original designs from independent creators
        or get exclusive designs for your brand.
      </p>
      <div className="home-hero-buttons">
        <a href="#listings" className="home-cta-primary">
          Explore Designs →
        </a>
        <a href="/register" className="home-cta-outline">
          For Companies
        </a>
      </div>

      {/* Trust badges */}
      <div className="home-trust-badges">
        <div className="trust-badge">
          <span className="trust-icon">🎨</span>
          <div>
            <p className="trust-label">Original Designs</p>
            <p className="trust-sub">By Real Creators</p>
          </div>
        </div>
        <div className="trust-divider" />
        <div className="trust-badge">
          <span className="trust-icon">🔒</span>
          <div>
            <p className="trust-label">Secure Payments</p>
            <p className="trust-sub">& Fast Delivery</p>
          </div>
        </div>
        <div className="trust-divider" />
        <div className="trust-badge">
          <span className="trust-icon">🏢</span>
          <div>
            <p className="trust-label">For Companies</p>
            <p className="trust-sub">Exclusive Licensing</p>
          </div>
        </div>
      </div>
    </div>

    {/* Right — T-shirt mockup */}
    <div className="home-hero-right">
      <div className="hero-image-wrapper">
        <div className="hero-image-bg" />
        <img
          src="/images/hero-tshirt.png"
          alt="Featured Design"
          className="hero-tshirt-img"
          onError={(e) => {
            e.target.src = "/images/tshirt1.jpeg";
          }}
        />
        
        
      </div>
    </div>

  </div>
</div>

      {/* ===== HOW IT WORKS ===== */}
<div className="home-how">
  <div className="home-section-container">
    <div className="home-section-label">Simple Process</div>
    <h2 className="home-section-heading">How DesignDrop Works</h2>
    <div className="home-steps">

      <div className="home-step">
        <div className="step-icon-wrapper" style={{backgroundColor: 'rgba(233,69,96,0.1)'}}>
          <span className="step-icon">🎨</span>
        </div>
        <div className="step-number">01</div>
        <h3 className="step-title">Create & Upload</h3>
        <p className="step-desc">
          Designers upload their original artwork.
          Each design goes through our originality review before going live.
        </p>
      </div>

      <div className="home-step-arrow">→</div>

      <div className="home-step">
        <div className="step-icon-wrapper" style={{backgroundColor: 'rgba(40,167,69,0.1)'}}>
          <span className="step-icon">✅</span>
        </div>
        <div className="step-number">02</div>
        <h3 className="step-title">Get Approved</h3>
        <p className="step-desc">
          Our team reviews each submission for quality and originality.
          Approved designs go live on the marketplace.
        </p>
      </div>

      <div className="home-step-arrow">→</div>

      <div className="home-step">
        <div className="step-icon-wrapper" style={{backgroundColor: 'rgba(255,193,7,0.1)'}}>
          <span className="step-icon">💰</span>
        </div>
        <div className="step-number">03</div>
        <h3 className="step-title">Sell & Earn</h3>
        <p className="step-desc">
          Customers and companies discover your designs.
          Sell prints or license your artwork exclusively to brands.
        </p>
      </div>

      <div className="home-step-arrow">→</div>

      <div className="home-step">
        <div className="step-icon-wrapper" style={{backgroundColor: 'rgba(102,16,242,0.1)'}}>
          <span className="step-icon">🚀</span>
        </div>
        <div className="step-number">04</div>
        <h3 className="step-title">Grow Together</h3>
        <p className="step-desc">
          Be part of a creative community and turn your passion into
          a real income opportunity.
        </p>
      </div>

    </div>
  </div>
</div>

      
      {/* ===== CATEGORIES SECTION ===== */}
<div className="home-categories">
  <div className="home-section-container">
    <div className="home-section-label">Browse By Style</div>
    <h2 className="home-section-heading">Popular Categories</h2>

    <div className="home-categories-grid">
      {[
        { name: "Streetwear", image: "/images/tshirt1.jpeg" },
        { name: "Minimalist", image: "/images/tshirt2.jpeg" },
        { name: "Anime", image: "/images/tshirt3.jpeg" },
        { name: "Abstract", image: "/images/tshirt4.jpeg" },
        { name: "Sports", image: "/images/tshirt5.jpeg" },
        { name: "Typography", image: "/images/tshirt6.jpeg" },
      ].map((cat) => (
        <a key={cat.name} href="#listings" className="home-category-card">
          <img
            src={cat.image}
            alt={cat.name}
            className="category-image"
          />
          <div className="category-overlay" />
          <div className="category-info">
            <h4 className="category-name">{cat.name}</h4>
            <span className="category-link">Explore →</span>
          </div>
        </a>
      ))}
    </div>
  </div>
</div>
      

     {/* ===== LISTINGS SECTION ===== */}
<div className="home-listings" id="listings">
  <div className="home-section-container">
    <div className="home-section-label">Trending Now</div>
    <h2 className="home-section-heading">Latest Designs</h2>

    {/* Filter buttons */}
    <div className="home-filters">
      {["ALL", "DESIGN", "STOCK"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`home-filter-btn ${filter === f ? "active" : ""}`}
        >
          {f === "ALL" ? "All Designs" : f === "DESIGN" ? "Print on Demand" : "Ready Stock"}
          {" "}({listings.filter((l) => f === "ALL" || l.listingType === f).length})
        </button>
      ))}
    </div>

    {loading && (
      <div className="home-loading">
        <div className="loading-spinner" />
        <p>Loading designs...</p>
      </div>
    )}
    {error && <p className="home-error">{error}</p>}

    <div className="home-grid">
      {filteredListings.length > 0 ? (
        filteredListings.map((listing) => (
          <ListingCard key={listing.listingId} listing={listing} />
        ))
      ) : (
        !loading && (
          <div className="home-empty">
            <div className="empty-icon">🎨</div>
            <p>No designs in this category yet.</p>
          </div>
        )
      )}
    </div>
  </div>
</div>

      {/* ===== WHY DESIGNDROP SECTION ===== */}
      <div className="home-why">
        <div className="home-section-container">
          <div className="home-section-label">Why Choose Us</div>
          <h2 className="home-section-heading">Built for Sri Lankan Creators</h2>
          <div className="home-features-grid">
            <div className="home-feature">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Originality Protected</h3>
              <p className="feature-desc">
                Every design goes through a manual originality review 
                before it goes live. No copies allowed.
              </p>
            </div>
            <div className="home-feature">
              <div className="feature-icon">🖨️</div>
              <h3 className="feature-title">DTF Print Quality</h3>
              <p className="feature-desc">
                All print-on-demand orders are printed using 
                high quality DTF printing for vibrant, lasting results.
              </p>
            </div>
            <div className="home-feature">
              <div className="feature-icon">🏢</div>
              <h3 className="feature-title">B2B Licensing</h3>
              <p className="feature-desc">
                Companies can license exclusive designs directly 
                from designers for their branding needs.
              </p>
            </div>
            <div className="home-feature">
              <div className="feature-icon">💳</div>
              <h3 className="feature-title">Local Currency</h3>
              <p className="feature-desc">
                All transactions in Sri Lankan Rupees. 
                No currency conversion hassle for local buyers and sellers.
              </p>
            </div>
            <div className="home-feature">
              <div className="feature-icon">🎨</div>
              <h3 className="feature-title">For Every Creator</h3>
              <p className="feature-desc">
                Whether you're a freelance artist, a design student, 
                or a full-time creator — DesignDrop is your platform.
              </p>
            </div>
            <div className="home-feature">
              <div className="feature-icon">🚀</div>
              <h3 className="feature-title">Easy to Start</h3>
              <p className="feature-desc">
                Register free, upload your design, 
                and start selling within 24 hours of approval.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <div className="home-testimonials">
        <div className="home-section-container">
          <div className="home-section-label">What People Say</div>
          <h2 className="home-section-heading">Loved by Creators</h2>
          <div className="testimonials-grid">
            {[
              {
                name: "Kasun Perera",
                role: "Graphic Designer, Colombo",
                text: "DesignDrop gave me a platform to monetize my artwork without needing to handle printing or logistics. Approved in less than a day!",
                rating: "⭐⭐⭐⭐⭐",
              },
              {
                name: "Dilini Fernando",
                role: "Fashion Brand Owner",
                text: "As a company, finding unique Sri Lankan designs for our clothing line was always a struggle. DesignDrop solved that completely.",
                rating: "⭐⭐⭐⭐⭐",
              },
              {
                name: "Ashan Rajapaksa",
                role: "University Student, Kandy",
                text: "I started selling my artwork on DesignDrop while studying. It's the easiest way for young designers to get their work out there.",
                rating: "⭐⭐⭐⭐⭐",
              },
            ].map((t) => (
              <div key={t.name} className="testimonial-card">
                <p className="testimonial-rating">{t.rating}</p>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== FINAL CTA SECTION ===== */}
      <div className="home-cta-section">
        <div className="home-section-container">
          <h2 className="cta-section-title">Ready to Drop Your First Design?</h2>
          <p className="cta-section-subtitle">
            Join Sri Lanka's growing community of independent designers.
          </p>
          <div className="home-hero-buttons">
            <a href="/register" className="home-cta-primary">
              Create Free Account →
            </a>
            <a href="#listings" className="home-cta-outline-dark">
              Browse Designs First
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;