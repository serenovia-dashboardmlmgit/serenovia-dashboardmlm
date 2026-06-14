import { Router } from "express";
import User from "../models/User";
import { authenticateJWT } from "../middleware/auth";
const router = Router();
router.get("/sales", authenticateJWT, async (req, res) => {
    const leaderboard = await User.find({ productsSold: { $gte: 25 } }).sort({ productsSold: -1 });
    res.json(Array.isArray(leaderboard) ? leaderboard : []);
});
router.get("/referrals", authenticateJWT, async (req, res) => {
    const leaderboard = await User.find().sort({ referralsSold: -1 });
    res.json(Array.isArray(leaderboard) ? leaderboard : []);
});
export default router;
//# sourceMappingURL=leaderboard.js.map