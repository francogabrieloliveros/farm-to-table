import api from "@/lib/api";
import { type CancelOrderResponse, type OrdersResponse } from "@/types/Order";

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

  // get all orders (Admin only)
  getOrders: async (): Promise<any[]> => {
    const { data } = await api.get("/api/orders");
    // Backend now returns populated data, so we just return the array
    return data.data;
  },

  confirmOrder: async (id: string) => {
    const { data: res } = await api.put(`/api/orders/${id}/confirm`);
    return res;
  },

  placeOrder: async (items: { productId: string; quantity: number }[]) => {
    // New bulk endpoint
    await api.post("/api/orders", { items });
  },
};
