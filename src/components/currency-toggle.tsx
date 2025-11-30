import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurrency } from "@/components/currency-provider"
import { DollarSign, Coins } from "lucide-react"

export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-[60px] justify-between px-2 bg-transparent border-zinc-800 text-white hover:bg-zinc-800">
          {currency === 'brl' ? 'BRL' : 'USD'}
          {currency === 'brl' ? <Coins className="h-3 w-3 ml-1 text-emerald-500" /> : <DollarSign className="h-3 w-3 ml-1 text-emerald-500" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-white">
        <DropdownMenuItem onClick={() => setCurrency("brl")} className="hover:bg-zinc-800 cursor-pointer justify-between">
          BRL <Coins className="h-3 w-3 text-zinc-400" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrency("usd")} className="hover:bg-zinc-800 cursor-pointer justify-between">
          USD <DollarSign className="h-3 w-3 text-zinc-400" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}