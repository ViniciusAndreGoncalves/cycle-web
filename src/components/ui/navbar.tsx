import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react" // Ícone que já instalamos
import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <div className="border-b border-zinc-800 bg-zinc-950 px-4 py-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        
        {/* Lado Esquerdo: Logo */}
        <Link to="/" className="text-xl font-bold text-white hover:opacity-80">
          Finance<span className="text-emerald-500">Portal</span> 💰
        </Link>

        {/* Centro: Barra de Pesquisa */}
        <div className="relative hidden w-full max-w-md md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
          <Input 
            placeholder="Pesquisar ativo (ex: PETR4, BTC)..." 
            className="bg-zinc-900 border-zinc-800 pl-9 text-white focus-visible:ring-emerald-600"
          />
        </div>

        {/* Lado Direito: Botões de Ação */}
        <div className="flex items-center gap-2">
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