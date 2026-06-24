import { Router } from "express";
import User from "../model.ts/User.js"; // ✅ compiled output uses .js

const router = Router();

// --- Verify Email Route ---
router.post("/", async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    // Basic validation
    if (!email || !verificationCode) {
      return res.status(400).json({ error: "Email and code are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Already verified
    if (user.verified) {
      return res.status(400).json({ error: "Email already verified" });
    }

    // Compare codes (string comparison for safety)
    if (String(user.verificationCode) !== String(verificationCode)) {
      return res.status(400).json({ error: "Invalid verification code" });
    }

    // Mark verified
    user.verified = true;
    user.verificationCode = null; // ✅ clear safely
    await user.save();

    return res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Verification error:", err);
    return res.status(500).json({ error: "Verification failed" });
  }
});

export default router;
