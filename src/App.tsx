import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Home } from "@/pages/Home";
import { Register } from "./pages/Register";
import { Dashboard } from "@/pages/Dashboard"
import { Profile } from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota raiz agora é a Home Pública */}
        <Route path="/" element={<Home />} />
        
        {/* Rota de Login separada */}
        <Route path="/login" element={<Login />} />
        
        {/* Rota Registro */}
        <Route path="/register" element={< Register />} />

        {/* Rota Dashboard (tela de usuário) */}
        <Route path="/dashboard" element={<Dashboard />} />

        { /* rota de Perfil de usuário*/}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App