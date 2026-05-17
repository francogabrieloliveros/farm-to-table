import { createContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { type Product } from "@/types/Product";
import { cartService, type CartItem } from "@/services/cart.service";
import useAuth from "@/hooks/useAuth";

type CartItems = {
  [productId: string]: {
    product: Product;
    quantity: number;
  };
};

const CartContext = createContext<{
  cartItems: CartItems;
  total: number;
  cartCount: number;
  addItem: (newItem: Product) => void;
  subItem: (item: Product) => void;
  deleteItem: (item: Product) => void;
  changeItemQuantity: (item: Product, quantity: number) => void;
  clearCart: () => void;
  showCart: boolean;
  setShowCart: (bool: boolean) => void;
  isLoading: boolean;
} | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [showCart, setShowCart] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Access auth state to know when user logs in/out
  const { isAuthenticated } = useAuth();

  // Convert backend cart data to our local CartItems format
  const syncCartFromBackend = useCallback(async () => {
    if (!isAuthenticated) {
      setCartItems({});
      return;
    }

    try {
      setIsLoading(true);
      const response = await cartService.getCart();
      const backendItems: CartItems = {};

      response.data.items.forEach((item: CartItem) => {
        const product = item.productId as Product;
        if (product && product._id) {
          backendItems[product._id] = {
            product,
            quantity: item.quantity,
          };
        }
      });

      setCartItems(backendItems);
    } catch (error) {
      console.error("Failed to sync cart from backend:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch cart from backend when user authenticates
  useEffect(() => {
    syncCartFromBackend();
  }, [syncCartFromBackend]);

  const addItem = async (newItem: Product) => {
    const currentQuantity = cartItems[newItem._id]?.quantity ?? 0;
    if (currentQuantity >= newItem.quantity) return;

    // Optimistic update
    setCartItems((prev) => ({
      ...prev,
      [newItem._id]: {
        product: newItem,
        quantity: currentQuantity + 1,
      },
    }));

    try {
      await cartService.addItem(newItem._id, 1);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      // Revert on failure
      syncCartFromBackend();
    }
  };

  const subItem = async (item: Product) => {
    const currentQuantity = cartItems[item._id]?.quantity ?? 0;
    if (currentQuantity <= 0) return;

    if (currentQuantity - 1 <= 0) {
      // Remove item entirely
      setCartItems((prev) => {
        const updated = { ...prev };
        delete updated[item._id];
        return updated;
      });

      try {
        await cartService.removeItem(item._id);
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
        syncCartFromBackend();
      }
      return;
    }

    // Optimistic update
    setCartItems((prev) => ({
      ...prev,
      [item._id]: {
        product: item,
        quantity: currentQuantity - 1,
      },
    }));

    try {
      await cartService.updateItemQuantity(item._id, currentQuantity - 1);
    } catch (error) {
      console.error("Failed to update cart item:", error);
      syncCartFromBackend();
    }
  };

  const changeItemQuantity = async (item: Product, quantity: number) => {
    if (quantity <= 0) {
      // Remove item
      setCartItems((prev) => {
        const updated = { ...prev };
        delete updated[item._id];
        return updated;
      });

      try {
        await cartService.removeItem(item._id);
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
        syncCartFromBackend();
      }
      return;
    }

    const clampedQty = Math.min(quantity, item.quantity);

    // Optimistic update
    setCartItems((prev) => ({
      ...prev,
      [item._id]: { product: item, quantity: clampedQty },
    }));

    try {
      await cartService.updateItemQuantity(item._id, clampedQty);
    } catch (error) {
      console.error("Failed to update cart item quantity:", error);
      syncCartFromBackend();
    }
  };

  const deleteItem = async (item: Product) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[item._id];
      return updated;
    });

    try {
      await cartService.removeItem(item._id);
    } catch (error) {
      console.error("Failed to delete item from cart:", error);
      syncCartFromBackend();
    }
  };

  const clearCart = async () => {
    setCartItems({});

    try {
      await cartService.clearCart();
    } catch (error) {
      console.error("Failed to clear cart:", error);
      syncCartFromBackend();
    }
  };

  const total = Object.values(cartItems).reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0,
  );

  const cartCount = Object.values(cartItems).reduce(
    (acc, { quantity }) => acc + quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        cartCount,
        addItem,
        showCart,
        setShowCart,
        subItem,
        changeItemQuantity,
        deleteItem,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
