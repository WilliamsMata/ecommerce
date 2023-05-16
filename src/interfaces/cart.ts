import { Gender, Size } from "@prisma/client";

export interface CartProduct {
  id: string;
  image: string;
  price: number;
  size?: Size;
  slug: string;
  title: string;
  gender: Gender;
  quantity: number;
}

export interface OrderSummary {
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}
