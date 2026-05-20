import { ShoppingCart, User, X, Trash, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useCart from "@/hooks/useCart";
import useAuth from "@/hooks/useAuth";
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
    cartCount,
    deleteItem,
    clearCart,
  } = useCart();

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const items = Object.values(cartItems);
    if (items.length === 0) return;

    const loadingToast = toast.loading("Placing your orders...");

    try {
      await api.post("/api/orders", {
        items: items.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
      });

      toast.success("Orders placed successfully!", { id: loadingToast });
      clearCart();
      setShowCart(false);
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to place orders. Please try again.",
        { id: loadingToast },
      );
    }
  };

  const cartItemsDisplay = Object.values(cartItems).map(
    ({ product, quantity }, ind) => (
      <div
        className="flex justify-between gap-4 p-4 bg-background border border-border/50 rounded-2xl shadow-sm group hover:border-primary/30 transition-all"
        key={ind}
      >
        <div className="h-20 w-20 shrink-0 rounded-xl overflow-hidden shadow-sm">
          <img
            src={product.imageUrl}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col flex-1 justify-between py-1">
          <div className="flex justify-between items-start gap-2">
            <p className="manrope text-foreground font-bold text-sm line-clamp-2 leading-tight">
              {product.name}
            </p>
            <button
              onClick={() => deleteItem(product)}
              className="text-muted-foreground hover:text-destructive transition-colors bg-muted/50 p-1.5 rounded-lg shrink-0"
            >
              <Trash size={16} />
            </button>
          </div>

          <div className="flex justify-between items-end mt-2">
            <div className="bg-muted flex justify-between rounded-lg px-2 py-1 inter items-center text-foreground border border-border/50">
              <button
                className="w-6 h-6 flex items-center justify-center text-lg cursor-pointer hover:bg-background rounded-md transition-colors font-medium"
                onClick={() => subItem(product)}
              >
                -
              </button>
              <input
                className="text-center w-8 bg-transparent border-none outline-none text-sm font-semibold"
                type="text"
                value={quantity}
                onChange={(e) =>
                  changeItemQuantity(product, Number(e.target.value))
                }
              />
              <button
                className="w-6 h-6 flex items-center justify-center text-lg cursor-pointer hover:bg-background rounded-md transition-colors font-medium"
                onClick={() => addItem(product)}
              >
                +
              </button>
            </div>
            <p className="inter text-primary font-bold">
              &#8369;{product.price}
            </p>
          </div>
        </div>
      </div>
    ),
  );

  return (
    <>
      <header className="h-16 sm:h-20 bg-background/80 backdrop-blur-md border-b border-border shadow-sm flex justify-between items-center px-6 sm:px-12 fixed w-full top-0 z-40">
        <Link to={"/shop"} className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl text-primary-foreground transition-transform group-hover:scale-105 shadow-sm">
            <Leaf size={20} />
          </div>
          <h2 className="text-foreground font-extrabold text-xl sm:text-2xl manrope tracking-tight group-hover:text-primary transition-colors">
            Farm-to-Table
          </h2>
        </Link>
        <div className="flex gap-4 sm:gap-6 items-center">
          <button
            className="relative p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => {
              if (!isAuthenticated) {
                toast.error("Please log in to view your cart.");
                navigate("/login");
                return;
              }
              setShowCart(!showCart);
            }}
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute 0 right-0 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-in zoom-in">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>
          <Link
            to={isAuthenticated ? "/profile" : "/login"}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <User size={22} />
          </Link>
        </div>
      </header>

      <div
        className={`inset-0 z-50 fixed transition-all duration-300 ${showCart ? "bg-black/40 pointer-events-auto backdrop-blur-sm" : "bg-black/0 pointer-events-none backdrop-blur-none"}`}
        onClick={() => setShowCart(false)}
      >
        <aside
          className={`w-full sm:w-[420px] bg-card h-dvh transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) absolute right-0 shadow-2xl flex flex-col ${showCart ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center px-6 py-5 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2">
              <ShoppingCart className="text-primary" size={24} />
              <h3 className="text-foreground font-extrabold text-2xl manrope tracking-tight">
                Your Basket
              </h3>
            </div>
            <button
              className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
              onClick={() => setShowCart(false)}
            >
              <X size={20} />
            </button>
          </div>

          {Object.values(cartItems).length > 0 ? (
            <>
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-muted/10">
                {cartItemsDisplay}
              </div>
              <div className="border-t border-border bg-card p-6 flex flex-col gap-4 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="inter text-muted-foreground font-semibold">
                    Subtotal
                  </h4>
                  <h4 className="manrope text-foreground font-black text-2xl">
                    &#8369;{total.toFixed(2)}
                  </h4>
                </div>
                <div className="bg-primary/10 rounded-xl p-3 border border-primary/20 flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                    <span className="font-bold text-xs">COD</span>
                  </div>
                  <p className="inter text-sm text-primary font-medium">
                    Cash on Delivery active
                  </p>
                </div>
                <Button
                  className="w-full rounded-xl manrope font-bold text-lg py-7 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all mt-2"
                  onClick={handleCheckout}
                >
                  Place Order
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 px-8 justify-center flex flex-col items-center gap-4 text-center">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-4">
                <ShoppingCart size={40} />
              </div>
              <p className="manrope text-foreground font-bold text-2xl">
                Your basket is empty
              </p>
              <p className="inter text-base text-muted-foreground max-w-[250px]">
                Looks like you haven't added any fresh produce to your basket
                yet.
              </p>
              <Link to="/shop" className="mt-8 w-full">
                <Button
                  className="w-full rounded-xl manrope font-bold text-lg py-6 bg-primary hover:bg-primary/90 transition-all shadow-md"
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
