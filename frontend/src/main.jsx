import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

// ========== GLOBAL STYLES (Merged Reset + Variables + Base) ==========
import "./styles/globals.css";

// ========== LAYOUT STYLES (Common Components) ==========
import "./styles/layout/dashboard.css"; 
import "./styles/layout/auth.css";      
import "./styles/layout/navbar.css";    

// ========== PAGE SPECIFIC STYLES (Role + Public Pages) ==========
import "./styles/pages/auth.css";       
import "./styles/pages/home.css";       
import "./styles/pages/user.css";       
import "./styles/pages/admin.css";      
import "./styles/pages/caregiver.css";  

// ========== PROFILE DROPDOWN SPECIFIC ==========
import "./components/common/profile/ProfileDropdown.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          success: {
            style: {
              background: "#22c55e",
            },
          },
          error: {
            style: {
              background: "#ef4444",
            },
          },
        }}
      />
    </AuthProvider>
  </React.StrictMode>
);