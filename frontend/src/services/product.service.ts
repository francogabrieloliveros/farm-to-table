import {
  type EditProductFormData,
  type AddProductFormData,
  type ProductResponse,
  type Product,
} from "@/types/Product";
import api from "@/lib/api";

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

    const {
      data: { data, total },
    } = await api.get("/api/products", { params });
    return { data, total: total ?? data.length };
  },

  addProduct: async (data: AddProductFormData): Promise<ProductResponse> => {
    const form = new FormData();
    form.append("name", data.name);
    form.append("description", data.description);
    form.append("type", String(data.type));
    form.append("quantity", String(data.quantity));
    form.append("price", String(data.price));
    form.append("image", data.image);

    const { data: res } = await api.post<ProductResponse>(
      "/api/products",
      form,
    );

    return res;
  },

  editProduct: async (
    data: EditProductFormData,
    id: string,
  ): Promise<ProductResponse> => {
    const form = new FormData();
    form.append("name", data.name);
    form.append("description", data.description);
    form.append("type", String(data.type));
    form.append("quantity", String(data.quantity));
    form.append("price", String(data.price));
    if (data.image) {
      form.append("image", data.image);
    }

    const { data: res } = await api.put<ProductResponse>(
      `/api/products/${id}`,
      form,
    );

    return res;
  },

  deleteProduct: async (id: string): Promise<ProductResponse> => {
    const { data: res } = await api.delete(`/api/products/${id}`);

    return res;
  },

  getProduct: async (id: string) => {
    const { data: res } = await api.get(`/api/products/${id}`);
    return res;
  },
};
