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

    default:
      return state;
  }
};
