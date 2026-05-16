import { useState, useEffect } from "react";
import { productService } from "@/services/product.service";
import { type Product } from "@/types/Product";
import ProductDisplay from "@/components/consumer/ProductDisplay";

const ConsumerHomePage = () => {
  const [sortBy, setSortBy] = useState<
    "price_asc" | "price_desc" | "name" | "quantity" | ""
  >("price_asc");
  const [productType, setProductType] = useState<"1" | "2" | "">("");
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    setLoading(true);
    setError(null);
    productService
      .getProducts({
        sortBy: sortBy === "" ? null : (sortBy as any),
        productType: productType === "" ? null : (productType as any),
        limit: ITEMS_PER_PAGE,
        offset: page * ITEMS_PER_PAGE,
      })
      .then((res) => {
        setProducts(res.data);
        setTotal(res.total);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setError(err.response?.data?.message || "An unexpected error occurred while fetching products.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sortBy, productType, page]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(0);
  }, [sortBy, productType]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const productsDisplay = products.map((product, ind) => (
    <ProductDisplay product={product} key={ind} />
  ));

  return (
    <div className="sm:px-8 py-8">
      <div className="flex flex-wrap sm:flex-nowrap gap-10 px-2 items-end mb-10">
        <h1 className="font-bold text-5xl text-[#1C4419] manrope">
          Welcome to Farm-to-table E-Commerce Platform.
        </h1>

        <div className="flex md:flex-nowrap gap-4 justify-start flex-wrap">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-50 px-4 py-2 inter bg-[#e8e7e4] rounded-lg border-none outline-none text-[#1C4419] font-medium"
          >
            <option value="price_asc">Price (Ascending)</option>
            <option value="price_desc">Price (Descending)</option>
            <option value="name">Name (A–Z)</option>
            <option value="quantity">Quantity (Low–High)</option>
          </select>

          <select 
            value={productType}
            onChange={(e) => setProductType(e.target.value as any)}
            className="w-50 px-4 py-2 inter bg-[#e8e7e4] rounded-lg border-none outline-none text-[#1C4419] font-medium"
          >
            <option value="">All Types</option>
            <option value="1">Crop</option>
            <option value="2">Poultry</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-[#1C4419] font-medium animate-pulse text-lg">Loading products...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 bg-rose-50 rounded-3xl border-2 border-dashed border-rose-200">
          <p className="text-rose-700 font-bold text-xl manrope mb-2">Failed to load products</p>
          <p className="text-rose-600 text-sm inter">{error}</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid gap-5">
          {productsDisplay}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-[#e8e7e4]/30 rounded-3xl border-2 border-dashed border-[#1C4419]/10">
          <p className="text-[#1C4419] font-bold text-xl manrope mb-2">No products found</p>
          <p className="text-[#42493E] text-sm inter">Try adjusting your filters or check back later.</p>
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-4 py-2 text-sm rounded-sm bg-[#e8e7e4] text-[#1C4419] font-medium disabled:opacity-40 transition-colors hover:bg-[#d4d3d0]"
          >
            Previous
          </button>
          <span className="inter text-sm text-[#42493E]">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 text-sm rounded-sm bg-[#e8e7e4] text-[#1C4419] font-medium disabled:opacity-40 transition-colors hover:bg-[#d4d3d0]"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsumerHomePage;
