import Candidate from "../models/profile.model.js";

//  Create Profile
export const createProfile = async (req, res) => {
  try {
    const profile = await Candidate.create(req.body);

    console.log("Profile created successfully:", profile);

    res.status(201).json({
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Error creating profile:", error.message);

    res.status(400).json({
      message: "Profile not created",
      error: error.message,
    });
  }
};

//  Get Profile
export const getProfile = async (req, res) => {
  try {
    const profile = await Candidate.findOne();

    if (!profile) {
      console.error("Candidate profile not found");
      return res.status(404).json({ message: "Candidate Profile not found" });
    }

    console.log("Candidate profile fetched:", profile);

    res.status(200).json({
      message: "Candidate Profile Fetched Successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Error in getProfile:", error.message);

    res.status(500).json({
      message: "Internal Server Error in getProfile Controller",
      error: error.message,
    });
  }
};

//  Update Profile and Add new Project



export const updateProfileAndAddProject = async (req, res) => {
  try {
    const profile = await Candidate.findOne();

    if (!profile) {
      console.error("No profile found to update");
      return res.status(404).json({ message: "Profile not found" });
    }

    // If request contains project data, add a project
    if (req.body.title && req.body.description) {
      const { title, description, links, techStack } = req.body;

      profile.projects.push({
        title,
        description,
        links: links || [],
        techStack: techStack || [],
      });

      await profile.save();

      console.log("Project added:", title);

      return res.status(201).json({
        message: "Project added successfully",
        data: profile,
      });
    }

    // Otherwise, update profile fields
    const updatedProfile = await Candidate.findByIdAndUpdate(
      profile._id.toString(),
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    console.log("Profile updated successfully:", updatedProfile);

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Error in updateProfileOrAddProject:", error.message);

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


//  Get Projects by Skill
export const getProjectBySkills = async (req, res) => {
  try {
    const { skill } = req.query;

    if (!skill) {
      console.error("Skill not provided in query");
      return res.status(400).json({ message: "Skill is required" });
    }

    const profile = await Candidate.findOne({ "projects.techStack": skill });

    if (!profile) {
      console.error("No profile found with given skill:", skill);
      return res
        .status(404)
        .json({ message: "No projects found for this skill" });
    }

    console.log("Profile found:", profile.name);

    const result = {
      name: profile.name,
      email: profile.email,
      projects: profile.projects.filter((p) => p.techStack.includes(skill)),
    };

    console.log("Filtered projects:", result.projects);

    res.status(200).json({
      message: "Projects fetched Successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching projects by skill:", error.message);

    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get Top Skills
export const getTopSkills = async (req, res) => {
  try {
    const profile = await Candidate.findOne();

    if (!profile) {
      console.error("Profile not found");
      return res.status(404).json({ message: "Profile not found" });
    }

    // Count frequency of each skill
    const counts = {};
    profile.skills.forEach((s) => {
      counts[s] = (counts[s] || 0) + 1;
    });

    // Convert counts object into array of [skill, count] in desc order
    const sortedSkills = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    res.status(200).json({
      message: "Top skills fetched successfully",
      data: sortedSkills,
    });
  } catch (error) {
    console.error("Error fetching top skills:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Search query q in projects/ works array

export const searchQuery = async (req, res) => {
  try {
    let { q } = req.query;

    if (!q) {
      return res
        .status(400)
        .json({ message: "Query parameter 'q' is required" });
    }

    q = q.toLowerCase();

    const profile = await Candidate.findOne();
    if (!profile) {
      console.error("Profile not found");
      return res.status(404).json({ message: "Profile not found" });
    }

    const nameMatch = (profile.name || "").toLowerCase().includes(q);
    const emailMatch = (profile.email || "").toLowerCase().includes(q);

    const projects = profile.projects.filter(
      (p) =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q) ||
        (p.techStack || []).some((tech) => tech.toLowerCase().includes(q))
    );

    const work = profile.work.filter(
      (w) =>
        (w.companyName || "").toLowerCase().includes(q) ||
        (w.role || "").toLowerCase().includes(q)
    );

    res.status(200).json({
      data: {
        profileInfo: {
          name: nameMatch ? profile.name : null,
          email: emailMatch ? profile.email : null,
        },
        projects,
        work,
      },
      message: "Data Fetched Successfully",
    });
  } catch (error) {
    console.error("Error fetching the data:", error.message);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};




