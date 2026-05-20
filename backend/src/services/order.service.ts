import { Order, OrderStatus } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import mongoose from "mongoose";

export class OrderService {
  /**
   * Create a new order with multiple items
   * Calculates totalAmount and snapshots priceAtPurchase for each item
   */
  static async createOrder(userId: string, items: { productId: string; quantity: number }[]) {
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      const priceAtPurchase = product.price;
      totalAmount += priceAtPurchase * item.quantity;

      orderItems.push({
        productId: new mongoose.Types.ObjectId(item.productId),
        quantity: item.quantity,
        priceAtPurchase: priceAtPurchase,
      });
    }

    const order = await Order.create({
      userId: new mongoose.Types.ObjectId(userId),
      items: orderItems,
      totalAmount,
      status: OrderStatus.Pending,
    });

    return order;
  }

  /**
   * Get all orders with user and product details (for admin)
   */
  static async getAllOrders() {
    return Order.find()
      .populate('userId', 'firstName lastName email')
      .populate('items.productId', 'name imageUrl')
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * Get orders for a specific user
   */
  static async getOrdersByUser(userId: string) {
    return Order.find({ userId: new mongoose.Types.ObjectId(userId) })
      .populate('items.productId', 'name imageUrl')
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * Confirm an order → mark as completed + update product inventory for ALL items
   */
  static async confirmOrder(orderId: string) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const order = await Order.findById(orderId).session(session);

      if (!order) {
        throw new Error("Order not found");
      }

      if (order.status !== OrderStatus.Pending) {
        throw new Error("Only pending orders can be confirmed");
      }

      // Check stock and update for all items
      for (const item of order.items) {
        const product = await Product.findById(item.productId).session(session);
        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        if (product.quantity < item.quantity) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }

        product.quantity -= item.quantity;
        await product.save({ session });
      }

      order.status = OrderStatus.Completed;
      await order.save({ session });

      await session.commitTransaction();
      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  /**
   * Cancel an order (only if still pending)
   */
  static async cancelOrder(orderId: string) {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status !== OrderStatus.Pending) {
      throw new Error("Only pending orders can be canceled");
    }

    order.status = OrderStatus.Canceled;
    await order.save();

    return order;
  }
}
