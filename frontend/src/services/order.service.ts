import api from "@/lib/api";
import { type CancelOrderResponse, type OrdersResponse } from "@/types/Order";
import { type Order, type fixedOrder } from "@/types/Order";
import { userService } from "./user.service";
import { productService } from "./product.service";

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

  getOrders: async (): Promise<fixedOrder[]> => {
    const {
      data: { data: res },
    } = await api.get("/api/orders");

    const fixedOrders = await Promise.all(
      res.map(async (order: Order) => {
        const { data: product } = await productService.getProduct(
          order.productId,
        );

        const { data: user } = await userService.getUser(order.userEmail);

        return {
          ...order,
          productName: product.name,
          productPrice: product.price,
          userEmail: user.email,
        };
      }),
    );

    return fixedOrders;
  },

  confirmOrder: async (id: string) => {
    const { data: res } = await api.put(`/api/orders/${id}/confirm`);
    return res;
  },

  placeOrder: async (items: { productId: string; quantity: number }[]) => {
    // The current backend supports one product per order, so we loop
    const promises = items.map((item) =>
      api.post("/api/orders", {
        productId: item.productId,
        quantity: item.quantity,
      }),
    );

    await Promise.all(promises);
  },
};
