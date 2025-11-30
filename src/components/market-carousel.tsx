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
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

// Dados falsos para simular a API
const staticStocks = [
  { symbol: "PETR4", name: "Petrobras", price: 36.50, change: 2.5},
  { symbol: "VALE3", name: "Vale", price: 62.10, change: -1.2 },
  { symbol: "ITUB4", name: "Itaú", price: 33.20, change: 0.5 },
  { symbol: "MGLU3", name: "Magalu", price: 1.80, change: -4.0 },
  { symbol: "WEGE3", name: "Weg", price: 40.00, change: 0.0 },
]

interface MarketCarouselProps {
  cryptos?: any[]; // Interrogação protege caso esteja vazio as Criptos
}

export function MarketCarousel({ cryptos = [] }: MarketCarouselProps) {
  // Configuração do Autoplay (Delay de 3 segundos)
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  const formattedCryptos = cryptos.map((coin: any) => ({
    symbol: coin.symbol.toUpperCase(),
    name: coin.name,
    price: coin.current_price,
    change: coin.price_change_percentage_24h,
    isCrypto: true // Indica que é cripto (Marcador extra)
  }))

  const displayData = [...staticStocks, ...formattedCryptos]

  return (
    <div className="w-full px-4 md:px-10"> {/* Padding ajustado para mobile */}
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {displayData.map((asset, index) => (
            // Ajuste responsivo: no celular (padrão) ocupa 60%, em tablet 1/3, em PC 1/5
            <CarouselItem key={index} className="basis-[60%] sm:basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4">
              <div className="p-1">
                <Card className="bg-zinc-900 border-zinc-800">
                  {/* AQUI ESTÁ A CORREÇÃO PRINCIPAL NO CSS 👇 */}
                  <CardContent className="flex flex-col items-center justify-between p-3 h-[120px]"> 
                    
                    {/* 1. Título e Nome (Parte de Cima) */}
                    <div className="flex flex-col items-center w-full">
                      <span className="text-base md:text-lg font-bold text-white">
                        {asset.symbol}
                      </span>
                      {/* Truncate corta o texto se for muito longo (Ex: "Matic Networ...") */}
                      <span className="text-[10px] md:text-xs text-zinc-400 truncate w-full text-center max-w-[120px]">
                        {asset.name}
                      </span>
                    </div>
                    
                    {/* 2. Preço e Variação (Parte de Baixo) */}
                    <div className="flex flex-col items-center gap-1 w-full">
                      {/* whitespace-nowrap IMPEDE que o preço quebre linha e suba em cima do título */}
                      <span className="text-sm md:text-base font-medium text-zinc-200 whitespace-nowrap">
                        {Number(asset.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                      
                      <div className={`flex items-center text-[10px] md:text-xs font-bold ${
                        asset.change > 0 ? 'text-emerald-500' : 
                        asset.change < 0 ? 'text-red-500' : 'text-zinc-500'
                      }`}>
                        {asset.change > 0 && <ArrowUpRight className="h-3 w-3 mr-1" />}
                        {asset.change < 0 && <ArrowDownRight className="h-3 w-3 mr-1" />}
                        {asset.change === 0 && <Minus className="h-3 w-3 mr-1" />}
                        {asset.change.toFixed(2)}%
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Setas somem no mobile para não atrapalhar */}
        <CarouselPrevious className="hidden md:flex bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-emerald-500" />
        <CarouselNext className="hidden md:flex bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700 hover:text-emerald-500" />
      </Carousel>
    </div>
  )
}