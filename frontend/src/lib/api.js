import axios from "axios";

// ✅ Use environment variable for base URL (set in Vercel project settings)
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

axios.defaults.headers.post["Content-Type"] = "application/json";

// 📌 API Endpoints
export const getProfile = () => axios.get("/profile");
export const createProfile = (payload) => axios.post("/profile", payload);
export const updateProfile = (id, payload) =>
  axios.put(`/profile/${id}`, payload);
export const getTopSkills = () => axios.get("/profile/skills/top");
export const searchProfile = (q) =>
  axios.get(`/profile/search?q=${encodeURIComponent(q)}`);
