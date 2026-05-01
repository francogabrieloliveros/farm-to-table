import { type Order } from "@/types/Order";

const DUMMY_ORDERS: Order[] = [
  {
    transactionId: "TXN-001",
    productId: "PROD-001",
    orderQuantity: 10,
    orderStatus: 1,
    email: "juan.delacruz@email.com",
    dateOrdered: new Date("2025-04-01"),
    time: "09:32:00",
  },
  {
    transactionId: "TXN-002",
    productId: "PROD-005",
    orderQuantity: 3,
    orderStatus: 0,
    email: "maria.santos@email.com",
    dateOrdered: new Date("2025-04-15"),
    time: "14:20:00",
  },
  {
    transactionId: "TXN-003",
    productId: "PROD-009",
    orderQuantity: 20,
    orderStatus: 2,
    email: "pedro.reyes@email.com",
    dateOrdered: new Date("2025-04-18"),
    time: "11:05:00",
  },
  {
    transactionId: "TXN-004",
    productId: "PROD-010",
    orderQuantity: 50,
    orderStatus: 1,
    email: "ana.lim@email.com",
    dateOrdered: new Date("2025-04-22"),
    time: "08:47:00",
  },
  {
    transactionId: "TXN-005",
    productId: "PROD-003",
    orderQuantity: 15,
    orderStatus: 0,
    email: "jose.cruz@email.com",
    dateOrdered: new Date("2025-04-28"),
    time: "16:55:00",
  },
];

export const orderService = {
  getOrders: async ({
    orderStatus,
    email,
  }: {
    orderStatus: "0" | "1" | "2" | string | null;
    email: string | null;
  }): Promise<Order[]> => {
    let orders = [...DUMMY_ORDERS];

    if (orderStatus !== null) {
      orders = orders.filter((o) => o.orderStatus.toString() === orderStatus);
    }

    if (email !== null) {
      orders = orders.filter((o) => o.email === email);
    }

    return orders;
  },
};
