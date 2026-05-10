import { z } from "zod";

const ProductType = {
  Crop: 1,
  Poultry: 2,
} as const;

const addProductSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(1, "Name cannot be empty")
    .max(100, "Name must be under 100 characters"),

  description: z
    .string({ error: "Description is required" })
    .min(1, "Description cannot be empty"),

  type: z
    .number({ error: "Product type is required" })
    .refine((v) => Object.values(ProductType).includes(v as 1 | 2), {
      message: "Type must be 0 (Crop) or 1 (Poultry)",
    }),

  quantity: z
    .number({ error: "Quantity is required" })
    .int("Quantity must be a whole number")
    .min(0, "Quantity cannot be negative"),

  price: z
    .number({ error: "Price is required" })
    .positive("Price must be greater than 0")
    .multipleOf(0.01, "Price cannot have more than 2 decimal places"),

  image: z
    .instanceof(File, { message: "Product image is required" })
    .refine((f) => f.size > 0, "Image file cannot be empty")
    .refine(
      (f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type),
      "Image must be a JPEG, PNG, or WebP file",
    )
    .refine((f) => f.size <= 5 * 1024 * 1024, "Image must be under 5 MB"),
});

const editProductSchema = addProductSchema.extend({
  image: addProductSchema.shape.image.nullable().optional(),
});

type AddProductFormData = z.infer<typeof addProductSchema>;
type EditProductFormData = z.infer<typeof editProductSchema>;

type ProductResponse = {
  success: boolean;
  message: string;
  data: Product | Product[];
};

type Product = {
  _id: string;
  name: string;
  description: string;
  type: number;
  quantity: number;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export {
  ProductType,
  addProductSchema,
  editProductSchema,
  type AddProductFormData,
  type EditProductFormData,
  type ProductResponse,
  type Product,
};
