import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";   // for password hashing
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const JWT_SECRET = process.env.JWT_SECRET!;


// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// --- Nodemailer Transporter ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
  user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
  }
});

// --- User Schema ---
const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  phone: String,
  userId: String,
  country: String,
  passwordHash: String,
  referralCode: String,
  verified: { type: Boolean, default: false },
  productsSold: { type: Number, default: 0 },
  referralsSold: { type: Number, default: 0 },
  commission: { type: Number, default: 0 },
  verificationCode: String
});

const User = mongoose.model("User", userSchema);

// --- JWT Middleware ---
const authenticateJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1]; // Expect "Bearer <token>"
  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded; // attach decoded payload to request
    next();
  });
};

// --- Routes ---
// Stats (protected)
app.get("/api/stats", authenticateJWT, async (req, res) => {
  const users = await User.find();
  const totalUsers = users.length;
  const sales = users.reduce((sum, u) => sum + u.productsSold, 0);
  const referrals = users.reduce((sum, u) => sum + u.referralsSold, 0);
  const revenue = sales * 10;
  const totalEarnings = revenue + referrals * 5;
  const pendingPayouts = users.reduce((sum, u) => sum + u.commission, 0);

  res.json({
    totalUsers,
    sales,
    referrals,
    revenue,
    totalEarnings,
    pendingPayouts
  });
});

// Sales Leaderboard (protected)
app.get("/api/leaderboard/sales", authenticateJWT, async (req, res) => {
  const leaderboard = await User.find({ productsSold: { $gte: 25 } }).sort({ productsSold: -1 });
  res.json(leaderboard);
});

// Referral Leaderboard (protected)
app.get("/api/leaderboard/referrals", authenticateJWT, async (req, res) => {
  const leaderboard = await User.find().sort({ referralsSold: -1 });
  res.json(leaderboard);
});

// Announcements (public)
app.get("/api/announcements", (req, res) => {
  res.json([
    { id: 1, title: "Welcome to Serenovia!" },
    { id: 2, title: "No members yet — register to get started." }
  ]);
});

// Register a new user
app.post("/api/register", async (req, res) => {
  const { fullName, email, phone, userId, country, password, referralCode } = req.body;

  if (!fullName || !email || !phone || !userId || !country || !password || !referralCode) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: "Email already registered" });

  const passwordHash = await bcrypt.hash(password, 10);
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  const newUser = new User({
    fullName,
    email,
    phone,
    userId,
    country,
    passwordHash,
    referralCode,
    verificationCode
  });

  await newUser.save();

  await transporter.sendMail({
    from: "your-email@gmail.com",
    to: email,
    subject: "Verify your Serenovia account",
    text: `Your verification code is ${verificationCode}`
  });

  res.json({ message: "User registered successfully. Check your email for verification code." });
});

// Verify email route
app.post("/api/verifyEmail", async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ error: "User not found" });
  if (user.verificationCode !== code) return res.status(400).json({ error: "Invalid code" });

  user.verified = true;
  await user.save();

  res.json({ message: "Email verified successfully" });
});

// Login route with JWT
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: "Invalid credentials" });
  if (!user.passwordHash) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash as string);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  if (!user.verified) return res.status(400).json({ error: "Email not verified" });

  // Generate JWT
  const token = jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});

// Record a product sale (protected)
app.post("/api/sellProduct/:id", authenticateJWT, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.productsSold += 1;
  user.commission += 10;
  await user.save();

  res.json({ message: "Product sale recorded", user });
});

// Record a referral (protected)
app.post("/api/addReferral/:id", authenticateJWT, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.referralsSold += 1;
  user.commission += 5;
  await user.save();

  res.json({ message: "Referral recorded", user });
});

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
