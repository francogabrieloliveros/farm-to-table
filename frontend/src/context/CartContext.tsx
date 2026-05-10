import { createContext, useState, type ReactNode } from "react";
import { type Product } from "@/types/Product";

type CartItems = {
  [productId: string]: {
    product: Product;
    quantity: number;
  };
};

const CartContext = createContext<{
  cartItems: CartItems;
  total: number;
  addItem: (newItem: Product) => void;
  subItem: (item: Product) => void;
  deleteItem: (item: Product) => void;
  changeItemQuantity: (item: Product, quantity: number) => void;
  clearCart: () => void;
  showCart: boolean;
  setShowCart: (bool: boolean) => void;
} | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [showCart, setShowCart] = useState<boolean>(false);

  const addItem = (newItem: Product) =>
    setCartItems((prev) => {
      const currentQuantity = prev[newItem._id]?.quantity ?? 0;
      if (currentQuantity >= newItem.quantity) return prev;
      return {
        ...prev,
        [newItem._id]: {
          product: newItem,
          quantity: currentQuantity + 1,
        },
      };
    });

  const subItem = (item: Product) =>
    setCartItems((prev) => {
      const currentQuantity = prev[item._id]?.quantity ?? 0;

      if (currentQuantity <= 0) return prev;

      if (currentQuantity - 1 <= 0) {
        const updated = { ...prev };
        delete updated[item._id];
        return updated;
      }
      return {
        ...prev,
        [item._id]: {
          product: item,
          quantity: currentQuantity - 1,
        },
      };
    });

  const changeItemQuantity = (item: Product, quantity: number) =>
    setCartItems((prev) => {
      if (quantity <= 0) {
        const updated = { ...prev };
        delete updated[item._id];
        return updated;
      }
      if (quantity > item.quantity) {
        return {
          ...prev,
          [item._id]: { product: item, quantity: item.quantity },
        };
      }

      return {
        ...prev,
        [item._id]: { product: item, quantity },
      };
    });

  const deleteItem = (item: Product) =>
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[item._id];
      return updated;
    });

  const clearCart = () => setCartItems({});

  const total = Object.values(cartItems).reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        addItem,
        showCart,
        setShowCart,
        subItem,
        changeItemQuantity,
        deleteItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
