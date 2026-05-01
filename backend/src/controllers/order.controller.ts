import type { Request, Response } from 'express';
import { OrderService } from '../services/order.service.js';
import type { AuthRequest } from '../middlewares/auth.middleware.js';

// create order (customer)
export const createOrder = async (req: AuthRequest, res: Response) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({
      success: false,
      message: 'Product ID and quantity are required.',
    });
  }

  try {
    const order = await OrderService.createOrder({
      productId: String(productId),
      quantity: Number(quantity),
      userEmail: req.user?.id || 'unknown', // adjust if your user uses email
    });

    return res.status(201).json({
      success: true,
      message: 'Order created successfully.',
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
export const getAllOrders = async (_req: Request, res: Response) => {
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
    const email = req.user?.id || ''; // adjust later if needed

    const orders = await OrderService.getOrdersByUser(email);

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
export const confirmOrder = async (req: Request, res: Response) => {
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
export const cancelOrder = async (req: Request, res: Response) => {
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