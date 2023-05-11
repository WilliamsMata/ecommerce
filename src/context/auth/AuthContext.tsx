import { UserContext } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  isLoggedIn: boolean;
  user?: UserContext;

  loginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ hasError: boolean; message?: string }>;
}

export const AuthContext = createContext({} as ContextProps);
