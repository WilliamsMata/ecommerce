import { PropsWithChildren, useEffect, useReducer, useState } from "react";
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
  const [isMounted, setIsMounted] = useState<boolean>(false);
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

      setIsMounted(true);
    } catch (error) {
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  // Set cartProducts on cookie
  useEffect(() => {
    if (isMounted) Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart, isMounted]);

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

  const updateCartQuantity = (product: CartProduct) => {
    dispatch({ type: "[Cart] - Change cart quantity", payload: product });
  };

  const removeCartProduct = (product: CartProduct) => {
    dispatch({ type: "[Cart] - Remove product in Cart", payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
