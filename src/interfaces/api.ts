import { Product, Size } from "@prisma/client";

export interface GetProducts {
  images: { url: string }[];
  title: string;
  inStock: number;
  price: number;
  slug: string;
}

export interface GetProductBySlug {
  images: {
    url: string;
  }[];
  sizes: {
    size: Size;
  }[];
  title: string;
  description: string;
  price: number;
}

export interface ProductSlug {
  slug: string;
}
