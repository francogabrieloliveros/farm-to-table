import { Search, ShoppingCart, CircleUserRound, X, Trash } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import useCart from "@/hooks/useCart";
import toast from "react-hot-toast";
import api from "@/lib/api";

const ConsumerHeader = () => {
  const {
    cartItems,
    showCart,
    setShowCart,
    addItem,
    subItem,
    changeItemQuantity,
    total,
    deleteItem,
    clearCart,
  } = useCart();

  const handleCheckout = async () => {
    const items = Object.values(cartItems);
    if (items.length === 0) return;

    const loadingToast = toast.loading("Placing your orders...");

    try {
      // The current backend supports one product per order, so we loop
      const promises = items.map((item) =>
        api.post("/api/orders", {
          productId: item.product._id,
          quantity: item.quantity,
        }),
      );

      await Promise.all(promises);

      toast.success("Orders placed successfully!", { id: loadingToast });
      clearCart();
      setShowCart(false);
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(
        error.response?.data?.message || "Failed to place orders. Please try again.",
        { id: loadingToast },
      );
    }
  };

  const cartItemsDisplay = Object.values(cartItems).map(
    ({ product, quantity }, ind) => (
      <div className="flex justify-between gap-5" key={ind}>
        <div className="h-24 w-24 shadow-lg">
          <img
            src={product.imageUrl}
            className="object-cover w-full h-full rounded-sm"
          />
        </div>
        <div className="flex flex-col flex-1 h-24 justify-between">
          <div className="flex justify-between items-start">
            <p className="manrope text-[#1C4419] font-semibold text-lg line-clamp-1">
              {product.name}
            </p>
            <Trash
              size={20}
              color="#42493E"
              className="cursor-pointer"
              onClick={() => deleteItem(product)}
            />
          </div>
          <p className="inter text-sm text-[#42493E]">
            QTY {quantity}
          </p>
          <div className="flex justify-between">
            <div className="bg-[#E8E7E4] flex w-24 justify-between rounded-xl px-4 inter items-center text-[#1A1C1A]">
              <p
                className="text-xl cursor-pointer select-none"
                onClick={() => subItem(product)}
              >
                -
              </p>
              <input
                className="text-center w-8 bg-transparent border-none outline-none"
                type="text"
                value={quantity}
                onChange={(e) =>
                  changeItemQuantity(product, Number(e.target.value))
                }
              />
              <p
                className="text-xl cursor-pointer select-none"
                onClick={() => addItem(product)}
              >
                +
              </p>
            </div>
            <p className="manrope text-[#1C4419] font-bold">
              &#8369;{product.price}
            </p>
          </div>
        </div>
      </div>
    ),
  );

  return (
    <>
      <header className="h-12 sm:h-18 bg-white shadow-lg flex justify-between items-center px-4 sm:px-7 fixed w-dvw z-10">
        <Link to={"/"}>
          <h2 className="text-[#1C4419] font-extrabold text-2xl manrope">
            Farm-to-table
          </h2>
        </Link>
        <div className="flex gap-6">
          <Search color="#1C4419" className="hover:cursor-pointer" />
          <ShoppingCart
            color="#1C4419"
            className="hover:cursor-pointer"
            onClick={() => setShowCart(!showCart)}
          />
          <Link to={"/profile"}>
            <CircleUserRound color="#1C4419" className="hover:cursor-pointer" />
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
            <X className="cursor-pointer" onClick={() => setShowCart(false)} />
          </div>
          {Object.values(cartItems).length > 0 ? (
            <>
              <div className="overflow-y-scroll h-[calc(100%-270px)] p-5 flex flex-col gap-5">
                {cartItemsDisplay}
              </div>
              <div className="bg-[#F4F3F1] h-[270px] p-8 flex flex-col">
                <div className="flex justify-between mb-12">
                  <h4 className="manrope text-[#1C4419] font-bold text-xl">
                    Total
                  </h4>
                  <h4 className="manrope text-[#1C4419] font-bold text-xl">
                    &#8369;{total}
                  </h4>
                </div>
                <Button 
                  className="w-full rounded-sm manrope font-bold text-lg py-7 bg-[#7E2706] cursor-pointer"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            </>
          ) : (
            <div className="h-full px-10 justify-center flex flex-col items-center gap-5">
              <p className="manrope text-[#1C4419] font-bold text-xl mb-5">
                Your basket is empty
              </p>
              <p className="inter text-sm text-[#42493E] text-center">
                Looks like you haven't added anything to your basket.
              </p>
              <Link to="/">
                <Button
                  className="w-full rounded-sm manrope font-bold text-lg py-7 px-20 bg-[#7E2706] cursor-pointer"
                  onClick={() => setShowCart(false)}
                >
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </aside>
      </div>
    </>
  );
};

export default ConsumerHeader;
