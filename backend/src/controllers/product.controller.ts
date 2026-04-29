import type { Request, Response } from 'express';
import { ProductService, type SortField, type SortOrder } from '../services/product.service.js';

// helpers

// query string value to a positive integer, returning undefined when invalid
function parsePositiveInt(value: unknown): number | undefined {
  const n = parseInt(String(value), 10);
  return !isNaN(n) && n > 0 ? n : undefined;
}

const VALID_SORT_FIELDS: SortField[] = ['name', 'type', 'price', 'quantity'];
const VALID_SORT_ORDERS: SortOrder[] = ['asc', 'desc'];



// POST /api/products
// body (multipart/form-data): name, description, type, quantity, price + image file
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, type, quantity, price } = req.body;

  if (!name || !description || type === undefined || quantity === undefined || price === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields: name, description, type, quantity, price',
    });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'A product image is required.',
    });
  }

  try {
    const product = await ProductService.createProduct(
      {
        name: String(name),
        description: String(description),
        type: Number(type),
        quantity: Number(quantity),
        price: Number(price),
      },
      req.file.buffer
    );

    return res.status(201).json({
      success: true,
      message: 'Product created successfully.',
      data: product,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create product.',
      error: error.message,
    });
  }
};

// GET /api/products
// Query params: limit, offset, sortBy, sortOrder
export const getProducts = async (req: Request, res: Response) => {
  const limit = parsePositiveInt(req.query.limit) ?? 10;
  const offset = Math.max(0, parseInt(String(req.query.offset ?? '0'), 10) || 0);

  const rawSortBy = String(req.query.sortBy ?? 'name').toLowerCase() as SortField;
  const rawSortOrder = String(req.query.sortOrder ?? 'asc').toLowerCase() as SortOrder;

  if (!VALID_SORT_FIELDS.includes(rawSortBy)) {
    return res.status(400).json({
      success: false,
      message: `Invalid sortBy value. Must be one of: ${VALID_SORT_FIELDS.join(', ')}.`,
    });
  }

  if (!VALID_SORT_ORDERS.includes(rawSortOrder)) {
    return res.status(400).json({
      success: false,
      message: `Invalid sortOrder value. Must be one of: ${VALID_SORT_ORDERS.join(', ')}.`,
    });
  }

  try {
    const result = await ProductService.getProducts({
      limit,
      offset,
      sortBy: rawSortBy,
      sortOrder: rawSortOrder,
    });

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve products.',
      error: error.message,
    });
  }
};

// GET /api/products/:id
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductService.getProductById(String(req.params.id));

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve product.',
      error: error.message,
    });
  }
};

// PUT /api/products/:id
// body (multipart/form-data): any subset of product fields + optional image file
export const updateProduct = async (req: Request, res: Response) => {
  const { name, description, type, quantity, price } = req.body;

  // build a partial update object from whatever was provided
  const updates: Record<string, unknown> = {};
  if (name !== undefined) updates.name = String(name);
  if (description !== undefined) updates.description = String(description);
  if (type !== undefined) updates.type = Number(type);
  if (quantity !== undefined) updates.quantity = Number(quantity);
  if (price !== undefined) updates.price = Number(price);

  try {
    const updated = await ProductService.updateProduct(
      String(req.params.id),
      updates as any,
      req.file?.buffer
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update product.',
      error: error.message,
    });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await ProductService.deleteProduct(String(req.params.id));

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully.',
      data: deleted,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete product.',
      error: error.message,
    });
  }
};
