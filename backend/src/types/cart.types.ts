import type { Document, Types } from 'mongoose';

// single line-item inside a cart
export interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
}

// plain Cart data shape (no Mongoose internals).
export interface ICart {
  userId: Types.ObjectId;
  items: ICartItem[];
}

// full Mongoose document type for the Cart collection
export interface ICartDocument extends ICart, Document {
  createdAt: Date;
  updatedAt: Date;
}

// standard API response envelope for cart operations
export interface CartResponse {
  success: boolean;
  message: string;
  data?: ICartDocument | null;
  error?: string;
}
