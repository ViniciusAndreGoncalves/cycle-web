import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "@/pages/Login";
import { Home } from "@/pages/Home";
import { Register } from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota raiz agora é a Home Pública */}
        <Route path="/" element={<Home />} />
        
        {/* Rota de Login separada */}
        <Route path="/login" element={<Login />} />
        
        {/* Placeholder para Registro */}
        <Route path="/register" element={< Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App