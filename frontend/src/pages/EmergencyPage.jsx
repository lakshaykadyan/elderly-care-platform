import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Send,
  CheckCircle,
  Home,
} from "lucide-react";
import BackButton from "../components/common/BackButton";
import API from "../services/api";
import { showSuccess, showError } from "../utils/toast";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function EmergencyPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    situation: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address || !form.situation) {
      return showError("Please fill all fields");
    }
    try {
      setLoading(true);
      await API.post("/emergency", form);
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", address: "", situation: "" });
      showSuccess("Emergency request submitted. Help is on the way!");
    } catch (err) {
      console.log(err);
      showError("Failed to submit. Please try again or call emergency.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <div style={{
          padding: "120px 20px",
          background: "var(--bg-body)",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{ textAlign: "center", maxWidth: "500px" }}>
            <CheckCircle size={64} style={{ color: "#22c55e", marginBottom: "20px" }} />
            <h1 style={{ fontSize: "32px", fontWeight: "700", color: "var(--text-primary)" }}>
              Emergency Request Sent
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "18px", marginTop: "12px" }}>
              Our team has been notified. We'll reach out to you immediately.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "8px" }}>
              For immediate help, call: <strong style={{ color: "var(--primary)" }}>+91 9876543210</strong>
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
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{
        padding: "120px 20px",
        background: "var(--bg-body)",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div className="container" style={{ maxWidth: "700px", margin: "0 auto", width: "100%" }}>
          <BackButton />

          <div style={{
            background: "rgba(239,68,68,0.08)",
            border: "2px solid #ef4444",
            borderRadius: "16px",
            padding: "20px 24px",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <AlertTriangle size={28} style={{ color: "#ef4444", flexShrink: 0 }} />
            <div>
              <h3 style={{ color: "#ef4444", fontSize: "18px", fontWeight: "700", margin: 0 }}>
                Emergency Assistance
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", margin: "4px 0 0 0" }}>
                Fill this form immediately. Our team will respond ASAP. No login required.
              </p>
            </div>
          </div>

          <h1 style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "var(--text-primary)",
            textAlign: "center",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}>
            <AlertTriangle size={36} style={{ color: "#ef4444" }} />
            Emergency Request
          </h1>

          <p style={{
            fontSize: "16px",
            color: "var(--text-secondary)",
            textAlign: "center",
            marginBottom: "32px",
          }}>
            Your safety is our priority. Fill in the details and we'll reach out immediately.
          </p>

          <form onSubmit={handleSubmit} style={{
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
                placeholder="Full Name *"
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
                placeholder="Email Address *"
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
              <Phone size={20} style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }} />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={form.phone}
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
              <MapPin size={20} style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)",
              }} />
              <input
                type="text"
                name="address"
                placeholder="Your Address *"
                value={form.address}
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
              <FileText size={20} style={{
                position: "absolute",
                left: "16px",
                top: "20px",
                color: "var(--text-muted)",
              }} />
              <textarea
                name="situation"
                rows="4"
                placeholder="Describe the emergency situation *"
                value={form.situation}
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
              type="submit"
              disabled={loading}
              style={{
                padding: "16px",
                borderRadius: "40px",
                border: "none",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                boxShadow: "0 4px 14px rgba(239,68,68,0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.boxShadow = "0 8px 25px rgba(239,68,68,0.6)";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.boxShadow = "0 4px 14px rgba(239,68,68,0.4)";
              }}
            >
              <Send size={20} />
              {loading ? "Submitting..." : "Submit Emergency Request"}
            </button>
          </form>

          <p style={{
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "14px",
            marginTop: "16px",
          }}>
            For life-threatening emergencies, immediately call <strong style={{ color: "var(--primary)" }}>102</strong> or <strong style={{ color: "var(--primary)" }}>+91 9876543210</strong>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}