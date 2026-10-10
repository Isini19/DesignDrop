import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">

        <div className="forgot-logo">DESIGNDROP</div>

        {!submitted ? (
          <>
            <div className="forgot-icon">🔐</div>
            <h2 className="forgot-title">Forgot Password?</h2>
            <p className="forgot-subtitle">
              No worries! Enter your email and we'll send you reset instructions.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                  placeholder="you@example.com"
                />
              </div>

              <button type="submit" className="forgot-button">
                Send Reset Link →
              </button>
            </form>
          </>
        ) : (
          <div className="forgot-success">
            <div className="forgot-success-icon">📧</div>
            <h2 className="forgot-title">Check Your Email</h2>
            <p className="forgot-subtitle">
              We've sent a password reset link to <strong>{email}</strong>.
              Please check your inbox and follow the instructions.
            </p>
            <p className="forgot-note">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <button
              className="forgot-retry"
              onClick={() => setSubmitted(false)}
            >
              Try Again
            </button>
          </div>
        )}

        <div className="forgot-back">
          <Link to="/login">← Back to Sign In</Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;