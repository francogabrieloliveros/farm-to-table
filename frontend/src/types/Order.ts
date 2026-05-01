export type Order = {
  transactionId: string;
  productId: string;
  orderQuantity: number;
  orderStatus: 0 | 1 | 2;
  email: string;
  dateOrdered: Date;
  time: string;
};
