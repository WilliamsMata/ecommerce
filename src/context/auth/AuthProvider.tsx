import { PropsWithChildren, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { User } from "@prisma/client";
import axios from "axios";
import Cookies from "js-cookie";

import { AuthContext, authReducer } from "./";
import { tesloApi } from "@/api";
import { UserContext } from "@/interfaces";

export interface AuthState {
  isLoggedIn: boolean;
  user?: UserContext;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const router = useRouter();

  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      console.log({ user: data?.user });

      dispatch({ type: "[Auth] - Login", payload: data.user as User });
    }
  }, [status, data]);

  // useEffect(() => {
  //   checkToken();
  // }, []);

  const checkToken = async () => {
    if (!Cookies.get("token")) return;

    try {
      const { data } = await tesloApi.get("/user/validate-token");
      const { token, user } = data;

      Cookies.set("token", token);

      dispatch({ type: "[Auth] - Login", payload: user });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { token, user } = data;

      Cookies.set("token", token);

      dispatch({ type: "[Auth] - Login", payload: user });

      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{
    hasError: boolean;
    message?: string;
  }> => {
    try {
      const { data } = await tesloApi.post("/user/signup", {
        name,
        email,
        password,
      });
      const { token, user } = data;

      Cookies.set("token", token);

      dispatch({ type: "[Auth] - Login", payload: user });

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "Failed to create user, please try again",
      };
    }
  };

  const logoutUser = () => {
    Cookies.remove("cart");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("address");
    Cookies.remove("address2");
    Cookies.remove("zip");
    Cookies.remove("city");
    Cookies.remove("country");
    Cookies.remove("phone");

    signOut();
    // Cookies.remove("token");
    // router.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
