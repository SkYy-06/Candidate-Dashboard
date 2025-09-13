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


router.get("/projects", getProjectBySkills);
router.get("/skills/top", getTopSkills);


router.get("/search", searchQuery);
router.put("/:id", updateProfileAndAddProject);
export default router;
