import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <h2 className="footer-logo">DesignDrop<span>.</span></h2>
            <p className="footer-tagline">
              Where creativity meets what you wear. A marketplace for
              original t-shirt designs from Sri Lankan creators.
            </p>
            <p className="footer-contact-line">hello@designdrop.lk</p>
            <p className="footer-contact-line">Colombo, Sri Lanka</p>
          </div>

          {/* Explore */}
          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li><Link to="/">All Designs</Link></li>
              <li><a href="/#listings">Latest Designs</a></li>
              <li><Link to="/">Home</Link></li>
            </ul>
          </div>

          {/* For Designers */}
          <div className="footer-col">
            <h4 className="footer-heading">For Designers</h4>
            <ul className="footer-links">
              <li><Link to="/create-listing">Upload Artwork</Link></li>
              <li><Link to="/register">Become a Designer</Link></li>
              <li><Link to="/dashboard">Designer Dashboard</Link></li>
            </ul>
          </div>

          {/* For Companies */}
          <div className="footer-col">
            <h4 className="footer-heading">For Companies</h4>
            <ul className="footer-links">
              <li><Link to="/register">Register a Company</Link></li>
              <li><Link to="/login">Sign In</Link></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} DesignDrop. All rights reserved.</p>
          <p className="footer-tech">
            Individual learning project · React · Spring Boot · MySQL
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;