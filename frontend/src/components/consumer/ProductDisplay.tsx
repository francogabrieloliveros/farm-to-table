import { Egg, Leaf, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { type Product } from "@/types/Product";
import useCart from "@/hooks/useCart";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductDisplay = ({ product }: { product: Product }) => {
  const { addItem, setShowCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="group bg-card rounded-3xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden max-w-[373px] mx-auto w-full">
      <div className="relative h-64 overflow-hidden bg-muted">
        <div className="absolute bg-background/90 backdrop-blur-md inter px-3 py-1.5 font-bold text-[11px] text-foreground rounded-full top-4 left-4 flex items-center gap-1.5 shadow-sm z-10 tracking-wider">
          {product.type === 1 ? <Leaf size={14} className="text-primary" /> : <Egg size={14} className="text-primary" />}
          {product.type === 1 ? "CROP" : "POULTRY"}
        </div>
        <img
          src={product.imageUrl}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col p-6 flex-1 justify-between gap-4">
        <div>
          <div className="flex justify-between items-start gap-3 mb-2">
            <h4 className="manrope text-xl font-bold text-foreground line-clamp-1">
              {product.name}
            </h4>
            <h4 className="inter text-xl font-black text-primary shrink-0">
              &#8369;{product.price}
            </h4>
          </div>

          <p className="inter text-primary text-xs font-bold mb-3 uppercase tracking-wider bg-primary/10 inline-block px-2 py-0.5 rounded-md">
            Stock: {product.quantity}
          </p>
          <p className="inter text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl inter font-semibold flex py-6 justify-center gap-2 transition-all shadow-md hover:shadow-lg mt-auto"
          onClick={() => {
            if (!isAuthenticated) {
              toast.error("Please log in to add items to your cart.");
              navigate("/login");
              return;
            }
            addItem(product);
            setShowCart(true);
          }}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDisplay;
