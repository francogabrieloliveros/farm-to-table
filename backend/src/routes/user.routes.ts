import { Router } from "express";
import { verifyToken, verifyAdmin, type AuthRequest } from "../middlewares/auth.middleware.js";
import { getRegisteredConsumers, updateProfile, getUser } from "../controllers/user.controller.js";

const router = Router();


router.get('/profile', verifyToken, (req: AuthRequest, res) => {
    res.status(200).json({
        success: true,
        data: req.user
    });
});

router.put('/profile', verifyToken, updateProfile);


router.get('/admin-only', verifyToken, verifyAdmin, (req: AuthRequest, res) => {
    res.status(200).json({
        success: true,
        message: "You have successfully accessed the admin-only route."
    });
});

router.get('/customers', verifyToken, verifyAdmin, getRegisteredConsumers);

router.get("/:id", verifyToken, verifyAdmin, getUser);
export default router;
