import { type Product } from "@/types/Product";

const DUMMY_PRODUCTS: Product[] = [
  {
    productId: "PROD-001",
    productName: "White Rice",
    productDescription:
      "Premium quality white rice, freshly harvested from local farms.",
    productType: 1,
    productQuantity: 500,
    price: 52.0,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
  },
  {
    productId: "PROD-002",
    productName: "Yellow Corn",
    productDescription:
      "Dried yellow corn kernels, ideal for animal feed and food processing.",
    productType: 1,
    productQuantity: 300,
    price: 28.5,
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400",
  },
  {
    productId: "PROD-003",
    productName: "Pechay",
    productDescription:
      "Fresh pechay (bok choy), organically grown with no pesticides.",
    productType: 1,
    productQuantity: 150,
    price: 15.0,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
  },
  {
    productId: "PROD-004",
    productName: "Kangkong",
    productDescription:
      "Freshly harvested water spinach, great for everyday Filipino dishes.",
    productType: 1,
    productQuantity: 200,
    price: 10.0,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",
  },
  {
    productId: "PROD-005",
    productName: "Broiler Chicken (Live)",
    productDescription:
      "Healthy live broiler chickens raised in free-range environment.",
    productType: 2,
    productQuantity: 80,
    price: 220.0,
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400",
  },
  {
    productId: "PROD-006",
    productName: "Native Eggs (Itlog na Pula)",
    productDescription: "Salted red eggs sourced from locally raised ducks.",
    productType: 2,
    productQuantity: 1000,
    price: 12.0,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400",
  },
  {
    productId: "PROD-007",
    productName: "Dressed Chicken",
    productDescription:
      "Freshly processed and cleaned whole chicken, ready for cooking.",
    productType: 2,
    productQuantity: 60,
    price: 185.0,
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400",
  },
  {
    productId: "PROD-008",
    productName: "Duck (Pato)",
    productDescription:
      "Live ducks raised in a free-range setting, healthy and well-fed.",
    productType: 2,
    productQuantity: 40,
    price: 350.0,
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400",
  },
  {
    productId: "PROD-009",
    productName: "Kamote (Sweet Potato)",
    productDescription:
      "Organically grown sweet potatoes, rich in vitamins and minerals.",
    productType: 1,
    productQuantity: 400,
    price: 35.0,
    image: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=400",
  },
  {
    productId: "PROD-010",
    productName: "Chicken Egg (Itlog ng Manok)",
    productDescription:
      "Farm-fresh chicken eggs, collected daily from healthy laying hens.",
    productType: 2,
    productQuantity: 2000,
    price: 8.0,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400",
  },
];

export const productService = {
  getProducts: async ({
    sortBy,
    productType,
  }: {
    sortBy: "price_asc" | "price_desc" | string | null;
    productType: "1" | "2" | string | null;
  }): Promise<Product[]> => {
    let products = [...DUMMY_PRODUCTS];

    // Filter by product type if provided
    if (productType !== null) {
      products = products.filter(
        (p) => p.productType.toString() === productType,
      );
    }

    // Sort by price if sortBy is provided
    if (sortBy === "price_asc") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      products.sort((a, b) => b.price - a.price);
    }

    return products;
  },
};
