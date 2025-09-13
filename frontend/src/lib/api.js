import { axiosInstance } from "./axios";

// API endpoints
export const getProfile = () => axiosInstance.get("/profile");
export const createProfile = (payload) =>
  axiosInstance.post("/profile", payload);
export const updateProfileAndAddProject = (id, payload) =>
  axiosInstance.put(`/profile/${id}`, payload);
export const getTopSkills = () => axiosInstance.get("/profile/skills/top");
export const searchProfile = (q) =>
  axiosInstance.get(`/profile/search?q=${encodeURIComponent(q)}`);
