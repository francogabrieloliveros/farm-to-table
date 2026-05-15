import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { productService } from "@/services/product.service";
import InventoryProduct from "@/components/admin/InventoryProduct";
import ProductModal from "@/components/admin/ProductModal";
import { searchInventory } from "@/utils/searchInventory";
import { type Product } from "@/types/Product";

function InventoryPage() {
  const [dummy, setDummy] = useState(true);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState<Product | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    productService
      .getProducts({ sortBy: "price_asc", productType: null, offset })
      .then((data) => setProducts(searchInventory(search, data.data)));
  }, [showModal, dummy, search, offset]);

  const productsDisplay = products.map((item, ind) => (
    <InventoryProduct
      item={item}
      key={ind}
      setDummy={setDummy}
      setModalItem={setModalItem}
      setShowModal={setShowModal}
    />
  ));

  console.log(offset);

  return (
    <>
      {showModal && modalItem ? (
        <ProductModal onClose={() => setShowModal(false)} item={modalItem} />
      ) : undefined}
      <div className="py-10 md:p-10 inter text-[#42493E]">
        <div className="flex items-start justify-between mb-8 flex-wrap gap-8 max-md:px-2">
          <h1 className="text-3xl font-extrabold text-[#1C4419] mb-1 manrope">
            Inventory
          </h1>
          <button
            className="flex items-center gap-2 bg-[#7E2700] text-white text-sm font-medium px-4 py-2 rounded-sm"
            onClick={() => {
              setModalItem(null);
              setShowModal(true);
            }}
          >
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
            <p className="text-xs text-gray-400">{`Showing products ${offset + 1} to ${offset + products.length}`}</p>
            <div className="flex items-center gap-1">
              <button
                className="w-7 h-7 flex items-center justify-center rounded border border-[#E2E1DF] text-gray-400 text-sm"
                onClick={() =>
                  setOffset((prev) => (prev === 0 ? prev : prev - 10))
                }
              >
                ‹
              </button>
              <button
                className="w-7 h-7 flex items-center justify-center rounded border border-[#E2E1DF] text-gray-400 text-sm"
                onClick={() =>
                  setOffset((prev) => (products.length < 10 ? prev : prev + 10))
                }
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InventoryPage;
