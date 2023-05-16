import { createContext } from "react";
import { CartProduct, OrderSummary, ShippingAddress } from "@/interfaces";

interface ContextProps {
  isLoaded: boolean;
  cart: CartProduct[];
  orderSummary: OrderSummary;
  shippingAddress?: ShippingAddress;

  addProductToCart: (product: CartProduct) => void;
  updateCartQuantity: (product: CartProduct) => void;
  removeCartProduct: (product: CartProduct) => void;
  updateAddress: (address: ShippingAddress) => void;
}

export const CartContext = createContext({} as ContextProps);
