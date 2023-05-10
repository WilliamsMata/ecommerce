import { ISize } from "./";

export interface CartProduct {
  id: string;
  image: string;
  price: number;
  size?: ISize;
  slug: string;
  title: string;
  gender: "men" | "women" | "kid" | "unisex";
  quantity: number;
}

export interface OrderSummary {
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}
