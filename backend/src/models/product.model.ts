import mongoose, { Schema } from 'mongoose';
import { type IProductDocument, ProductType } from '../types/product.types.js';

const productSchema = new Schema<IProductDocument>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    type: {
      type: Number,
      required: [true, 'Product type is required'],
      enum: [ProductType.Crop, ProductType.Poultry],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Product image URL is required'],
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model<IProductDocument>('Product', productSchema);
