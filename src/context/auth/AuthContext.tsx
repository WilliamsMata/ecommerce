import { UserContext } from "@/interfaces";
import { createContext } from "react";

interface ContextProps {
  isLoggedIn: boolean;
  user?: UserContext;

  loginUser: (email: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext({} as ContextProps);
