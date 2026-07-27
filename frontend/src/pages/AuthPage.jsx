import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // ✅ Added

import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import CaregiverSignup from "../components/auth/CaregiverSignup";
import ForgotPassword from "../components/auth/ForgotPassword";
import OTPVerification from "../components/auth/OTPVerification";
import ResetPassword from "../components/auth/ResetPassword";

export default function AuthPage() {
  const location = useLocation();

  // ✅ Agar Navbar se "Register" click kiya toh direct "signup" screen open hogi
  const [screen, setScreen] = useState(() => {
    return location.state?.screen || "login";
  });

  // ✅ Agar user manual /login pe aata hai toh "login" set ho
  useEffect(() => {
    if (!location.state?.screen) {
      setScreen("login");
    }
  }, [location]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        {screen === "login" && (
          <LoginForm
            onSignup={() => setScreen("signup")}
            onForgot={() => setScreen("forgot")}
          />
        )}
        {screen === "signup" && (
          <SignupForm
            onLogin={() => setScreen("login")}
            onCaregiver={() => setScreen("caregiver")}
          />
        )}
        {screen === "caregiver" && (
          <CaregiverSignup onLogin={() => setScreen("login")} />
        )}
        {screen === "forgot" && (
          <ForgotPassword onLogin={() => setScreen("login")} />
        )}
        {screen === "otp" && (
          <OTPVerification onReset={() => setScreen("reset")} />
        )}
        {screen === "reset" && (
          <ResetPassword onLogin={() => setScreen("login")} />
        )}
      </div>
    </div>
  );
}