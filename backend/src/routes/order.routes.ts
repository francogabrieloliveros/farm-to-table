import { Router } from 'express';
import { verifyToken, verifyAdmin } from '../middlewares/auth.middleware.js';
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  confirmOrder,
  cancelOrder,
} from '../controllers/order.controller.js';

const router = Router();

// all routes require authentication
router.use(verifyToken);

// customer routes
router.post('/', createOrder);           // create order
router.get('/my', getMyOrders);          // view own orders
router.put('/:id/cancel', cancelOrder);  // cancel order

// admin routes
router.get('/', verifyAdmin, getAllOrders);         // view all orders
router.put('/:id/confirm', verifyAdmin, confirmOrder); // confirm order

export default router;