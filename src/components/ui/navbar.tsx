import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu } from "lucide-react" // Ícone que já instalamos
import { Link } from "react-router-dom"
import { ModeToggle } from "../mode-toggle"
import CYCLE_Logo from "@/assets/CYCLE_Logo.png"
import { NavSettings } from "@/components/nav-settings"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Navbar() {
  return (
    <div className="border-b border-border bg-background px-4 md:px-8 py-3">
      <div className="flex w-full items-center justify-between gap-4">
        
        <Link to="/" className="flex items-center gap-2 hover:opacity-80">
          
          {/* 2. Use a variável importada aqui no src */}
          <img 
            src={CYCLE_Logo} 
            alt="Logo" 
            className="w-8 h-8 md:w-10 md:h-10 object-contain" // Talvez w-10 fique melhor para GIF
          />

          <span className="text-lg md:text-xl font-bold text-foreground">
            CY<span className="text-emerald-500">CLE</span>
          </span>

        </Link>

        {/* CENTRO: Busca (Só no PC) */}
        <div className="relative hidden w-full max-w-xl lg:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Pesquisar ativo (ex: PETR4)..." 
            className="pl-9 bg-muted/50 border-input focus-visible:ring-emerald-600"
          />
        </div>

        {/* DIREITA (PC): Botões visíveis apenas em telas médias pra cima (md:flex) */}
        <div className="hidden md:flex items-center gap-2">
          <NavSettings /> {/* Engrenagem */}
          
          <Link to="/login">
            <Button variant="outline" className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-full">
              Entrar
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-full">
              Criar Conta
            </Button>
          </Link>
        </div>

        {/* DIREITA (MOBILE): Menu Hambúrguer (Só visível em telas pequenas) */}
        <div className="md:hidden flex items-center gap-2">
          <NavSettings /> {/* Engrenagem acessível fora do menu também */}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-border">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col gap-4 mt-6">
                {/* Busca no Mobile dentro do Menu */}
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Pesquisar..." 
                    className="pl-9 bg-muted/50 border-input"
                  />
                </div>

                <Link to="/login">
                  <Button variant="outline" className="relative w-full justify-center text-foreground border-border rounded-full">
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="relative w-full bg-emerald-600 text-white hover:bg-emerald-700 rounded-full">
                    Criar Conta
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}