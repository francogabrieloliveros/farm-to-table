import { type Request, type Response } from 'express';
import { ReportService } from '../services/report.service.js';

export class ReportController {
  static async exportSalesData(req: Request, res: Response) {
    try {
      const csvData = await ReportService.exportSalesData();

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="sales_report.csv"');
      res.status(200).send(csvData);
    } catch (error: any) {
      console.error('Error generating CSV report:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to export sales data',
        error: error.message,
      });
    }
  }
}
