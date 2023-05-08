import { createContext } from "react";
import { CartProduct } from "@/interfaces";

interface ContextProps {
  cart: CartProduct[];
  addProductToCart: (product: CartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
