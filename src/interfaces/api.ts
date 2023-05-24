import type { Gender, Size } from "@prisma/client";

export interface GetProducts {
  images: { url: string }[];
  title: string;
  inStock: number;
  price: number;
  slug: string;
}

export interface ProductSlug {
  slug: string;
}
