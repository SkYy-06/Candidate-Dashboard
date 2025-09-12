import axios from "axios";

// 🔧 Set your backend URL here
axios.defaults.baseURL = "http://localhost:5001";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getProfile = () => axios.get("/api/profile");
export const createProfile = (payload) => axios.post("/api/profile", payload);
export const updateProfile = (id, payload) =>
  axios.put(`/api/profile/${id}`, payload);
export const getTopSkills = () => axios.get("/api/profile/skills/top");
export const searchProfile = (q) =>
  axios.get(`/api/profile/search?q=${encodeURIComponent(q)}`);
