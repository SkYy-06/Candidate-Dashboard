import mongoose, { mongo } from "mongoose";
import { type } from "os";

const workSchema = new mongoose.Schema({
  companyName: String,
  role: String,
  duration: String,
});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  links: [String],
  techStack: [String],
});

const profile = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  education: String,
  skills: [String],
  projects: [projectSchema],
  work: [workSchema],
  links: {
    github: { type: String },
    linkedin: { type: String },
    portfolio: { type: String },
  },
});

const Candidate = mongoose.model("CandidateProfile", profile);
export default Candidate;
