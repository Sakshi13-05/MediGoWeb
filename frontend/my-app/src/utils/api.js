// This sets up a common Axios instance with the backend URL
import axios from "axios";

// You can configure API base URL (fallback is localhost)
export const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://medigo-2.onrender.com";

export const api = axios.create({
  baseURL: API_BASE, // All requests will automatically prefix this URL
});
