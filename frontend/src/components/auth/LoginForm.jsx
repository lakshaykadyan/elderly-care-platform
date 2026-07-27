import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../utils/toast";

export default function LoginForm({ onSignup, onForgot }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // ========================== HANDLE LOGIN ==========================
  const handleLogin = async () => {
    if (loading) return;

    if (!email.trim() || !password.trim()) {
      showError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email: email.trim(),
        password: password.trim(),
      });

      if (response.token) {
        login(response.user, response.token);
        showSuccess("Login Successful");

        // ✅ Use navigate (SPA friendly, avoids full reload)
        const role = response.user.role?.toLowerCase();
        if (role === "admin") {
          navigate("/dashboard/admin", { replace: true });
        } else if (role === "caregiver") {
          navigate("/dashboard/caregiver", { replace: true });
        } else {
          navigate("/dashboard/user", { replace: true });
        }
      } else {
        showError(response.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      showError(error.response?.data?.message || "Login Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ========================== ENTER KEY SUPPORT ==========================
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="auth-card">
      <h2>Welcome Back</h2>
      <p>Login to continue to ElderlyCare</p>

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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

      {/* Password Input with Show/Hide Toggle */}
      <div style={{ position: "relative", width: "100%" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
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
        onClick={handleLogin}
        disabled={loading}
        style={{ width: "100%" }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <button
        type="button"
        className="text-btn"
        onClick={onForgot}
        disabled={loading}
      >
        Forgot Password?
      </button>

      <div className="auth-footer">
        <span>Don't have an account?</span>
        <button
          type="button"
          className="text-btn"
          onClick={onSignup}
          disabled={loading}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}