import { Product } from '../models/product.model.js';
import cloudinary from '../config/cloudinary.js';
import type { IProduct, IProductDocument } from '../types/product.types.js';
import { Cart } from '../models/cart.model.js';

// sort helpers
export type SortField = 'name' | 'type' | 'price' | 'quantity';
export type SortOrder = 'asc' | 'desc';

// maps client-facing field names to the actual mongoose document fields
const SORT_FIELD_MAP: Record<SortField, string> = {
  name: 'name',
  type: 'type',
  price: 'price',
  quantity: 'quantity',
};

interface GetProductsOptions {
  limit: number;
  offset: number;
  sortBy: SortField;
  sortOrder: SortOrder;
  type?: number;
  search?: string;
}

interface PaginatedResult {
  data: IProductDocument[];
  total: number;
  limit: number;
  offset: number;
}

export class ProductService {
  // upload a buffer to cloudinary and return the secure url
  private static async uploadImage(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'farm-to-table/products' },
        (error, result) => {
          if (error || !result) return reject(error ?? new Error('Upload failed'));
          resolve(result.secure_url);
        }
      );
      stream.end(buffer);
    });
  }

  // create a new product with an uploaded image
  static async createProduct(
    data: Omit<IProduct, 'imageUrl'>,
    imageBuffer: Buffer
  ): Promise<IProductDocument> {
    const imageUrl = await this.uploadImage(imageBuffer);

    const product = await Product.create({
      ...data,
      imageUrl,
    });

    return product;
  }

  // get paginated + sorted product list
  static async getProducts(options: GetProductsOptions): Promise<PaginatedResult> {
    const { limit, offset, sortBy, sortOrder, type, search } = options;

    const sortKey = SORT_FIELD_MAP[sortBy];
    const sortDirection = sortOrder === 'asc' ? 1 : -1;

    const query: any = {};
    if (type) {
      query.type = type;
    }
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const [data, total] = await Promise.all([
      Product.find(query)
        .sort({ [sortKey]: sortDirection })
        .skip(offset)
        .limit(limit)
        .exec(),
      Product.countDocuments(query).exec(),
    ]);

    return { data, total, limit, offset };
  }

  // get a single product by id
  static async getProductById(id: string): Promise<IProductDocument | null> {
    return Product.findById(id).exec();
  }

  // update a product, optionally replacing the image
  static async updateProduct(
    id: string,
    updates: Partial<Omit<IProduct, 'imageUrl'>>,
    imageBuffer?: Buffer
  ): Promise<IProductDocument | null> {
    const updateData: Record<string, unknown> = { ...updates };

    if (imageBuffer) {
      updateData.imageUrl = await this.uploadImage(imageBuffer);
    }

    return Product.findByIdAndUpdate(id, updateData, { returnDocument: 'after', runValidators: true }).exec();
  }

  // delete a product by id
  static async deleteProduct(id: string): Promise<IProductDocument | null> {
    const deletedProduct = await Product.findByIdAndDelete(id).exec();
    if (deletedProduct) {
      // Cascading clean up: remove references from all user carts
      await Cart.updateMany({}, { $pull: { items: { productId: id } } });
    }
    return deletedProduct;
  }
}
