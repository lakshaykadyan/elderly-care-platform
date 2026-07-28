import axios from "axios";

const BASE_URL = "https://elderly-care-platform-ypwf.onrender.com/api";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 ya 403 pe logout
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.log("⏰ Session expired. Logging out...");

      localStorage.removeItem("token");
      localStorage.removeItem("elderlyUser");
      localStorage.removeItem("role");

      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default API;