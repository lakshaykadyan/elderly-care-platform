import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../common/ThemeToggle";
import { Home, Info, Phone, LayoutDashboard, LogOut, User, Menu } from "lucide-react";

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
          <NavLink to="/">
            <Home size={16} style={{ display: "inline-block", marginRight: "4px" }} />
            Home
          </NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/about">
            <Info size={16} style={{ display: "inline-block", marginRight: "4px" }} />
            About
          </NavLink>
          <NavLink to="/contact">
            <Phone size={16} style={{ display: "inline-block", marginRight: "4px" }} />
            Contact
          </NavLink>
        </nav>

        <div className="nav-actions">
          <ThemeToggle />

          {!user ? (
            <>
              <Link to="/login">
                <button className="login-btn">
                  <User size={16} style={{ display: "inline-block", marginRight: "4px" }} />
                  Login
                </button>
              </Link>
              <Link to="/login" state={{ screen: "signup" }}>
                <button className="register-btn">Register</button>
              </Link>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={goToDashboard}>
                <LayoutDashboard size={16} style={{ display: "inline-block", marginRight: "4px" }} />
                Dashboard
              </button>
              <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={16} style={{ display: "inline-block", marginRight: "4px" }} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}