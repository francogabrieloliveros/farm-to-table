import { createContext, useState, type ReactNode } from "react";
import { type Product } from "@/types/Product";

const CartContext = createContext<{
  cartItems: Product[];
  total: number;
  addItem: (newItem: Product) => void;
  showCart: boolean;
  setShowCart: (bool: boolean) => void;
} | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);

  const addItem = (newItem: Product) =>
    setCartItems((prev) => [...prev, newItem]);

  const total = cartItems.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, total, addItem, showCart, setShowCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
