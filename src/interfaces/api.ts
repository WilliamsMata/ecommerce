import { Gender, Product, Size } from "@prisma/client";

export interface GetProducts {
  images: { url: string }[];
  title: string;
  inStock: number;
  price: number;
  slug: string;
}

export interface GetProductBySlug {
  id: string;
  images: {
    url: string;
  }[];
  sizes: {
    size: Size;
  }[];
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  gender: Gender;
}

export interface ProductSlug {
  slug: string;
}
