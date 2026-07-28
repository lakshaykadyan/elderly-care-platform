import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { showSuccess, showError } from "../../utils/toast";

export default function SignupForm({ onLogin, onCaregiver }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate();

  // ========================== HANDLE SIGNUP ==========================
  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      showError("All fields are required");
      return;
    }
    if (password.length < 6) {
      showError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await registerUser({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      if (response.message) {
        showSuccess("Account created successfully! Please login.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        showError(response.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      const errorMsg = error.response?.data?.message || "Signup failed. Please try again.";
      showError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Enter key support
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      <p>Join ElderlyCare Today</p>

      <input
        type="text"
        placeholder="Full Name"
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
        placeholder="Email Address"
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

      {/* Password Input with Show/Hide Toggle */}
      <div style={{ position: "relative", width: "100%" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password (Min 6 characters)"
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
            color: "var(--text-secondary)",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: loading ? 0.5 : 1,
          }}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <button
        className="primary-btn"
        onClick={handleSignup}
        disabled={loading}
        style={{ width: "100%" }}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <button
        type="button"
        className="text-btn"
        onClick={onCaregiver}
        disabled={loading}
      >
        Register as Caregiver
      </button>

      <div className="auth-footer">
        <span>Already have an account?</span>
        <button
          type="button"
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