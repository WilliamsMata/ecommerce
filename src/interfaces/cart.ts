import { ISize } from "./";

export interface CartProduct {
  id: string;
  image: string;
  price: number;
  size: ISize;
  slug: string;
  gender: "men" | "women" | "kid" | "unisex";
  quantity: number;
}
