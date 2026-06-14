import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model.ts/User.js";   // ✅ use .js when running compiled output

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET!;

// --- Login Route ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Guard against missing passwordHash
    if (!user.passwordHash) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash as string);
    if (!valid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (!user.verified) {
      return res.status(400).json({ error: "Email not verified" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

// --- Register Route ---
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, userId, country, password, referralCode } = req.body;

    if (!fullName || !email || !phone || !userId || !country || !password || !referralCode) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

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
      verificationCode,
      verified: false
    });

    await newUser.save();

    res.json({ message: "User registered successfully. Check your email for verification code." });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

export default router;
