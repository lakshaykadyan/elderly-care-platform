import { useState } from "react";

export default function ResetPassword({ onLogin }) {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (

    <div className="auth-card">

      <h2>Reset Password</h2>

      <p>Create your new password</p>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
      />

      <button
        className="primary-btn"
      >
        Update Password
      </button>

      <div className="auth-footer">

        <button
          className="text-btn"
          onClick={onLogin}
        >
          Back to Login
        </button>

      </div>

    </div>

  );

}