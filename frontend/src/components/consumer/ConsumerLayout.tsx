import { CartProvider } from "@/context/CartContext";
import type { ReactElement } from "react";
import ConsumerHeader from "@/components/consumer/ConsumerHeader";

const ConsumerLayout = ({ children }: { children: ReactElement }) => {
  return (
    <CartProvider>
      <div className="inset-0 fixed bg-[#FAF9F6] -z-10"></div>
      <ConsumerHeader />
      <main className="pt-12 sm:pt-18">{children}</main>
    </CartProvider>
  );
};

export default ConsumerLayout;
