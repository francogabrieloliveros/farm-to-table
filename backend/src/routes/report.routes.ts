import express from 'express';
import { ReportController } from '../controllers/report.controller.js';


const router = express.Router();

router.get('/export', ReportController.exportSalesData);

export default router;
