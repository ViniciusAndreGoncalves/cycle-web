// Hook para gerenciar autenticação de usuários, saber quem está logado

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  name: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // 1. Ao abrir o site, verifica se tem o crachá no bolso (LocalStorage)
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userName = localStorage.getItem("user_name");

    if (token && userName) {
      setUser({ name: userName });
    }
  }, []);

  // 2. Função de Login (Chamada pela tela de Login/Register)
  const login = (name: string, token: string) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_name", name);
    setUser({ name });
  };

  // 3. Função de Logout (Chamada pelo botão Sair)
  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_name");
    setUser(null);
    window.location.href = "/"; // Força ir para home
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
