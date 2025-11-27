
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react"
import { Navbar } from "@/components/ui/Navbar"

export function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Navbar />

      {/* Seção Hero (Boas vindas) */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Domine seus <span className="text-emerald-500">Investimentos</span>
          </h1>
          <p className="mb-8 text-lg text-zinc-400">
            Acompanhe o mercado em tempo real e gerencie sua carteira em um só lugar.
          </p>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            Começar Agora
          </Button>
        </section>

        {/* Seção de Destaques (Simulação Visual) */}
        <section className="grid gap-6 md:grid-cols-3">
          
          {/* Card 1: Maiores Altas */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                Maiores Altas (B3)
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Item Fake 1 */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">PETR4</span>
                  <div className="flex items-center text-emerald-500">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    +2.5%
                  </div>
                </div>
                {/* Item Fake 2 */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">VALE3</span>
                  <div className="flex items-center text-emerald-500">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    +1.2%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Criptomoedas */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                Cripto Destaques
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Bitcoin</span>
                  <div className="flex items-center text-red-500">
                    <ArrowDownRight className="mr-1 h-4 w-4" />
                    -0.5%
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Ethereum</span>
                  <div className="flex items-center text-emerald-500">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    +3.1%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

           {/* Card 3: Convite */}
           <Card className="bg-zinc-900 border-zinc-800 bg-gradient-to-br from-zinc-900 to-emerald-950/30">
            <CardHeader>
              <CardTitle className="text-white">Sua Carteira</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-zinc-400">
                Faça login para ver quanto seus ativos renderam hoje.
              </p>
              <Button variant="outline" className="w-full border-zinc-700 text-black hover:bg-zinc-800 hover:text-white">
                Acessar Carteira
              </Button>
            </CardContent>
          </Card>

        </section>
      </main>
    </div>
  )
}