import { useState } from "react";

export default function ForgotPassword({ onLogin }) {

  const [email, setEmail] = useState("");

  return (

    <div className="auth-card">

      <h2>Forgot Password</h2>

      <p>Enter your registered email</p>

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <button className="primary-btn">

        Send OTP

      </button>

      <div className="auth-footer">

        <span>Remember your password?</span>

        <button
          className="text-btn"
          onClick={onLogin}
        >
          Login
        </button>

      </div>

    </div>

  );

}