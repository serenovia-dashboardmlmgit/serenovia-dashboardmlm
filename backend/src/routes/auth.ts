import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model.ts/User.js";          // ✅ fixed import
import { transporter } from "../server.js";   // ✅ fixed import

const router = Router();

// --- Login Route ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔐 Login attempt:", { email, password });

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.passwordHash) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash as string);
    if (!valid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (!user.verified) {
      return res.status(403).json({ error: "Email not verified" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email }
    });
  } catch (err) {
    console.error("💥 Login error:", err);
    return res.status(500).json({ error: "Login failed" });
  }
});

// --- Register Route ---
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, userId, country, password, referralCode } = req.body;

    if (!fullName || !email || !phone || !userId || !country || !password || !referralCode) {
      return res.status(400).json({ error: "All fields including referral code are required" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const existingUserId = await User.findOne({ userId });
    if (existingUserId) {
      return res.status(400).json({ error: "User ID is already taken. Please choose another one." });
    }

    if (referralCode !== "Serenity") {
      const referrer = await User.findOne({ userId: referralCode });
      if (!referrer) {
        return res.status(400).json({ error: "Invalid referral code" });
      }
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

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your Serenovia account",
      text: `Welcome ${fullName}! Your verification code is: ${verificationCode}`
    });

    return res.status(201).json({
      message: "User registered successfully. Verification email sent."
    });
  } catch (err) {
    console.error("💥 Registration error:", err);
    return res.status(500).json({ error: "Registration failed" });
  }
});

export default router;
