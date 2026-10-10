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
      {/* Top bar */}
      <div className="navbar-topbar">
        <span>🇱🇰 Sri Lanka's First Design Marketplace</span>
        <div className="navbar-topbar-right">
          <span>📧 hello@designdrop.lk</span>
          <span>📞 +94 77 123 4567</span>
        </div>
      </div>

      {/* Main navbar */}
      <div className="navbar-main">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Design<span>Drop</span>
        </Link>

        {/* Search bar */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search designs, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="navbar-search-input"
          />
          <button type="submit" className="navbar-search-btn">🔍</button>
        </form>

        {/* Right side */}
        <div className="navbar-actions">
          {user ? (
            <>
              <span className="navbar-greeting">Hi, {user.email.split("@")[0]}</span>
              <Link to="/dashboard" className="navbar-action-link">Dashboard</Link>
              {(user.role === "DESIGNER" || user.role === "COMPANY") && (
                <Link to="/create-listing" className="navbar-sell-btn">+ List Design</Link>
              )}
              <button onClick={handleLogout} className="navbar-logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-action-link">Login</Link>
              <Link to="/register" className="navbar-register-btn">Register Free</Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button className="navbar-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Bottom nav links */}
      <div className={`navbar-bottom ${menuOpen ? "open" : ""}`}>
        <div className="navbar-bottom-inner">
          <Link to="/" className="navbar-nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/" className="navbar-nav-link" onClick={() => setMenuOpen(false)}>All Designs</Link>
          <Link to="/" className="navbar-nav-link" onClick={() => setMenuOpen(false)}>Print on Demand</Link>
          <Link to="/" className="navbar-nav-link" onClick={() => setMenuOpen(false)}>Ready Stock</Link>
          <Link to="/register" className="navbar-nav-link" onClick={() => setMenuOpen(false)}>For Companies</Link>
          <Link to="/register" className="navbar-nav-link" onClick={() => setMenuOpen(false)}>Sell Your Design</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;