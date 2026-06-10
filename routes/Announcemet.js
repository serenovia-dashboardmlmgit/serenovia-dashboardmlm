import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
    res.json([
        { id: 1, title: "Welcome to Serenovia!" },
        { id: 2, title: "No members yet — register to get started." }
    ]);
});
export default router;
//# sourceMappingURL=Announcemet.js.map