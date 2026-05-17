import type { Response } from 'express';
import { OrderService } from '../services/order.service.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

// create order (customer)
export const createOrder = async (req: AuthRequest, res: Response) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'At least one product item is required.',
    });
  }

  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const order = await OrderService.createOrder(userId, items);

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully.',
      data: order,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create order.',
      error: error.message,
    });
  }
};

// get all orders (admin)
export const getAllOrders = async (_req: AuthRequest, res: Response) => {
  try {
    const orders = await OrderService.getAllOrders();

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve orders.',
      error: error.message,
    });
  }
};

// get current user's orders
export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const orders = await OrderService.getOrdersByUser(userId);

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve your orders.',
      error: error.message,
    });
  }
};

// confirm order (admin)
export const confirmOrder = async (req: AuthRequest, res: Response) => {
  try {
    const order = await OrderService.confirmOrder(String(req.params.id));

    return res.status(200).json({
      success: true,
      message: 'Order confirmed successfully.',
      data: order,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// cancel order (customer)
export const cancelOrder = async (req: AuthRequest, res: Response) => {
  try {
    const order = await OrderService.cancelOrder(String(req.params.id));

    return res.status(200).json({
      success: true,
      message: 'Order canceled successfully.',
      data: order,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};