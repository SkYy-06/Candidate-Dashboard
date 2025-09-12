import express from "express";

import {
  createProfile,
  getProfile,
  getProjectBySkills,
  getTopSkills,
  searchQuery,
  updateProfileAndAddProject,
} from "../controllers/candidateProfile.controller.js";

const router = express.Router();

router.post("/", createProfile);
router.get("/", getProfile);
router.put("/:id", updateProfileAndAddProject);

router.get("/projects", getProjectBySkills);
router.get("/skills/top", getTopSkills);

router.get("/search", searchQuery);

export default router;
