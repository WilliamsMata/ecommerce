import { PropsWithChildren, useReducer } from "react";
import { CartContext, cartReducer } from "./";
import { CartProduct } from "@/interfaces";

export interface CartState {
  cart: CartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  return (
    <CartContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
