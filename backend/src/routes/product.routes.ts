import { Router } from 'express';
import { verifyToken, verifyAdmin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';

const router = Router();

// all product routes require authentication
router.use(verifyToken);

// customer + admin: browse catalog
router.get('/', getProducts);
router.get('/:id', getProductById);

// admin only: catalog maintenance
router.post('/', verifyAdmin, upload.single('image'), createProduct);
router.put('/:id', verifyAdmin, upload.single('image'), updateProduct);
router.delete('/:id', verifyAdmin, deleteProduct);

export default router;
