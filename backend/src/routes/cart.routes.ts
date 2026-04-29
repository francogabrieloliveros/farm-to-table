import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '../controllers/cart.controller.js';

const router = Router();

// all cart routes require authentication
router.use(verifyToken);

// fetch the authenticated user's cart
router.get('/', getCart);

// add a product to the cart (or increase qty)
router.post('/items', addCartItem);

// set the quantity for a specific item
router.patch('/items/:productId', updateCartItem);

// remove a specific item from the cart
router.delete('/items/:productId', removeCartItem);

// clear all items from the cart (post-checkout)
router.delete('/', clearCart);

export default router;
