import { Router } from "express";
import User from "../model/User.ts";   // ✅ use .ts if running ts-node, .js if running compiled
import { authenticateJWT } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateJWT, async (req, res) => {
  try {
    const users = await User.find();

    const totalUsers = users.length;
    const sales = users.reduce((sum: number, u: any) => sum + u.productsSold, 0);
    const referrals = users.reduce((sum: number, u: any) => sum + u.referralsSold, 0);
    const revenue = sales * 10;
    const totalEarnings = revenue + referrals * 5;
    const pendingPayouts = users.reduce((sum: number, u: any) => sum + u.commission, 0);

    res.json({
      totalUsers,
      sales,
      referrals,
      revenue,
      totalEarnings,
      pendingPayouts
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
