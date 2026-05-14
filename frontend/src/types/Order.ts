const OrderStatus = {
  Pending: 0,
  Completed: 1,
  Cancelled: 2,
} as const;

type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

type Order = {
  _id: string;
  productId: string;
  quantity: number;
  status: OrderStatus;
  userEmail: string;
  dateOrdered: string;
  createdAt?: string;
  updatedAt?: string;
};

type fixedOrder = Order & {
  productName: string;
  productPrice: number;
};

type OrderResponse = {
  success: boolean;
  message: string;
  data: Order | Order[];
};

type OrdersResponse = {
  success: boolean;
  data: Order[];
};

type CancelOrderResponse = {
  success: boolean;
  message: string;
  data: Order;
};

export {
  type OrderResponse,
  type Order,
  type OrdersResponse,
  type CancelOrderResponse,
  OrderStatus,
  type fixedOrder,
};
;