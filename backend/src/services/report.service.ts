import mongoose from 'mongoose';
import { Order, OrderStatus } from '../models/order.model.js';
import { ProductType } from '../types/product.types.js';

export enum ReportInterval {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Annual = 'annual',
}

export class ReportService {
  /**
   * Generates a financial report grouped by the specified interval.
   * Unwinds multi-item orders to calculate per-product sales and income.
   */
  static async generateFinancialReport(interval: ReportInterval) {
    let dateGroupFormat: any;

    switch (interval) {
      case ReportInterval.Weekly:
        dateGroupFormat = {
          year: { $isoWeekYear: '$dateOrdered' },
          week: { $isoWeek: '$dateOrdered' },
        };
        break;
      case ReportInterval.Monthly:
        dateGroupFormat = {
          year: { $year: '$dateOrdered' },
          month: { $month: '$dateOrdered' },
        };
        break;
      case ReportInterval.Annual:
        dateGroupFormat = {
          year: { $year: '$dateOrdered' },
        };
        break;
      default:
        throw new Error('Invalid reporting interval');
    }

    const pipeline: mongoose.PipelineStage[] = [
      // filter only completed orders
      { $match: { status: OrderStatus.Completed } },
      
      // Unwind items array to process each product sale individually
      { $unwind: '$items' },

      // Lookup product details
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      { $unwind: '$productDetails' },

      // Group by time interval and product
      {
        $group: {
          _id: {
            interval: dateGroupFormat,
            productId: '$items.productId',
          },
          totalSales: { $sum: '$items.quantity' },
          income: {
            $sum: { $multiply: ['$items.quantity', '$items.priceAtPurchase'] },
          },
          productName: { $first: '$productDetails.name' },
        },
      },

      // Group by time interval to gather all products
      {
        $group: {
          _id: '$_id.interval',
          products: {
            $push: {
              productId: '$_id.productId',
              productName: '$productName',
              totalSales: '$totalSales',
              income: '$income',
            },
          },
          totalIntervalIncome: { $sum: '$income' },
        },
      },

      // Sort by newest first
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1,
          '_id.week': -1,
        },
      },
    ];

    return await Order.aggregate(pipeline).exec();
  }

  static async getTotalPendingOrders(): Promise<number> {
    return Order.countDocuments({ status: OrderStatus.Pending }).exec();
  }

  /**
   * Generates a CSV formatted string for all completed sales
   */
  static async exportSalesData(): Promise<string> {
    const pipeline: mongoose.PipelineStage[] = [
      { $match: { status: OrderStatus.Completed } },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      { $unwind: '$productDetails' },
      {
        $project: {
          productName: '$productDetails.name',
          productType: {
            $cond: {
              if: { $eq: ['$productDetails.type', ProductType.Crop] },
              then: 'Crop',
              else: 'Poultry'
            }
          },
          quantitySold: '$items.quantity',
          income: { $multiply: ['$items.quantity', '$items.priceAtPurchase'] },
          date: { $dateToString: { format: '%Y-%m-%d', date: '$dateOrdered' } }
        }
      },
      { $sort: { date: -1 } }
    ];

    const results = await Order.aggregate(pipeline).exec();

    const headers = ['Product Name', 'Product Type', 'Quantity Sold', 'Income per Product', 'Date'];

    if (!results || results.length === 0) {
      return headers.join(',');
    }

    const rows = results.map((row: any) => {
      const escapeCSV = (val: any) => {
        if (val == null) return '';
        const str = String(val);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      return [
        escapeCSV(row.productName),
        escapeCSV(row.productType),
        escapeCSV(row.quantitySold),
        escapeCSV(row.income),
        escapeCSV(row.date)
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }
}
