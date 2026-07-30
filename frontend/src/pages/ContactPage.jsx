import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, User, MessageSquare, Send, Phone, MapPin, CheckCircle, Home } from "lucide-react";
import API from "../services/api";
import { showSuccess, showError } from "../utils/toast";

export default function ContactPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return showError("Please fill all fields");
    }
    try {
      setLoading(true);
      await API.post("/contact", form);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      showSuccess("Message sent! We'll get back to you soon.");
    } catch (err) {
      console.log(err);
      showError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="sub-page" style={{
        padding: "120px 20px",
        background: "var(--bg-body)",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{ textAlign: "center", maxWidth: "500px" }}>
          <CheckCircle size={64} style={{ color: "#22c55e", marginBottom: "20px" }} />
          <h1 style={{ fontSize: "32px", fontWeight: "700", color: "var(--text-primary)" }}>Thank You!</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "18px", marginTop: "12px" }}>
            Your message has been sent. Our team will get back to you shortly.
          </p>
          <button
            className="primary-btn"
            onClick={() => { setSubmitted(false); navigate("/"); }}
            style={{ marginTop: "24px", padding: "12px 36px", display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <Home size={18} /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sub-page" style={{
      padding: "120px 20px",
      background: "var(--bg-body)",
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div className="container" style={{ maxWidth: "700px", margin: "0 auto", width: "100%" }}>
        <h1 style={{
          fontSize: "44px",
          fontWeight: "700",
          color: "var(--text-primary)",
          textAlign: "center",
          marginBottom: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
        }}>
          <Mail size={36} style={{ color: "var(--primary)" }} />
          Contact Us
        </h1>

        <p style={{
          fontSize: "18px",
          color: "var(--text-secondary)",
          textAlign: "center",
          marginBottom: "40px",
        }}>
          Have questions? Reach out to us anytime.
        </p>

        <form className="page-form" onSubmit={handleSubmit} style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}>
          <div style={{ position: "relative" }}>
            <User size={20} style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }} />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              style={{
                padding: "16px 20px 16px 48px",
                borderRadius: "12px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                fontSize: "16px",
                width: "100%",
                outline: "none",
              }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <Mail size={20} style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }} />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              style={{
                padding: "16px 20px 16px 48px",
                borderRadius: "12px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                fontSize: "16px",
                width: "100%",
                outline: "none",
              }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <MessageSquare size={20} style={{
              position: "absolute",
              left: "16px",
              top: "20px",
              color: "var(--text-muted)",
            }} />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              style={{
                padding: "16px 20px 16px 48px",
                borderRadius: "12px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                fontSize: "16px",
                width: "100%",
                resize: "vertical",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
          </div>

          <button
            className="primary-btn"
            type="submit"
            disabled={loading}
            style={{
              padding: "16px",
              borderRadius: "40px",
              border: "none",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.boxShadow = "0 8px 25px rgba(79,70,229,0.4)";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Send size={20} />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Contact Details */}
        <div style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          padding: "24px",
          background: "var(--bg-card)",
          borderRadius: "16px",
          border: "1px solid var(--border-color)",
        }}>
          <div style={{ textAlign: "center" }}>
            <MapPin size={24} style={{ color: "var(--primary)", marginBottom: "8px" }} />
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", margin: 0 }}>New Delhi, India</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Phone size={24} style={{ color: "var(--primary)", marginBottom: "8px" }} />
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", margin: 0 }}>+91 9876543210</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Mail size={24} style={{ color: "var(--primary)", marginBottom: "8px" }} />
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", margin: 0 }}>support@elderlycare.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}