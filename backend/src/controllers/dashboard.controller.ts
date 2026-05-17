import type { Request, Response } from 'express';
import User from '../models/user.model.js';
import { Order, OrderStatus } from '../models/order.model.js';
import { Product } from '../models/product.model.js';

export class DashboardController {
  /**
   * GET /api/dashboard/stats
   * Returns real-time stats for the admin dashboard
   */
  static async getStats(_req: Request, res: Response) {
    try {
      const [totalUsers, totalPendingOrders, totalProducts, revenueResult, recentOrdersRaw] =
        await Promise.all([
          // count registered consumer users
          User.countDocuments({ userType: 'Consumer' }).exec(),

          // count pending orders
          Order.countDocuments({ status: OrderStatus.Pending }).exec(),

          // count active products
          Product.countDocuments().exec(),

          // calculate total revenue from completed orders (now using the totalAmount field)
          Order.aggregate([
            { $match: { status: OrderStatus.Completed } },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: '$totalAmount' },
              },
            },
          ]).exec(),

          // get 5 most recent orders with user and items populated
          Order.find()
            .sort({ dateOrdered: -1 })
            .limit(5)
            .populate('userId', 'firstName lastName email')
            .populate('items.productId', 'name price')
            .exec(),
        ]);

      const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

      // Map recent orders to the format expected by the frontend
      const recentOrders = recentOrdersRaw
        .filter((order: any) => order.items && order.items.length > 0 && order.userId)
        .map((order: any) => {
        const firstItem = order.items[0];
        return {
          _id: order._id,
          status: order.status,
          quantity: order.items.reduce((acc: number, item: any) => acc + item.quantity, 0),
          dateOrdered: order.dateOrdered,
          productName: firstItem ? `${firstItem.productId?.name || 'Unknown'}${order.items.length > 1 ? ` + ${order.items.length - 1} more` : ''}` : 'No items',
          productPrice: firstItem ? firstItem.priceAtPurchase : 0,
          totalAmount: order.totalAmount || 0,
          customerName: `${order.userId?.firstName || 'Unknown'} ${order.userId?.lastName || ''}`,
          customerEmail: order.userId?.email || 'N/A',
        };
      });

      return res.status(200).json({
        success: true,
        data: {
          totalUsers,
          totalPendingOrders,
          totalProducts,
          totalRevenue,
          recentOrders,
        },
      });
    } catch (error: any) {
      console.error('Error fetching dashboard stats:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch dashboard statistics.',
        error: error.message,
      });
    }
  }
}
