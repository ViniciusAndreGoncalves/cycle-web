import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Settings, Moon, Sun, Monitor, DollarSign, Coins } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useCurrency } from "@/components/currency-provider"

export function NavSettings() {
  const { setTheme } = useTheme()
  const { currency, setCurrency } = useCurrency()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-background border-border">
        <DropdownMenuLabel>Configurações</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* SUB-MENU DE TEMA */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="ml-6">Tema</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-background border-border">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="mr-2 h-4 w-4" /> Claro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="mr-2 h-4 w-4" /> Escuro
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <Monitor className="mr-2 h-4 w-4" /> Sistema
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* SUB-MENU DE MOEDA */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {currency === 'brl' ? <Coins className="mr-2 h-4 w-4" /> : <DollarSign className="mr-2 h-4 w-4" />}
            <span>Moeda ({currency.toUpperCase()})</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-background border-border">
            <DropdownMenuItem onClick={() => setCurrency("brl")}>
              🇧🇷 Real (BRL)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCurrency("usd")}>
              🇺🇸 Dólar (USD)
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}