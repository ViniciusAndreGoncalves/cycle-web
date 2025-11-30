import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import { useAuth } from "@/hooks/useAuth"
  import { User, CreditCard, LogOut, Settings } from "lucide-react"
  import { Link } from "react-router-dom"
  
  export function UserNav() {
    const { user, logout } = useAuth()
  
    // Pega as iniciais do nome (Ex: João Silva -> JS)
    const initials = user?.name
      ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2)
      : "U"
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9 border border-zinc-700">
              {/* Se quiser foto real no futuro, coloque a url no src */}
              <AvatarImage src="" alt={user?.name} />
              <AvatarFallback className="bg-emerald-600 text-white font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-800 text-zinc-100" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-zinc-400">
                investidor@money.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-800" />
          <DropdownMenuGroup>
            <Link to="/dashboard">
                <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">
                <User className="mr-2 h-4 w-4" />
                <span>Minha Carteira</span>
                </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Assinatura</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-zinc-800">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-zinc-800" />
          <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer hover:bg-red-900/20 hover:text-red-400">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }