export const OrderStatus = {
  Pending: 0,
  Completed: 1,
  Cancelled: 2,
} as const;

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface OrderItem {
  productId: {
    _id: string;
    name: string;
    imageUrl: string;
  };
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatusType;
  dateOrdered: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  success: boolean;
  data: Order[];
}

export interface CancelOrderResponse {
  success: boolean;
  message: string;
  data: Order;
}