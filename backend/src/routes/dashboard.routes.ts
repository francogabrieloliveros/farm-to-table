import { Router } from 'express';
import { verifyToken, verifyAdmin } from '../middlewares/auth.middleware.js';
import { DashboardController } from '../controllers/dashboard.controller.js';

const router = Router();

// GET /api/dashboard/stats — admin-only real-time dashboard metrics
router.get('/stats', verifyToken, verifyAdmin, DashboardController.getStats);

export default router;
