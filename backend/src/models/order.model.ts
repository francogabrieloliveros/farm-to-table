import mongoose, { Schema, Document } from 'mongoose';

// Enum for order status (matches project spec values)
export enum OrderStatus {
  Pending = 0,
  Completed = 1,
  Canceled = 2,
}

// Interface for items within an order
export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  priceAtPurchase: number; // Snapshot of price when ordered
}

// TypeScript interface for an Order document
export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
  dateOrdered: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema definition
const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        priceAtPurchase: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: Number,
      enum: [0, 1, 2],
      default: OrderStatus.Pending,
    },
    dateOrdered: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Export the Order model
export const Order = mongoose.model<IOrder>('Order', orderSchema);