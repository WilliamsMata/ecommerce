import type {
  Gender,
  Image,
  Product,
  ProductSize,
  Size,
  Tag,
  Type,
} from "@prisma/client";

export interface IProduct {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISize[];
  slug: string;
  tags: string[];
  title: string;
  type: IType;
  gender: "men" | "women" | "kid" | "unisex";
}

export type ISize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

export type IType = "shirts" | "pants" | "hoodies" | "hats";

export interface CompleteProduct extends Product {
  images: Image[];
  sizes: ProductSize[];
  tags: Tag[];
}

export interface UpdateProduct {
  id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  type: Type;
  gender: Gender;
}
