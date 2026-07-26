import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await registerUser(formData);
      setSuccess("Registered successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  const roles = [
    { value: "CUSTOMER", icon: "🛍️", label: "Customer" },
    { value: "DESIGNER", icon: "🎨", label: "Designer" },
    { value: "COMPANY", icon: "🏢", label: "Company" },
  ];

  return (
    <div className="register-container">
      <div className="register-card">
         <h2 className="register-title">Create Account</h2>
        <h2 className="register-title">Create Account</h2>
         <p className="register-subtitle">Join Sri Lanka's design marketplace</p>

        {error && <p className="register-error">{error}</p>}
        {success && <p className="register-success">{success}</p>}

        <form onSubmit={handleSubmit}>
          //role selection card
          <div className="form-field">
            <label className="form-label">I am a...</label>
            <div className="register-role-grid">
              {roles.map((r) => (
                <div
                  key={r.value}
                  className={`role-card ${formData.role === r.value ? "selected" : ""}`}
                  onClick={() => handleRoleSelect(r.value)}
                >
                  <div className="role-card-icon">{r.icon}</div>
                  <div className="role-card-label">{r.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="you@example.com"
            />
          </div>



          <div className="form-field">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="••••••••"
            />
          </div>

          

          <button type="submit" className="register-button">
            Create Account →
          </button>
        </form>

        <p className="register-login-text">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;