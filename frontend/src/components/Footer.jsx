import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Top section */}
        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <h2 className="footer-logo">DesignDrop</h2>
            <p className="footer-tagline">
              Sri Lanka's first t-shirt design marketplace. 
              Connecting creators with customers since 2024.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social">📘</a>
              <a href="#" className="footer-social">📸</a>
              <a href="#" className="footer-social">🐦</a>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-links-group">
            <h4 className="footer-heading">Marketplace</h4>
            <ul className="footer-links">
              <li><Link to="/">Browse Designs</Link></li>
              <li><Link to="/register">Start Selling</Link></li>
              <li><Link to="/register">For Companies</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-links-group">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><a href="#">How It Works</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-links-group">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links">
              <li>📧 hello@designdrop.lk</li>
              <li>📞 +94 77 123 4567</li>
              <li>📍 Colombo, Sri Lanka</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© 2024 DesignDrop. All rights reserved. Built with ❤️ in Sri Lanka.</p>
          <p>Individual Learning Project | React + Spring Boot + MySQL</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;