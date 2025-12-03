import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Home } from "@/pages/Home";
import { Register } from "./pages/Register";
import { Dashboard } from "@/pages/Dashboard";
import { Profile } from "./pages/Profile";
import { Wallet } from "@/pages/Wallet";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

function PrivateRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("auth_token");
  
  // Fragment < > para garantir o retorno seguro
  return token ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota raiz agora é a Home Pública */}
        <Route path="/" element={<Home />} />

        {/* Rota de Login separada */}
        <Route path="/login" element={<Login />} />

        {/* Rota Registro */}
        <Route path="/register" element={<Register />} />

        {/* Rota Dashboard (tela de usuário) */}
        <Route path="/dashboard" element={
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        } />

        {/* rota de Perfil de usuário*/}
        <Route path="/profile" element={
            <PrivateRoute>
                <Profile />
            </PrivateRoute>
        } />

        {/* rota da carteira do usuário*/}
        <Route path="/carteira" element={
            <PrivateRoute>
                <Wallet />
            </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
