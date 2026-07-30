import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      // Agar user logged in hai -> dashboard pe bhejo
      if (user.role === "admin") {
        navigate("/dashboard/admin");
      } else if (user.role === "caregiver") {
        navigate("/dashboard/caregiver");
      } else {
        navigate("/dashboard/user");
      }
    } else {
      // Naya user -> login page pe bhejo (wahan register/login ka option hai)
      navigate("/login", { state: { screen: "signup" } });
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Caring For Seniors With Smart Technology</h1>
        <p>
          Professional healthcare, caregiving and emergency support at your
          fingertips.
        </p>
        <button className="primary-btn" onClick={handleGetStarted}>
          Get Started <ArrowRight size={18} style={{ marginLeft: "8px", display: "inline" }} />
        </button>
      </div>
    </section>
  );
}