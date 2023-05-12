import { PropsWithChildren, useEffect, useReducer, useState } from "react";
import Cookie from "js-cookie";
import { CartContext, cartReducer } from "./";
import { CartProduct, OrderSummary } from "@/interfaces";

export interface CartState {
  isLoaded: boolean;
  cart: CartProduct[];
  orderSummary: OrderSummary;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  orderSummary: {
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
  },
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

  // Handle orderSummary
  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );

    const subTotal = state.cart.reduce(
      (prev, current) => current.quantity * current.price + prev,
      0
    );

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    dispatch({
      type: "[Summary] - Update order summary",
      payload: orderSummary,
    });
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
