import {
  Search,
  SlidersHorizontal,
  Pencil,
  Trash2,
  Leaf,
  Egg,
} from "lucide-react";
import { useState, useEffect } from "react";
import { productService } from "@/services/product.service";

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService
      .getProducts({ sortBy: "price_asc", productType: null })
      .then((data) => setProducts(data));
  }, []);

  const productsDisplay = products.map((item) => (
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
  ));

  return (
    <div className="py-10 md:p-10 inter text-[#42493E]">
      <div className="flex items-start justify-between mb-8 flex-wrap gap-8 max-md:px-2">
        <h1 className="text-3xl font-extrabold text-[#1C4419] mb-1 manrope">
          Inventory
        </h1>
        <button className="flex items-center gap-2 bg-[#7E2700] text-white text-sm font-medium px-4 py-2 rounded-sm">
          + Add New Product
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6 max-md:px-2 flex-wrap">
        <div className="relative w-72">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#42493E]"
          />
          <input
            type="text"
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#42493E] rounded-sm bg-white text-[#42493E] placeholder-[#42493E] outline-none"
          />
        </div>
        <button className="flex items-center gap-2 border border-[#42493E] bg-white text-sm text-[#42493E] px-4 py-2 rounded-sm">
          <SlidersHorizontal size={15} />
          Filters
        </button>
      </div>

      <div className="bg-white md:rounded-sm">
        <div className="grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] md:grid p-5">
          <p className="font-semibold text-xs py-3 max-md:hidden">Item</p>
          <p className="font-semibold text-xs py-3 max-md:hidden">Name</p>
          <p className="font-semibold text-xs py-3 max-md:hidden">Category</p>
          <p className="font-semibold text-xs py-3 max-md:hidden">Price</p>
          <p className="font-semibold text-xs py-3 max-md:hidden">Stock</p>
          <p className="font-semibold text-xs py-3 max-md:hidden">Actions</p>
          {productsDisplay}
        </div>

        <div className="flex items-center justify-between px-6 py-3 border-t border-[#E2E1DF]">
          <p className="text-xs text-gray-400">{`Showing 1 to 3 of ${products.length} entries`}</p>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center rounded border border-[#E2E1DF] text-gray-400 text-sm">
              ‹
            </button>
            <button className="w-7 h-7 flex items-center justify-center rounded border border-[#E2E1DF] text-gray-400 text-sm">
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
