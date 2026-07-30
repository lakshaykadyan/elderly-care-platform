import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ fallbackPath = "/" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <button
      onClick={handleBack}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: "transparent",
        border: "none",
        color: "var(--text-primary)",
        cursor: "pointer",
        padding: "8px 4px",
        fontSize: "15px",
        fontWeight: "500",
        marginBottom: "16px",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
    >
      <ArrowLeft size={20} />
      Back
    </button>
  );
}