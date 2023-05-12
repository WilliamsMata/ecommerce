import { createContext } from "react";
import { CartProduct, OrderSummary } from "@/interfaces";

interface ContextProps {
  isLoaded: boolean;
  cart: CartProduct[];
  orderSummary: OrderSummary;

  addProductToCart: (product: CartProduct) => void;
  updateCartQuantity: (product: CartProduct) => void;
  removeCartProduct: (product: CartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
