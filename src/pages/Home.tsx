import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { MarketCarousel } from "@/components/market-carousel";

export function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <Navbar />

      {/* --- CARROSSEL --- */}
      <div className="w-full px-8 py-8">
        <p className="mb-4 text-sm font-medium text-zinc-500 uppercase tracking-widest">
          Mercado em Tempo Real
        </p>
        <MarketCarousel />
      </div>

      {/* Seção Hero (Boas vindas) */}
      <main className="w-full px-8 py-8">
        <section className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Domine seus <span className="text-emerald-500">Investimentos</span>
          </h1>
          <p className="mb-8 text-lg text-zinc-400">
            Acompanhe o mercado em tempo real e gerencie sua carteira em um só
            lugar.
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 rounded-full"
          >
            Começar Agora
          </Button>
        </section>

        {/* Seção de Destaques (Simulação Visual) */}
        <section className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {/* Card 3: Convite */}
          <Card className="bg-zinc-900 border-border bg-gradient-to-br from-zinc-900 to-emerald-950/30 flex flex-col justify-center items-center">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-white text-xl">Sua Carteira Inteligente</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <p className="mb-6 text-zinc-400 max-w-xs"> {/* max-w-xs ajuda o texto a quebrar bonito */}
                Monitore seus dividendos e a evolução do seu patrimônio em um gráfico unificado.
              </p>
              
              {/* Removi o w-full e adicionei min-w para garantir um tamanho mínimo elegante */}
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full min-w-[200px]">
                Criar Minha Carteira
              </Button>
            </CardContent>
          </Card>

          {/* CARD DE VÍDEO DO YOUTUBE */}
          {/* col-span-full em celular, mas ocupa 1 espaço no PC. 
              Se quiser maior, use md:col-span-2 */}
          <Card className="bg-zinc-900 border-border overflow-hidden mt-8 mb-16">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex justify-center items-center mt-0 mb-4">
                📺 Aprenda a Investir
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {" "}
              {/* p-0 para o vídeo colar nas bordas */}
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full object-cover"
                  src="https://www.youtube.com/embed/uXZSqTUOEhg?si=Awb54SfQmWvKR7sZ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
          </Card>

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
                {/* Ativo Fake 1 */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">PETR4</span>
                  <div className="flex items-center text-emerald-500">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    +2.5%
                  </div>
                </div>
                {/* Ativo Fake 2 */}
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
        </section>
      </main>
    </div>
  );
}
