import { Router } from "express";
import User from "../model/User.js";
import { authenticateJWT } from "../middleware/auth";
const router = Router();
router.get("/", authenticateJWT, async (req, res) => {
    const users = await User.find();
    const totalUsers = users.length;
    const sales = users.reduce((sum, u) => sum + u.productsSold, 0);
    const referrals = users.reduce((sum, u) => sum + u.referralsSold, 0);
    const revenue = sales * 10;
    const totalEarnings = revenue + referrals * 5;
    const pendingPayouts = users.reduce((sum, u) => sum + u.commission, 0);
    res.json({ totalUsers, sales, referrals, revenue, totalEarnings, pendingPayouts });
});
export default router;
//# sourceMappingURL=stats.js.map