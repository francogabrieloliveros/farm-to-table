import { Document } from 'mongoose';

export enum ProductType {
  Crop = 1,
  Poultry = 2,
}

export interface IProduct {
  name: string;
  description: string;
  type: ProductType;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface IProductDocument extends IProduct, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data?: IProductDocument | IProductDocument[] | null;
  error?: string;
}
