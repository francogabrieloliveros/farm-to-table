import api from "@/lib/api";
import { type Product } from "@/types/Product";

export type CartItem = {
  productId: Product;
  quantity: number;
};

export type CartData = {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
};

export type CartApiResponse = {
  success: boolean;
  message?: string;
  data: CartData;
};

export const cartService = {
  // fetch the current user's cart (populated with product details)
  getCart: async (): Promise<CartApiResponse> => {
    const { data } = await api.get("/api/cart");
    return data;
  },

  // add a product to cart (or increase qty)
  addItem: async (
    productId: string,
    quantity: number = 1,
  ): Promise<CartApiResponse> => {
    const { data } = await api.post("/api/cart/items", {
      productId,
      quantity,
    });
    return data;
  },

  // set the absolute quantity for a cart item
  updateItemQuantity: async (
    productId: string,
    quantity: number,
  ): Promise<CartApiResponse> => {
    const { data } = await api.patch(`/api/cart/items/${productId}`, {
      quantity,
    });
    return data;
  },

  // remove a product from cart entirely
  removeItem: async (productId: string): Promise<CartApiResponse> => {
    const { data } = await api.delete(`/api/cart/items/${productId}`);
    return data;
  },

  // clear all items from cart (post-checkout)
  clearCart: async (): Promise<CartApiResponse> => {
    const { data } = await api.delete("/api/cart");
    return data;
  },
};
