import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { productService } from "@/services/product.service";
import { type Product } from "@/types/Product";
import ProductDisplay from "@/components/consumer/ProductDisplay";

const ConsumerHomePage = () => {
  const [sortBy, setSortBy] = useState<
    "price_asc" | "price_desc" | "name" | "quantity" | ""
  >("price_asc");
  const [productType, setProductType] = useState<"1" | "2" | "">("");
  const [search, setSearch] = useState("");
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
        search,
        limit: ITEMS_PER_PAGE,
        offset: page * ITEMS_PER_PAGE,
      })
      .then((res) => {
        setProducts(res.data);
        setTotal(res.total);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setError(
          err.response?.data?.message ||
            "An unexpected error occurred while fetching products.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sortBy, productType, search, page]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(0);
  }, [sortBy, productType, search]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const productsDisplay = products.map((product, ind) => (
    <ProductDisplay product={product} key={ind} />
  ));

  return (
    <div className="px-4 sm:px-8 py-8 md:py-12 max-w-[1600px] mx-auto min-h-[calc(100vh-80px)]">
      <div className="flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-end mb-12 bg-card p-8 rounded-3xl shadow-sm border border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="max-w-2xl">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-xs mb-4 inter tracking-wide uppercase">
            Marketplace Catalog
          </div>
          <h1 className="font-extrabold text-4xl md:text-5xl text-foreground manrope tracking-tight leading-tight">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">
              Farm-to-Table
            </span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground inter">
            Discover fresh, high-quality agricultural products directly from
            local farmers.
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 inter bg-background border border-border rounded-xl outline-none text-foreground font-medium shadow-sm hover:border-primary/50 transition-colors focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full pl-4 pr-10 py-3.5 inter bg-background border border-border rounded-xl outline-none text-foreground font-medium shadow-sm hover:border-primary/50 transition-colors focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
              >
                <option value="price_asc">Price (Ascending)</option>
                <option value="price_desc">Price (Descending)</option>
                <option value="name">Name (A–Z)</option>
                <option value="quantity">Quantity (Low–High)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="relative w-full sm:w-40">
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value as any)}
                className="w-full pl-4 pr-10 py-3.5 inter bg-background border border-border rounded-xl outline-none text-foreground font-medium shadow-sm hover:border-primary/50 transition-colors focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
              >
                <option value="">All Types</option>
                <option value="1">Crop</option>
                <option value="2">Poultry</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-[#1C4419] font-medium animate-pulse text-lg">
            Loading products...
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 bg-rose-50 rounded-3xl border-2 border-dashed border-rose-200">
          <p className="text-rose-700 font-bold text-xl manrope mb-2">
            Failed to load products
          </p>
          <p className="text-rose-600 text-sm inter">{error}</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid gap-5">
          {productsDisplay}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-primary/20">
          <p className="text-primary font-bold text-xl manrope mb-2">
            No products found
          </p>
          <p className="text-muted-foreground text-sm inter">
            Try adjusting your filters or check back later.
          </p>
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12 pb-8">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-5 py-2.5 text-sm rounded-xl bg-background border border-border text-foreground font-medium disabled:opacity-40 transition-colors hover:bg-muted shadow-sm"
          >
            Previous
          </button>
          <span className="inter text-sm text-muted-foreground font-medium px-4">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="px-5 py-2.5 text-sm rounded-xl bg-background border border-border text-foreground font-medium disabled:opacity-40 transition-colors hover:bg-muted shadow-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ConsumerHomePage;
