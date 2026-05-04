import mongoose from 'mongoose';
import { Order, OrderStatus } from '../models/order.model.js';
import { ProductType } from '../types/product.types.js';

export enum ReportInterval {
  Weekly = 'weekly',
  Monthly = 'monthly',
  Annual = 'annual',
}

export class ReportService {
  // Generates a financial report grouped by the specified interval.
  // Calculates total sales and income per product.
  // Filters calculations to only include completed orders.
  static async generateFinancialReport(interval: ReportInterval) {
    let dateGroupFormat: any;

    switch (interval) {
      case ReportInterval.Weekly:
        // group by ISO week year and ISO week
        dateGroupFormat = {
          year: { $isoWeekYear: '$dateOrdered' },
          week: { $isoWeek: '$dateOrdered' },
        };
        break;
      case ReportInterval.Monthly:
        // group by year and month
        dateGroupFormat = {
          year: { $year: '$dateOrdered' },
          month: { $month: '$dateOrdered' },
        };
        break;
      case ReportInterval.Annual:
        // Group by year
        dateGroupFormat = {
          year: { $year: '$dateOrdered' },
        };
        break;
      default:
        throw new Error('Invalid reporting interval');
    }

    const pipeline: mongoose.PipelineStage[] = [
      // filter only completed orders
      {
        $match: {
          status: OrderStatus.Completed,
        },
      },
      // convert productId (string) to objectId to join with Products collection
      {
        $addFields: {
          productObjId: { $toObjectId: '$productId' },
        },
      },
      // lookup product details to access price for income calculation
      {
        $lookup: {
          from: 'products', // The collection name for Product model
          localField: 'productObjId',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      // unwind the productDetails array to a single object
      {
        $unwind: '$productDetails',
      },
      // group by time interval and product
      {
        $group: {
          _id: {
            interval: dateGroupFormat,
            productId: '$productId',
          },
          totalSales: { $sum: '$quantity' },
          income: {
            $sum: { $multiply: ['$quantity', '$productDetails.price'] },
          },
          productName: { $first: '$productDetails.name' },
        },
      },
      // group by time interval to gather all products and sum total income
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
      // sort by newest first
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

  // Generates a CSV formatted string for all completed sales
  static async exportSalesData(): Promise<string> {
    const pipeline: mongoose.PipelineStage[] = [
      {
        $match: {
          status: OrderStatus.Completed,
        },
      },
      {
        $addFields: {
          productObjId: { $toObjectId: '$productId' },
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productObjId',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      {
        $unwind: '$productDetails',
      },
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
          quantitySold: '$quantity',
          income: { $multiply: ['$quantity', '$productDetails.price'] },
          date: { $dateToString: { format: '%Y-%m-%d', date: '$dateOrdered' } }
        }
      },
      {
        $sort: { date: -1 }
      }
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
