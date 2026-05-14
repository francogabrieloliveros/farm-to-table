import type { fixedOrder } from "@/types/Order";

function searchOrders(query: string, orders: fixedOrder[]): fixedOrder[] {
  return orders.filter((order) => {
    const formatQ = query.toLowerCase();
    return (
      order.productName.toLowerCase().includes(formatQ) ||
      order.productPrice.toString().includes(formatQ) ||
      order.quantity.toString().includes(formatQ) ||
      order.userEmail.toLowerCase().includes(formatQ) ||
      order.dateOrdered.toLowerCase().includes(formatQ) ||
      `${order.status === 0 ? "pending" : order.status === 1 ? "completed" : "cancelled"}`.includes(
        formatQ,
      )
    );
  });
}

export { searchOrders };