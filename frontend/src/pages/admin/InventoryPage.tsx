import { Search, Plus, Package as PackageIcon } from "lucide-react";
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
  const [total, setTotal] = useState(0);

  useEffect(() => {
    productService
      .getProducts({ sortBy: "price_asc", productType: null, offset, limit: 10 })
      .then((res) => {
        setProducts(searchInventory(search, res.data));
        setTotal(res.total);
      });
  }, [showModal, dummy, search, offset]);

  return (
    <>
      {showModal ? (
        <ProductModal onClose={() => setShowModal(false)} item={modalItem} />
      )}
      
      <div className="p-6 md:p-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#1C4419] tracking-tight manrope">Inventory Management</h1>
            <p className="text-sm text-[#6B7280] font-medium">Track and manage your product stock levels.</p>
          </div>
          
          <button
            onClick={() => {
              setModalItem(null);
              setShowModal(true);
            }}
            className="flex items-center justify-center gap-2 bg-[#1C4419] text-white text-sm font-bold px-6 py-3 rounded-xl shadow-lg shadow-[#1C4419]/20 hover:scale-[1.02] transition-all"
          >
            <Plus size={18} />
            Add New Product
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-md group">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#1C4419] transition-colors"
            />
            <input
              type="text"
              placeholder="Search by product name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-sm bg-white border border-[#E8E7E4] rounded-2xl outline-none focus:border-[#1C4419] focus:ring-4 focus:ring-[#1C4419]/5 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#E8E7E4] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-[#9CA3AF] font-black border-b border-[#F4F3F1] bg-[#FCFBF9]">
                  <th className="text-left px-8 py-5">Product</th>
                  <th className="text-left px-4 py-5">Category</th>
                  <th className="text-left px-4 py-5">Price</th>
                  <th className="text-left px-4 py-5">Stock Level</th>
                  <th className="text-right px-8 py-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F3F1]">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-gray-400">
                        <PackageIcon size={40} className="opacity-20" />
                        <p className="font-medium">No products found in inventory.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((item, idx) => (
                    <InventoryProduct
                      item={item}
                      key={idx}
                      setDummy={setDummy}
                      setModalItem={setModalItem}
                      setShowModal={setShowModal}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-8 py-4 bg-[#FCFBF9] border-t border-[#F4F3F1] flex items-center justify-between">
            <p className="text-xs font-bold text-[#6B7280]">
              Showing <span className="text-[#1C4419]">{offset + 1}</span> to <span className="text-[#1C4419]">{Math.min(offset + products.length, total)}</span> of <span className="text-[#1C4419]">{total}</span> items
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={offset === 0}
                onClick={() => setOffset(Math.max(0, offset - 10))}
                className="p-2 rounded-lg border border-[#E8E7E4] bg-white text-[#1C4419] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F4F3F1] transition-colors"
              >
                <Plus size={16} className="rotate-45" /> {/* Using rotate-45 as a crude arrow */}
              </button>
              <button
                disabled={offset + 10 >= total}
                onClick={() => setOffset(offset + 10)}
                className="p-2 rounded-lg border border-[#E8E7E4] bg-white text-[#1C4419] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F4F3F1] transition-colors"
              >
                <Plus size={16} /> {/* Using rotate-0 as a crude arrow */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InventoryPage;
