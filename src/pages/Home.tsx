import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";
import { MarketCarousel } from "@/components/market-carousel";
import { useCryptoData } from "@/hooks/useCryptoData";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { data: criptos, loading, currency } = useCryptoData();
  const { isAuthenticated } = useAuth(); // <--- 3. Pegue o estado de login
  const navigate = useNavigate();

  function handleCreateWallet() {
    if (isAuthenticated) {
      // Se já tem conta, vai direto pro painel
      navigate("/carteira");
    } else {
      // Se não tem, vai criar conta
      navigate("/register");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* --- CARROSSEL --- */}
      <div className="w-full px-8 py-8">
        <p className="mb-4 text-sm font-medium text-zinc-500 uppercase tracking-widest">
          Mercado em Tempo Real
        </p>
        <MarketCarousel cryptos={loading ? [] : criptos} />
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
        <section className="grid gap-6 grid-cols-1 md:grid-cols-2">
          
          {/* BLOCO: CARTEIRA */}          
          <Card className="bg-zinc-900 border-border bg-gradient-to-br from-zinc-900 to-emerald-950/30 flex flex-col justify-center items-center">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-white text-xl">
                Sua Carteira Inteligente
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <p className="mb-6 text-zinc-400 max-w-xs">
                Monitore seus dividendos e a evolução do seu patrimônio em um
                gráfico unificado.
              </p>
              
              {/* BOTÃO 2: CARD LATERAL */}
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full min-w-[200px]"
                onClick={handleCreateWallet} // <--- Ação Aqui também
              >
                {isAuthenticated ? "Acessar Carteira" : "Criar Minha Carteira"}
              </Button>
            </CardContent>
          </Card>

          {/* BLOCO: Maiores Altas */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="mb-4 text-sm font-medium text-zinc-500 uppercase tracking-widest">
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

          {/* BLOCO: DADOS CRIPTOS */}
          <Card className="bg-zinc-900 border-border md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="mb-4 text-sm font-medium text-zinc-500 uppercase tracking-widest">
                Criptos
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              {/* Se estiver carregando, mostra mensagem. Se não, mostra os dados */}
              {loading ? (
                <p className="text-zinc-500 text-sm">Carregando ...</p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {criptos.map((coin: any) => (
                    <div
                      key={coin.id}
                      className="flex items-center justify-between p-2 hover:bg-zinc-800/50 rounded-lg transition-colors"
                    >
                      {/* LADO ESQUERDO: Imagem, Símbolo e Nome */}
                      <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                        {/* Imagem da Moeda */}
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-6 h-6 md:w-6 md:h-6 rounded-full flex-shrink-0"
                        />
                        <div className="flex flex-col min-w-0">
                          { /* Nome da Cripto */}
                          <span className="font-bold text-white uppercase text-xs md:text-sm">
                            {coin.symbol}
                          </span>
                          <span className="text-[10px] md:text-xs text-zinc-500 capitalize truncate max-w-[70px] md:max-w-[120px]">
                            {coin.name}
                          </span>
                        </div>
                      </div>

                      {/* LADO DIREITO: Preço e Porcentagem */}
                      <div className="flex flex-col items-end gap-0.5 md:gap-1 flex-shrink-0">
                        
                        {/* AQUI ESTÁ O PREÇO */}
                        <span className="text-xs md:text-sm font-bold text-white whitespace-nowrap">
                          {coin.current_price.toLocaleString(
                            currency === "brl" ? "pt-BR" : "en-US",
                            {
                              style: "currency",
                              currency: currency === "brl" ? "BRL" : "USD",
                            }
                          )}
                        </span>

                        {/* Porcentagem */}
                        <div
                          className={`flex items-center text-[10px] md:text-xs font-medium ${
                            coin.price_change_percentage_24h > 0
                              ? "text-emerald-500"
                              : "text-red-500"
                          }`}
                        >
                          {coin.price_change_percentage_24h > 0 ? (
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="mr-1 h-3 w-3" />
                          )}
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

        </section>
      </main>
    </div>
  );
}
