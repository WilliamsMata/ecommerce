import { PropsWithChildren, useEffect, useReducer } from "react";
import Cookie from "js-cookie";
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

  // Load cartProducts from cookies on mount
  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  // Set cartProducts on cookie
  useEffect(() => {
    if (state.cart.length > 0) Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

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
