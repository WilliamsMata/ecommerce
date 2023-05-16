import {
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import Cookies from "js-cookie";
import { CartContext, cartReducer } from "./";
import {
  CartProduct,
  OrderSummary,
  IShippingAddress,
  IOrder,
} from "@/interfaces";
import { tesloApi } from "@/api";
import { AuthContext } from "../auth";

export interface CartState {
  isLoaded: boolean;
  cart: CartProduct[];
  orderSummary: OrderSummary;
  shippingAddress?: IShippingAddress;
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
  shippingAddress: undefined,
};

export const CartProvider = ({ children }: PropsWithChildren) => {
  const { user } = useContext(AuthContext);

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  // Load cartProducts from cookies on mount
  useEffect(() => {
    try {
      const cookieProducts = Cookies.get("cart")
        ? JSON.parse(Cookies.get("cart")!)
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
    if (isMounted) Cookies.set("cart", JSON.stringify(state.cart));
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

  // Load Shipping Address from Cookies
  useEffect(() => {
    if (Cookies.get("firstName")) {
      const shippingAddress = {
        firstName: Cookies.get("firstName") || "",
        lastName: Cookies.get("lastName") || "",
        address: Cookies.get("address") || "",
        address2: Cookies.get("address2") || "",
        zip: Cookies.get("zip") || "",
        state: Cookies.get("state") || "",
        country: Cookies.get("country") || "",
        phone: Cookies.get("phone") || "",
      };

      dispatch({
        type: "[Cart] - Load Address from Cookies",
        payload: shippingAddress,
      });
    }
  }, []);

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

  const updateAddress = (address: IShippingAddress) => {
    Cookies.set("firstName", address.firstName);
    Cookies.set("lastName", address.lastName);
    Cookies.set("address", address.address);
    Cookies.set("address2", address.address2 || "");
    Cookies.set("zip", address.zip);
    Cookies.set("state", address.state);
    Cookies.set("country", address.country);
    Cookies.set("phone", address.phone);
    dispatch({ type: "[Cart] - Update Address", payload: address });
  };

  const createOrder = async () => {
    if (!state.shippingAddress)
      throw new Error("There is not shipping address");

    const body: IOrder = {
      userId: user!.id,
      shippingAddress: state.shippingAddress,
      numberOfItems: state.orderSummary.numberOfItems,
      subTotal: state.orderSummary.subTotal,
      tax: state.orderSummary.tax,
      total: state.orderSummary.total,
      isPaid: false,
      orderItems: state.cart.map((product) => ({
        productId: product.id,
        size: product.size!,
        gender: product.gender,
        quantity: product.quantity,
        price: product.price,
      })),
    };

    try {
      const { data } = await tesloApi.post("/orders", body);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        addProductToCart,
        updateCartQuantity,
        removeCartProduct,
        updateAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
