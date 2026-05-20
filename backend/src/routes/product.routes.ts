import { Router } from "express";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

// customer + admin + guest: browse catalog
router.get("/", getProducts);
router.get("/:id", getProductById);

// admin only: catalog maintenance
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  upload.single("image"),
  createProduct,
);
router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  upload.single("image"),
  updateProduct,
);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);

export default router;
