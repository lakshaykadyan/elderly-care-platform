import { useState } from "react";

import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import CaregiverSignup from "../components/auth/CaregiverSignup";
import ForgotPassword from "../components/auth/ForgotPassword";
import OTPVerification from "../components/auth/OTPVerification";
import ResetPassword from "../components/auth/ResetPassword";

export default function AuthPage() {

  const [screen, setScreen] = useState("login");

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
          <CaregiverSignup
            onLogin={() => setScreen("login")}
          />
        )}

        {screen === "forgot" && (
          <ForgotPassword
            onLogin={() => setScreen("login")}
          />
        )}

        {screen === "otp" && (
          <OTPVerification
            onReset={() => setScreen("reset")}
         />
        )}

        {screen === "reset" && (
          <ResetPassword
            onLogin={() => setScreen("login")}
         />
        )}

      </div>

    </div>

  );

}