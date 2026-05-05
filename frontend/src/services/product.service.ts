import { type Product } from "@/types/Product";
import axios from "axios";

export const productService = {
  getProducts: async ({
    sortBy,
    productType,
    limit = 10,
    offset = 0,
  }: {
    sortBy: "price_asc" | "price_desc" | "name" | "quantity" | null;
    productType: "1" | "2" | null;
    limit?: number;
    offset?: number;
  }): Promise<{ data: Product[]; total: number }> => {
    // Map your frontend sortBy values to backend's sortBy + sortOrder params
    let sortField = "name";
    let sortOrder = "asc";
    if (sortBy === "price_asc") {
      sortField = "price";
      sortOrder = "asc";
    } else if (sortBy === "price_desc") {
      sortField = "price";
      sortOrder = "desc";
    } else if (sortBy === "name") {
      sortField = "name";
      sortOrder = "asc";
    } else if (sortBy === "quantity") {
      sortField = "quantity";
      sortOrder = "asc";
    }

    const params: Record<string, string | number> = {
      limit,
      offset,
      sortBy: sortField,
      sortOrder,
    };

    if (productType !== null) params.type = productType;

    const response = await axios.get("/api/products", { params });
    return response.data;
  },

  addProduct: async (
    newProduct: Omit<Product, "id">,
    image: File,
  ): Promise<Product> => {
    const formattedProduct: Product = {
      name: "",
      description: "",
      type: null,
      quantity: null,
      price: null,
      imageUrl: "",
    };
    formattedProduct.name = newProduct.name;
    formattedProduct.description = newProduct.description;
    formattedProduct.type = Number(newProduct.type) as 1 | 2;
    formattedProduct.quantity = Number(newProduct.quantity);
    formattedProduct.price = Number(newProduct.name);

    const response = await axios.post("/api/products", formattedProduct);
    return response.data.data;
  },
};
