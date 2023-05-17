import { createContext } from "react";
import { CartProduct, OrderSummary, IShippingAddress } from "@/interfaces";

interface ContextProps {
  isLoaded: boolean;
  cart: CartProduct[];
  orderSummary: OrderSummary;
  shippingAddress?: IShippingAddress;

  addProductToCart: (product: CartProduct) => void;
  updateCartQuantity: (product: CartProduct) => void;
  removeCartProduct: (product: CartProduct) => void;
  updateAddress: (address: IShippingAddress) => void;

  // Orders
  createOrder: () => Promise<{ hasError: boolean; message: string }>;
}

export const CartContext = createContext({} as ContextProps);
