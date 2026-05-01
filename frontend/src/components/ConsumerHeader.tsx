import { ShoppingCart, CircleUserRound, X } from "lucide-react";
import { Link } from "react-router";
import useCart from "@/hooks/useCart";

const ConsumerHeader = () => {
  const { cartItems, showCart, setShowCart } = useCart();

  const cartItemsDisplay = cartItems.map((item) => <>{item}</>);

  return (
    <>
      <header className="h-12 sm:h-18 bg-white shadow-lg flex justify-between items-center px-4 sm:px-7 fixed w-dvw z-10">
        <Link to={"/"}>
          <h2 className="text-[#1C4419] font-extrabold text-2xl manrope">
            Farm-to-table
          </h2>
        </Link>
        <div className="flex gap-6">
          <ShoppingCart
            color="#1C4419"
            onClick={() => setShowCart(!showCart)}
          />
          <Link to={"/profile"}>
            <CircleUserRound color="#1C4419" />
          </Link>
        </div>
      </header>

      <div
        className={`inset-0 z-20 fixed transition-all ${showCart ? "bg-black/50 pointer-events-auto backdrop-blur-[2px]" : "bg-black/0 pointer-events-none backdrop-blur-none"}`}
      >
        <aside
          className={`w-full sm:w-100 bg-white h-dvh transition-all absolute right-0 ${showCart ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-between items-center sm:p-5 p-3 border-b">
            <h3 className="text-[#1C4419] font-extrabold text-2xl manrope">
              Your Basket
            </h3>
            <X onClick={() => setShowCart(false)} />
          </div>
          <div className="overflow-y-scroll">{cartItemsDisplay}</div>
        </aside>
      </div>
    </>
  );
};

export default ConsumerHeader;
