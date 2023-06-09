import { CartState } from "./";
import { CartProduct, OrderSummary, IShippingAddress } from "@/interfaces";

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
    }
  | {
      type: "[Cart] - Load Address from Cookies";
      payload: IShippingAddress;
    }
  | {
      type: "[Cart] - Update Address";
      payload: IShippingAddress;
    }
  | {
      type: "[Cart] - Order complete";
    }
  | {
      type: "[Summary] - Update order summary";
      payload: OrderSummary;
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies | storage":
      return {
        ...state,
        isLoaded: true,
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

    case "[Cart] - Load Address from Cookies":
    case "[Cart] - Update Address":
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case "[Cart] - Order complete":
      return {
        ...state,
        cart: [],
        orderSummary: {
          numberOfItems: 0,
          subTotal: 0,
          tax: 0,
          total: 0,
        },
      };

    case "[Summary] - Update order summary":
      return {
        ...state,
        orderSummary: action.payload,
      };

    default:
      return state;
  }
};
