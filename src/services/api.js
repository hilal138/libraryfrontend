import axios from "axios";

// Get backend URL from env or default to localhost:5000
const getBackendUrl = () => {
  if (process.env.REACT_APP_BACKEND_URL) {
    return process.env.REACT_APP_BACKEND_URL;
  }
  // Fallback for when .env is not loaded
  return "http://localhost:5000";
};

const API = axios.create({
  baseURL: `${getBackendUrl()}/api`
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
