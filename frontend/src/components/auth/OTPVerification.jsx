import { useState } from "react";

export default function OTPVerification({ onReset }) {

  const [otp, setOtp] = useState("");

  return (

    <div className="auth-card">

      <h2>OTP Verification</h2>

      <p>Enter the OTP sent to your email</p>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e)=>setOtp(e.target.value)}
      />

      <button
        className="primary-btn"
        onClick={onReset}
      >
        Verify OTP
      </button>

    </div>

  );

}