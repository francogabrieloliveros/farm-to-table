import { Order, OrderStatus, type IOrder } from '../models/order.model.js';
import { Product } from '../models/product.model.js';

// Service layer for order-related logic
export class OrderService {

  // create a new order (default: Pending)
  static async createOrder(data: Omit<IOrder, 'status' | 'dateOrdered'>) {
    const order = await Order.create({
      ...data,
      status: OrderStatus.Pending,
    });

    return order;
  }

  // get all orders (for admin)
  static async getAllOrders() {
    return Order.find().exec();
  }

  // get orders for a specific user (by email)
  static async getOrdersByUser(email: string) {
    return Order.find({ userEmail: email }).exec();
  }

  // confirm an order → mark as completed + update product inventory
  static async confirmOrder(orderId: string) {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status !== OrderStatus.Pending) {
      throw new Error('Only pending orders can be confirmed');
    }

    // find the related product
    const product = await Product.findById(order.productId);

    if (!product) {
      throw new Error('Product not found');
    }

    // check if enough stock exists
    if (product.quantity < order.quantity) {
      throw new Error('Insufficient product quantity');
    }

    // decrease product inventory
    product.quantity -= order.quantity;
    await product.save();

    // mark order as completed
    order.status = OrderStatus.Completed;
    await order.save();

    return order;
  }

  // cancel an order (only if still pending)
  static async cancelOrder(orderId: string) {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status !== OrderStatus.Pending) {
      throw new Error('Only pending orders can be canceled');
    }

    order.status = OrderStatus.Canceled;
    await order.save();

    return order;
  }
}