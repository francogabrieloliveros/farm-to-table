import { z } from "zod";

const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productType: z.enum(["1", "2"], { message: "Please select a category" }),
  productDescription: z.string().min(1, "Description is required"),
  productQuantity: z
    .number({ error: "Stock is required" })
    .int()
    .min(1, "Stock must be at least 1"),
  price: z
    .number({ error: "Price is required" })
    .min(0.01, "Price must be greater than 0"),
  image: z
    .instanceof(File, { message: "Product image is required" })
    .refine((f) => f.size <= 10 * 1024 * 1024, "Image must be under 10MB")
    .refine(
      (f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type),
      "Only JPG, PNG, and WEBP are allowed",
    ),
});

type ProductForm = z.infer<typeof productSchema>;

type Product = {
  name: string;
  description: string;
  type: 1 | 2; // 1 = Crop, 2 = Poultry
  quantity: number;
  price: number;
  imageUrl: string;
};

export { productSchema, type ProductForm, type Product };
