import { createContext } from "react";
import { CartProduct } from "@/interfaces";

interface ContextProps {
  cart: CartProduct[];
}

export const CartContext = createContext({} as ContextProps);
