import api from "@/lib/api";
import {
  type CancelOrderResponse,
  type OrdersResponse,
} from "@/types/Order";

export const orderService = {
  // get orders for the currently logged-in customer
  getMyOrders: async (): Promise<OrdersResponse> => {
    const { data } = await api.get("/api/orders/my");
    return data;
  },

  // cancel a pending order
  cancelOrder: async (orderId: string): Promise<CancelOrderResponse> => {
    const { data } = await api.put(`/api/orders/${orderId}/cancel`);
    return data;
  },
};
