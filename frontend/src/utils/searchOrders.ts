import type { Order } from "@/types/Order";

function searchOrders(query: string, orders: Order[]): Order[] {
  if (!query) return orders;
  
  const formatQ = query.toLowerCase();
  
  return orders.filter((order) => {
    const customerMatch = 
      order.userId.email.toLowerCase().includes(formatQ) ||
      order.userId.firstName.toLowerCase().includes(formatQ) ||
      order.userId.lastName.toLowerCase().includes(formatQ);
      
    const productMatch = order.items.some(item => 
      item.productId.name.toLowerCase().includes(formatQ)
    );
    
    const statusStr = order.status === 0 ? "pending" : order.status === 1 ? "completed" : "cancelled";
    
    return (
      customerMatch ||
      productMatch ||
      order._id.toLowerCase().includes(formatQ) ||
      statusStr.includes(formatQ)
    );
  });
}

export { searchOrders };