import { CartState } from "./";
import { CartProduct } from "@/interfaces";

type CartActionType =
  | {
      type: "[Cart] - LoadCart from cookies | storage";
      payload: CartProduct[];
    }
  | {
      type: "[Cart] - Add Product";
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
      };

    default:
      return state;
  }
};
