import { type Request, type Response } from 'express';
import { ReportService } from '../services/report.service.js';

export class ReportController {
  static async getSalesReport(req: Request, res: Response) {
    try {
      const interval = String(req.query.interval || 'weekly').toLowerCase();

      if (!['weekly', 'monthly', 'annual'].includes(interval)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid interval. Use weekly, monthly, or annual.',
        });
      }

      const [report, totalPendingOrders] = await Promise.all([
        ReportService.generateFinancialReport(interval as any),
        ReportService.getTotalPendingOrders(),
      ]);

      return res.status(200).json({
        success: true,
        totalPendingOrders,
        data: report,
      });

    } catch (error: any) {
      console.error('Error generating sales report:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to generate sales report',
        error: error.message,
      });
    }
  }

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
