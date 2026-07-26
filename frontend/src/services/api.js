import axios from "axios";

// ✅ Production ke liye dynamic URL (Render wala)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({
    baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// ✅ Response interceptor (401 handle)
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("elderlyUser");
            localStorage.removeItem("role");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default API;