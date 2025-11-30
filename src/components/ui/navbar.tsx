import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { NavSettings } from "@/components/nav-settings";
import { UserNav } from "@/components/user-nav";
import { useAuth } from "@/hooks/useAuth";
import CYCLE_Logo from "@/assets/CYCLE_Logo.png"; // Confirme se o nome do seu arquivo é esse mesmo
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="border-b border-border bg-background px-4 md:px-8 py-3 sticky top-0 z-50">
      <div className="flex w-full items-center justify-between gap-4">
        {/* --- LADO ESQUERDO: LOGO --- */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80">
          <img
            src={CYCLE_Logo}
            alt="Logo Money"
            className="w-8 h-8 md:w-10 md:h-10 object-contain"
          />
          <div className="flex flex-col font-bold text-foreground">
            {/* Texto Mobile */}
            <span className="md:hidden text-lg">
              CY<span className="text-emerald-500">CLE</span>
            </span>
            {/* Texto Desktop */}
            <span className="hidden md:block text-xl">
              CY<span className="text-emerald-500">CLE</span>
            </span>
          </div>
        </Link>

        {/* --- CENTRO: BUSCA (Apenas Desktop) --- */}
        <div className="relative hidden w-full max-w-xl lg:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar ativo (ex: PETR4)..."
            className="pl-9 bg-muted/50 border-input focus-visible:ring-emerald-600"
          />
        </div>

        {/* ======================================================== */}
        {/* ÁREA DESKTOP (Computador)                      */}
        {/* hidden md:flex -> Esconde no celular, mostra no PC     */}
        {/* ======================================================== */}
        <div className="hidden md:flex items-center gap-2">
          <NavSettings />

          {isAuthenticated ? (
            // Se logado: Mostra Menu do Usuário (Avatar)
            <UserNav />
          ) : (
            // Se deslogado: Mostra botões de Entrar/Cadastrar
            <div className="flex gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-full"
                >
                  Entrar
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-full">
                  Criar Conta
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* ÁREA MOBILE (Celular)                          */}
        {/* md:hidden flex -> Mostra no celular, esconde no PC     */}
        {/* ======================================================== */}
        <div className="md:hidden flex items-center gap-2">
          <NavSettings />

          {isAuthenticated ? (
            // No Mobile, se estiver logado, também mostramos o Avatar direto
            // pois ele já tem menu de sair/perfil
            <UserNav />
          ) : (
            // Se NÃO estiver logado, mostra o Menu Hambúrguer
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-background border-border"
              >
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 mt-6">
                  {/* Busca Mobile dentro do Menu */}
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Pesquisar ativo (ex: PETR4)..."
                      className="pl-9 bg-muted/50 border-input"
                    />
                  </div>

                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="w-full text-muted-foreground hover:text-foreground hover:bg-accent rounded-full"
                    >
                      Entrar
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700 rounded-full">
                      Criar Conta
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </div>
  );
}
