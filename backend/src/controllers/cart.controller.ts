import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth.middleware.js';
import { CartService } from '../services/cart.service.js';

// GET /api/cart
export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await CartService.getCartByUserId(req.user!.id);

    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve cart.',
      error: error.message,
    });
  }
};

// POST /api/cart/items
// body: { productId, quantity? }
export const addCartItem = async (req: AuthRequest, res: Response) => {
  const { productId, quantity } = req.body;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: 'productId is required.',
    });
  }

  try {
    const cart = await CartService.addItem(
      req.user!.id,
      String(productId),
      quantity ? Number(quantity) : 1
    );

    return res.status(200).json({
      success: true,
      message: 'Item added to cart.',
      data: cart,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add item to cart.',
      error: error.message,
    });
  }
};

// PATCH /api/cart/items/:productId
// body: { quantity }
export const updateCartItem = async (req: AuthRequest, res: Response) => {
  const productId = String(req.params.productId);
  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(400).json({
      success: false,
      message: 'quantity is required.',
    });
  }

  try {
    const cart = await CartService.updateItemQuantity(
      req.user!.id,
      productId,
      Number(quantity)
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart or item not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Cart item updated.',
      data: cart,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update cart item.',
      error: error.message,
    });
  }
};

// DELETE /api/cart/items/:productId
export const removeCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await CartService.removeItem(req.user!.id, String(req.params.productId));

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Item removed from cart.',
      data: cart,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to remove cart item.',
      error: error.message,
    });
  }
};

// DELETE /api/cart
// "Clear Cart" controller — intended for use after successful checkout
export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await CartService.clearCart(req.user!.id);

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Cart cleared successfully.',
      data: cart,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to clear cart.',
      error: error.message,
    });
  }
};
