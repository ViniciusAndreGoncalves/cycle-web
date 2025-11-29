import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

// Dados falsos para simular a API (depois virão do Back-end)
const marketData = [
  { symbol: "PETR4", name: "Petrobras", price: "R$ 36,50", change: 2.5, type: "up" },
  { symbol: "VALE3", name: "Vale", price: "R$ 62,10", change: -1.2, type: "down" },
  { symbol: "BTC", name: "Bitcoin", price: "$ 68.000", change: 5.4, type: "up" },
  { symbol: "ETH", name: "Ethereum", price: "$ 3.500", change: 1.1, type: "up" },
  { symbol: "ITUB4", name: "Itaú", price: "R$ 33,20", change: 0.5, type: "up" },
  { symbol: "MGLU3", name: "Magalu", price: "R$ 1,80", change: -4.0, type: "down" },
  { symbol: "WEGE3", name: "Weg", price: "R$ 40,00", change: 0.0, type: "neutral" },
]

export function MarketCarousel() {
  // Configuração do Autoplay (Delay de 2 segundos)
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <div className="w-full px-10"> {/* Padding para as setas não ficarem coladas */}
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {marketData.map((asset, index) => (
            // MD:basis-1/3 = Mostra 3 itens em telas médias
            // LG:basis-1/5 = Mostra 5 itens em telas grandes
            <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
              <div className="p-1">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <span className="text-lg font-bold text-white">{asset.symbol}</span>
                    <span className="text-xs text-zinc-400">{asset.name}</span>
                    
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm font-medium text-zinc-200">{asset.price}</span>
                      
                      <div className={`flex items-center text-xs font-bold ${
                        asset.type === 'up' ? 'text-emerald-500' : 
                        asset.type === 'down' ? 'text-red-500' : 'text-zinc-500'
                      }`}>
                        {asset.type === 'up' && <ArrowUpRight className="h-3 w-3 mr-1" />}
                        {asset.type === 'down' && <ArrowDownRight className="h-3 w-3 mr-1" />}
                        {asset.change}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-emerald-500" />
        <CarouselNext className="bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-emerald-500" />
      </Carousel>
    </div>
  )
}