import express from 'express';
import { verifyToken, verifyAdmin } from '../middlewares/auth.middleware.js';
import { ReportController } from '../controllers/report.controller.js';

const router = express.Router();

// all report routes require admin authentication
router.use(verifyToken, verifyAdmin);

router.get('/', ReportController.getSalesReport);
router.get('/export', ReportController.exportSalesData);

export default router;