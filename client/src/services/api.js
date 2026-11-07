
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Request Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const message = error.response?.data?.message;

    if (message === "Session expired. Please login again.") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
