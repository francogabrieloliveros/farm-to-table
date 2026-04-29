import mongoose, { Schema } from 'mongoose';

// Enum for order status (matches project spec values)
export enum OrderStatus {
  Pending = 0,
  Completed = 1,
  Canceled = 2,
}

// TypeScript interface for an Order document
export interface IOrder {
  productId: string;      
  quantity: number;       
  status: OrderStatus;    
  userEmail: string;      
  dateOrdered: Date;      
}

// Mongoose schema definition
const orderSchema = new Schema<IOrder>(
  {
    productId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // must order at least 1 item
    },
    status: {
      type: Number,
      enum: [0, 1, 2], // restricts values to OrderStatus enum
      default: OrderStatus.Pending, // new orders start as pending
    },
    userEmail: {
      type: String,
      required: true,
    },
    dateOrdered: {
      type: Date,
      default: Date.now, // auto-set when order is created
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Export the Order model for use in services/controllers
export const Order = mongoose.model<IOrder>('Order', orderSchema);