import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        DesignDrop
      </Link>

      {/* Nav links */}
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>

        {/* Show these only when logged in */}
        {user ? (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <span style={styles.email}>{user.email}</span>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

// Basic inline styles
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    backgroundColor: "#1a1a2e",
    color: "white",
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontSize: "24px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  email: {
    color: "#a0a0a0",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#e94560",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Navbar;