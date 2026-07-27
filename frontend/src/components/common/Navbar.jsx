import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const goToDashboard = () => {
    if (user?.role === "admin") {
      navigate("/dashboard/admin");
    } else if (user?.role === "caregiver") {
      navigate("/dashboard/caregiver");
    } else {
      navigate("/dashboard/user");
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">ElderlyCare</Link>
        </div>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="nav-actions">
          <ThemeToggle />

          {!user ? (
            <>
              <Link to="/login">
                <button className="login-btn">Login</button>
              </Link>
              {/* ✅ Register button ab "signup" screen kholega */}
              <Link to="/login" state={{ screen: "signup" }}>
                <button className="register-btn">Register</button>
              </Link>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={goToDashboard}>
                Dashboard
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}