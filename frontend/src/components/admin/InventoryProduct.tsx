import type { Product } from "@/types/Product";
import { Pencil, Trash2, Leaf, Egg } from "lucide-react";

const InventoryProduct = ({ item }: { item: Product }) => (
  <>
    <div className="border-t flex items-center max-md:pt-5">
      <div className="md:w-8 md:h-8 w-full aspect-square">
        <img
          src={item.image}
          className="w-full h-full object-cover rounded-sm"
        />
      </div>
    </div>
    <p className="font-semibold py-3 md:border-t text-[#1C4419]">
      {item.productName}
    </p>
    <div className="md:border-t flex items-center">
      <div className="bg-[#D2E6C9] px-3 py-1 h-6 w-20 font-semibold text-[0.6rem] text-[#55684F] rounded-xl flex gap-1 items-center justify-center">
        {item.productType === 1 ? <Leaf size={10} /> : <Egg size={10} />}
        {item.productType === 1 ? "CROP" : "POULTRY"}
      </div>
    </div>
    <div className="flex items-center md:border-t">
      <p className="font-semibold text-sm py-3">&#8369;{item.price}</p>
    </div>
    <div className="flex items-center gap-1 md:border-t">
      <div className="w-2 h-2 bg-[#1C4419] rounded-2xl"></div>
      <p className="font-semibold text-xs py-3">{item.productQuantity}</p>
    </div>
    <div className="flex items-center gap-3 md:border-t max-md:pb-5">
      <button className="text-[#42493E]">
        <Pencil size={16} />
      </button>
      <button className="text-[#42493E]">
        <Trash2 size={16} />
      </button>
    </div>
  </>
);

export default InventoryProduct;
