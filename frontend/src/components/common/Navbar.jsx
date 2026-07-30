import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../common/ThemeToggle";
import { Home, Info, Phone, LayoutDashboard, LogOut, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const goToDashboard = () => {
    if (user?.role === "admin") {
      navigate("/dashboard/admin");
    } else if (user?.role === "caregiver") {
      navigate("/dashboard/caregiver");
    } else {
      navigate("/dashboard/user");
    }
    setMenuOpen(false);
  };

  // Close menu when any nav link is clicked
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>ElderlyCare</Link>
        </div>

        {/* Hamburger Icon (visible on mobile) */}
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links (hidden on mobile, shown when menuOpen) */}
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" onClick={closeMenu}>
            <Home size={16} style={{ display: "inline-block", marginRight: "4px" }} />
            Home
          </NavLink>
          <NavLink to="/services" onClick={closeMenu}>
            Services
          </NavLink>
          <NavLink to="/about" onClick={closeMenu}>
            <Info size={16} style={{ display: "inline-block", marginRight: "4px" }} />
            About
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu}>
            <Phone size={16} style={{ display: "inline-block", marginRight: "4px" }} />
            Contact
          </NavLink>

          {/* Auth buttons inside mobile menu as well (optional) */}
          {!user ? (
            <>
              <Link to="/login" onClick={closeMenu}>
                <button className="login-btn">
                  <User size={16} style={{ display: "inline-block", marginRight: "4px" }} />
                  Login
                </button>
              </Link>
              <Link to="/login" state={{ screen: "signup" }} onClick={closeMenu}>
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
        </nav>

        {/* Desktop Actions (already present) */}
        <div className="nav-actions">
          <ThemeToggle />
          {/* Desktop buttons – we can keep them or move inside nav-links; we'll keep both */}
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