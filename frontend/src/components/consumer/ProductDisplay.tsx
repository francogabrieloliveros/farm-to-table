import { Egg, Leaf, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { type Product } from "@/types/Product";
import useCart from "@/hooks/useCart";

const ProductDisplay = ({ product }: { product: Product }) => {
  const { addItem, setShowCart } = useCart();

  return (
    <div className="sm:max-w-[373px] mb-10 sm:mb-0">
      <div className="relative h-[466px] mb-5">
        <div className="absolute bg-[#D2E6C9] inter px-3 py-1 font-semibold text-xs text-[#55684F] rounded-xl top-4 left-4 flex gap-1">
          {product.type === 1 ? <Leaf size={15} /> : <Egg size={15} />}
          {product.type === 1 ? "CROP" : "POULTRY"}
        </div>
        <img
          src={product.imageUrl}
          className="w-full h-full object-cover sm:rounded-xl"
        />
      </div>

      <div className="flex flex-col px-2 gap-5">
        <div className="flex justify-between">
          <h4 className="manrope text-2xl font-bold text-[#1C4419] line-clamp-1">
            {product.name}
          </h4>
          <h4 className="inter text-2xl text-[#1A1C1A]">
            &#8369;{`${product.price}`}
          </h4>
        </div>

        <p className="inter text-[#42493E] text-sm">
          QTY {product.quantity}
        </p>
        <p className="inter text-[#42493E] text-sm line-clamp-2">
          {product.description}
        </p>
        <Button
          className="bg-[#7E2700] rounded-sm inter text-white flex py-6 justify-center gap-3 mt-3 cursor-pointer"
          onClick={() => {
            addItem(product);
            setShowCart(true);
          }}
        >
          <ShoppingCart />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDisplay;
