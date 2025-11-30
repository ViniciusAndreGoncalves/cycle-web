import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Home } from "@/pages/Home";
import { Register } from "./pages/Register";
import { Dashboard } from "@/pages/Dashboard"

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
      </Routes>
    </BrowserRouter>
  )
}

export default App