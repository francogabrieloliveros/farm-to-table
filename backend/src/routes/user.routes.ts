import { Router } from "express";
import { verifyToken, verifyAdmin, type AuthRequest } from "../middlewares/auth.middleware.js";

const router = Router();


router.get('/profile', verifyToken, (req: AuthRequest, res) => {
    res.status(200).json({
        success: true,
        data: req.user
    });
});


router.get('/admin-only', verifyToken, verifyAdmin, (req: AuthRequest, res) => {
    res.status(200).json({
        success: true,
        message: "You have successfully accessed the admin-only route."
    });
});

export default router;
