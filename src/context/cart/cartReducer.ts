import { CartState } from "./";
import { CartProduct } from "@/interfaces";

type CartActionType =
  | {
      type: "[Cart] - LoadCart from cookies | storage";
      payload: CartProduct[];
    }
  | {
      type: "[Cart] - Update Products in cart";
      payload: CartProduct[];
    }
  | {
      type: "[Cart] - Change cart quantity";
      payload: CartProduct;
    }
  | {
      type: "[Cart] - Remove product in Cart";
      payload: CartProduct;
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies | storage":
      return {
        ...state,
        cart: action.payload,
      };

    case "[Cart] - Update Products in cart":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "[Cart] - Change cart quantity":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (
            action.payload.id === product.id &&
            action.payload.size === product.size
          ) {
            return action.payload;
          }

          return product;
        }),
      };

    case "[Cart] - Remove product in Cart":
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              action.payload.id === product.id &&
              action.payload.size === product.size
            )
        ),
      };

    default:
      return state;
  }
};
