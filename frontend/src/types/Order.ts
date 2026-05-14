export type OrderStatus = 0 | 1 | 2;

export type Order = {
  _id: string;
  productId: string;
  quantity: number;
  status: OrderStatus;
  userEmail: string;
  dateOrdered: string;
  createdAt?: string;
  updatedAt?: string;
};

export type OrdersResponse = {
  success: boolean;
  data: Order[];
};

export type CancelOrderResponse = {
  success: boolean;
  message: string;
  data: Order;
};