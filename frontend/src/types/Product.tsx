export type Product = {
  productId: string;
  productName: string;
  productDescription: string;
  productType: 1 | 2; // 1 = Crop, 2 = Poultry
  productQuantity: number;
  price: number;
  image: string;
};
