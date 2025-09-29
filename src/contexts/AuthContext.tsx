"use client";
import { deleteCookie, getCookie, setCookie } from "cookies-next/client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type AuthProps = {
  isLogin: number; // 1: has token, logined | 0: has token, not login | -1: hasn't token, not login
  username: string;
  name: string;
  roomId: number;
  userId: number;
  updateAuth: (data: Partial<Omit<AuthProps, "updateAuth">>) => void;
};

const defaultAuth: AuthProps = {
  isLogin: -1,
  username: "",
  name: "",
  roomId: 0,
  userId: 0,
  updateAuth: () => {},
};

const AuthContext = createContext<AuthProps>(defaultAuth);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<Omit<AuthProps, "updateAuth">>({
    isLogin: -1,
    username: "",
    name: "",
    userId: 0,
    roomId: 0,
  });

  const updateAuth: AuthProps["updateAuth"] = (data) => {
    if (!data.isLogin) {
      deleteCookie("auth-token", { path: "/" });
      setCookie("isLogin", "false");
      console.log("chào");
    }
    setAuth((prev) => ({ ...prev, ...data }));
  };
  useEffect(() => {
    const isL = getCookie("isLogin");
    updateAuth({ isLogin: isL ? parseInt(isL) : -1 });
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
