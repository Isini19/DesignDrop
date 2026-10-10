import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      {/* Main footer */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-top">

            {/* Brand column */}
            <div className="footer-brand">
              <h2 className="footer-logo">Design<span>Drop</span></h2>
              <p className="footer-tagline">
                Sri Lanka's first t-shirt design marketplace.
                Connecting independent creators with customers and companies since 2024.
              </p>
              <div className="footer-socials">
                <a href="#" className="footer-social" title="Facebook">
                  <span>f</span>
                </a>
                <a href="#" className="footer-social" title="Instagram">
                  <span>in</span>
                </a>
                <a href="#" className="footer-social" title="Twitter">
                  <span>tw</span>
                </a>
              </div>
            </div>

            {/* Marketplace links */}
            <div className="footer-col">
              <h4 className="footer-heading">Marketplace</h4>
              <ul className="footer-links">
                <li><Link to="/">Browse All Designs</Link></li>
                <li><Link to="/">Print on Demand</Link></li>
                <li><Link to="/">Ready Stock</Link></li>
                <li><Link to="/register">For Companies</Link></li>
                <li><Link to="/register">Sell Your Design</Link></li>
              </ul>
            </div>

            {/* Account links */}
            <div className="footer-col">
              <h4 className="footer-heading">Account</h4>
              <ul className="footer-links">
                <li><Link to="/register">Create Account</Link></li>
                <li><Link to="/login">Sign In</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/create-listing">Upload Design</Link></li>
              </ul>
            </div>

            {/* Support links */}
            <div className="footer-col">
              <h4 className="footer-heading">Support</h4>
              <ul className="footer-links">
                <li><a href="#">How It Works</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4 className="footer-heading">Contact Us</h4>
              <ul className="footer-contact">
                <li>
                  <span className="contact-icon">📧</span>
                  <span>hello@designdrop.lk</span>
                </li>
                <li>
                  <span className="contact-icon">📞</span>
                  <span>+94 77 123 4567</span>
                </li>
                <li>
                  <span className="contact-icon">📍</span>
                  <span>Colombo, Sri Lanka</span>
                </li>
                <li>
                  <span className="contact-icon">🕐</span>
                  <span>Mon – Fri: 9am – 6pm</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Newsletter bar */}
      <div className="footer-newsletter">
        <div className="footer-container">
          <div className="footer-newsletter-inner">
            <div>
              <h4 className="newsletter-title">Stay updated with new designs</h4>
              <p className="newsletter-sub">Get notified when new designs drop</p>
            </div>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-inner">
            <p>© 2024 DesignDrop. All rights reserved. Built with ❤️ in Sri Lanka.</p>
            <div className="footer-bottom-links">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Cookies</a>
            </div>
            <p className="footer-tech">React + Spring Boot + MySQL | Individual Learning Project</p>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;