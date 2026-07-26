import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ========================== Request Interceptor ==========================
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ========================== Response Interceptor (Handle 401) ==========================
API.interceptors.response.use(
  (response) => {
    return response;
  },
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