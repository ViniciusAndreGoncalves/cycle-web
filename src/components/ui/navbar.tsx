import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react" // Ícone que já instalamos
import { Link } from "react-router-dom"
import { ModeToggle } from "../mode-toggle"

export function Navbar() {
  return (
    <div className="border-b border-zinc-800 bg-zinc-950 px-4 py-3">
      <div className="flex w-full items-center justify-between gap-4">
        
        {/* Lado Esquerdo: Logo */}
        <Link to="/" className="text-xl font-bold text-white hover:opacity-80">
          CY<span className="text-emerald-500">CLE</span>
        </Link>

        {/* Centro: Barra de Pesquisa */}
        <div className="relative hidden w-full max-w-2xl md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
          <Input 
            placeholder="Pesquisar ativo (ex: PETR4, BTC)..." 
            className="bg-zinc-900 border-zinc-800 pl-9 text-white focus-visible:ring-emerald-600"
          />
        </div>

        {/* Lado Direito: Botões de Ação */}
        <div className="flex items-center gap-2">
          {/* Adicionei o botão de tema AQUI*/}
          <ModeToggle />
          
          <Link to="/login">
            <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-zinc-800">
              Entrar
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
              Criar Conta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}