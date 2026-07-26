import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { caregiverRegister } from "../../services/authService";
import { showSuccess, showError } from "../../utils/toast";

export default function CaregiverSignup({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ Added

  const navigate = useNavigate();

  // ========================== HANDLE CAREGIVER SIGNUP ==========================
  const handleCaregiverSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      showError("Name, Email, and Password are required");
      return;
    }
    if (!specialization.trim()) {
      showError("Please enter your specialization");
      return;
    }
    if (!serviceArea.trim()) {
      showError("Please enter your service area");
      return;
    }
    if (password.length < 6) {
      showError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await caregiverRegister({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
        specialization: specialization.trim(),
        experience: Number(experience) || 0,
        serviceArea: serviceArea.trim(),
      });

      if (response.message) {
        showSuccess("Caregiver registered successfully! Please login.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        showError(response.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Caregiver Signup Error:", error);
      const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Enter key support
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCaregiverSignup();
    }
  };

  return (
    <div className="auth-card">
      <h2>Caregiver Registration</h2>
      <p>Join our Caregiver Network</p>

      <input
        type="text"
        placeholder="Full Name *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        autoFocus
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: "12px",
          border: "1px solid var(--border-color)",
          background: "var(--bg-body)",
          color: "var(--text-primary)",
          fontSize: "15px",
          outline: "none",
          transition: "all 0.3s ease",
          boxSizing: "border-box",
        }}
        onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
        onBlur={(e) => { e.target.borderColor = "var(--border-color)"; e.target.boxShadow = "none"; }}
      />

      <input
        type="email"
        placeholder="Email Address *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: "12px",
          border: "1px solid var(--border-color)",
          background: "var(--bg-body)",
          color: "var(--text-primary)",
          fontSize: "15px",
          outline: "none",
          transition: "all 0.3s ease",
          boxSizing: "border-box",
        }}
        onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
        onBlur={(e) => { e.target.borderColor = "var(--border-color)"; e.target.boxShadow = "none"; }}
      />

      {/* ✅ Password Input with Show/Hide Toggle */}
      <div style={{ position: "relative", width: "100%" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password (Min 6 characters) *"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px 50px 14px 16px",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
            background: "var(--bg-body)",
            color: "var(--text-primary)",
            fontSize: "15px",
            outline: "none",
            transition: "all 0.3s ease",
            boxSizing: "border-box",
          }}
          onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
          onBlur={(e) => { e.target.borderColor = "var(--border-color)"; e.target.boxShadow = "none"; }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={loading}
          style={{
            position: "absolute",
            right: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            color: "var(--text-secondary)",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: loading ? 0.5 : 1,
          }}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Specialization (e.g., Elderly Care, Physiotherapy) *"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: "12px",
          border: "1px solid var(--border-color)",
          background: "var(--bg-body)",
          color: "var(--text-primary)",
          fontSize: "15px",
          outline: "none",
          transition: "all 0.3s ease",
          boxSizing: "border-box",
        }}
        onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
        onBlur={(e) => { e.target.borderColor = "var(--border-color)"; e.target.boxShadow = "none"; }}
      />

      <input
        type="text"
        placeholder="Experience (Years) - Optional"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: "12px",
          border: "1px solid var(--border-color)",
          background: "var(--bg-body)",
          color: "var(--text-primary)",
          fontSize: "15px",
          outline: "none",
          transition: "all 0.3s ease",
          boxSizing: "border-box",
        }}
        onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
        onBlur={(e) => { e.target.borderColor = "var(--border-color)"; e.target.boxShadow = "none"; }}
      />

      <input
        type="text"
        placeholder="Service Area (e.g., Mumbai, Delhi) *"
        value={serviceArea}
        onChange={(e) => setServiceArea(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: "12px",
          border: "1px solid var(--border-color)",
          background: "var(--bg-body)",
          color: "#f8fafc", 
          fontSize: "15px",
          outline: "none",
          transition: "all 0.3s ease",
          boxSizing: "border-box",
        }}
        onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
        onBlur={(e) => { e.target.borderColor = "var(--border-color)"; e.target.boxShadow = "none"; }}
      />

      <button
        className="primary-btn"
        onClick={handleCaregiverSignup}
        disabled={loading}
        style={{ width: "100%" }}
      >
        {loading ? "Registering..." : "Register as Caregiver"}
      </button>

      <div className="auth-footer">
        <span>Already have an account?</span>
        <button
          className="text-btn"
          onClick={onLogin}
          disabled={loading}
        >
          Login
        </button>
      </div>
    </div>
  );
}