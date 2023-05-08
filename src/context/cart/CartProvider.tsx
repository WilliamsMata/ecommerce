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

  const addProductToCart = (product: CartProduct) => {
    const productInCart = state.cart.some(
      (p) => p.id === product.id && p.size === product.size
    );

    if (!productInCart) {
      return dispatch({
        type: "[Cart] - Update Products in cart",
        payload: [...state.cart, product],
      });
    }

    dispatch({
      type: "[Cart] - Update Products in cart",
      payload: state.cart.map((p) => {
        if (p.id === product.id && p.size === product.size)
          return {
            ...p,
            quantity: p.quantity + product.quantity,
          };

        return p;
      }),
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
