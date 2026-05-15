import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productService } from "@/services/product.service";
import { type Product } from "@/types/Product";
import ProductDisplay from "@/components/consumer/ProductDisplay";

const ConsumerHomePage = () => {
  const [sortBy, setSortBy] = useState<
    "price_asc" | "price_desc" | "name" | "quantity" | "0"
  >("0");
  const [productType, setProductType] = useState<"1" | "2" | "0">("0");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService
      .getProducts({
        sortBy: sortBy === "0" ? "price_asc" : sortBy,
        productType: productType === "0" ? null : productType,
      })
      .then((res) => setProducts(res.data));
  }, [sortBy, productType]);

  const productsDisplay = products.map((product, ind) => (
    <ProductDisplay product={product} key={ind} />
  ));

  return (
    <div className="sm:px-8 py-8">
      <div className="flex flex-wrap sm:flex-nowrap gap-10 px-2 items-end mb-10">
        <h1 className="font-bold text-5xl text-[#1C4419] manrope">
          Welcome to Farm-to-table E-Commerce Platform.
        </h1>

        <div className="flex md:flex-nowrap gap-2 justify-start flex-wrap">
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as any)}
          >
            <SelectTrigger className="w-50 inter border-none bg-[#e8e7e4] rounded-sm">
              <SelectValue placeholder="Price (Ascending)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Price (Ascending)</SelectItem>
              <SelectItem value="price_desc">Price (Descending)</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={productType}
            onValueChange={(value) => setProductType(value as any)}
          >
            <SelectTrigger className="w-50 inter border-none bg-[#e8e7e4] rounded-sm">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">All Types</SelectItem>
              <SelectItem value="1">Crop</SelectItem>
              <SelectItem value="2">Poultry</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid gap-5">
        {productsDisplay}
      </div>
    </div>
  );
};

export default ConsumerHomePage;
