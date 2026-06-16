import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

import authRoutes from "./routes/auth.js";
import statsRoutes from "./routes/stats.js";
import leaderboardRoutes from "./routes/leaderboard.js";
import announcementRoutes from "./routes/Announcemet.js"; // ✅ fixed typo
import verifyEmailRoutes from "./routes/verifyEmail.js";   // ✅ new route

// --- Ensure JWT_SECRET is defined ---
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is not defined in environment variables. Please set it in .env");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URL!)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// --- Nodemailer Transporter (global setup) ---
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // your Gmail address
    pass: process.env.EMAIL_PASS    // your 16-char App password
  }
});

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/verifyEmail", verifyEmailRoutes); // ✅ added

// --- Root Endpoint ---
app.get("/", (req, res) => res.send("Backend is running!"));

// --- Server Start ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
