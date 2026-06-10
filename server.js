import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import statsRoutes from "./routes/stats";
import leaderboardRoutes from "./routes/leaderboard";
import announcementRoutes from "./routes/announcements";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));
app.use("/api/auth", authRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/announcements", announcementRoutes);
app.get("/", (req, res) => res.send("Backend is running!"));
app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
//# sourceMappingURL=server.js.map