import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";

import profileRoutes from "./routes/profile.route.js"; // your routes
import connectDB from "./lib/db.js"; // DB connection

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://candidate-dashboard-tlmo.vercel.app", // deployed frontend
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/profile", profileRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

// Connect to DB and start server
connectDB();
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
