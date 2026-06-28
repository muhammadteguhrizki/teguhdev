import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type AuthContextType = {
  isLogin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const login = localStorage.getItem("isLogin");
    setIsLogin(login === "true");
  }, []);

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "teguh589") {
      localStorage.setItem("isLogin", "true");
      setIsLogin(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem("isLogin");
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)!;
}
