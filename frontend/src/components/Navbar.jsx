import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${search}`);
    }
  };

  return (
    <nav className="navbar">

      {/* ===== MAIN NAVBAR ===== */}
      <div className="navbar-main">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          DesignDrop<span className="navbar-logo-dot">.</span>
        </Link>

        {/* Search */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search designs, categories, creators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="navbar-search-input"
          />
          <button type="submit" className="navbar-search-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </form>

        {/* Nav links — desktop */}
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/" className="navbar-link">Explore</Link>
          <Link to="/" className="navbar-link">Categories</Link>
          <Link to="/register" className="navbar-link">For Companies</Link>
          <Link to="/create-listing" className="navbar-link">Sell Designs</Link>
        </div>

        {/* Right side actions */}
        <div className="navbar-actions">
          {user ? (
            <>
              {/* Wishlist icon */}
              <button className="navbar-icon-btn" title="Wishlist">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>

              {/* Cart icon */}
              <button className="navbar-icon-btn" title="Cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </button>

              {/* Profile */}
              <div className="navbar-profile" onClick={() => navigate("/dashboard")}>
                <div className="navbar-avatar">
                  {user.email.charAt(0).toUpperCase()}
                </div>
                <span className="navbar-username">{user.email.split("@")[0]}</span>
              </div>

              <button onClick={handleLogout} className="navbar-logout">Logout</button>
            </>
          ) : (
            <>
              <button className="navbar-icon-btn" title="Wishlist">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
              <button className="navbar-icon-btn" title="Cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </button>
              <Link to="/login" className="navbar-login">Login</Link>
              <Link to="/register" className="navbar-create-btn">Create Account</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
          <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>Explore</Link>
          <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>Categories</Link>
          <Link to="/register" className="mobile-link" onClick={() => setMenuOpen(false)}>For Companies</Link>
          <Link to="/create-listing" className="mobile-link" onClick={() => setMenuOpen(false)}>Sell Designs</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="mobile-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button className="mobile-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-link" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="mobile-cta" onClick={() => setMenuOpen(false)}>Create Account</Link>
            </>
          )}
        </div>
      )}

    </nav>
  );
}

export default Navbar;