import { useEffect, useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Loader2, Wallet as WalletIcon, ArrowRight, TrendingUp } from "lucide-react";
import { AllocationChart } from "@/components/dashboard/allocation-chart";
import { AssetList } from "@/components/dashboard/asset-list";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {       
        const response = await api.get("/carteira/resumo");
        setSummary(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-10">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Olá, <span className="text-emerald-500">{user?.name}</span> 👋
        </h1>

        {loading ? (
           <div className="flex h-[300px] w-full items-center justify-center">
               <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
           </div>
        ) : (
            <div className="flex flex-col gap-6">
                
                {/* --- SEÇÃO 1: CARDS DE RESUMO --- */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Link to="/carteira" className="group">
                        <Card className="bg-zinc-900 border-zinc-800 transition-all duration-300 hover:border-emerald-500/50 hover:bg-zinc-900/80 cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-400">
                            Patrimônio Total
                            </CardTitle>
                            <WalletIcon className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white mb-1">
                                {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                                }).format(summary?.total_patrimonio || 0)}
                            </div>
                            <p className="text-xs text-zinc-500 flex items-center group-hover:text-emerald-400 transition-colors">
                                Ver detalhes da carteira{" "}
                                <ArrowRight className="ml-1 h-3 w-3" />
                            </p>
                        </CardContent>
                        </Card>
                    </Link>

                    <Card className="bg-zinc-900 border-zinc-800 opacity-70">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">
                            Rentabilidade (Mês)
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-zinc-500" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold text-zinc-500">Em breve</div>
                        </CardContent>
                    </Card>
                </div>

                {/* --- SEÇÃO 2: GRÁFICO --- */}
                <div className="grid gap-6 md:grid-cols-12">
                    <div className="md:col-span-12 h-[400px]">
                        {summary?.grafico && summary.grafico.length > 0 ? (
                            <AllocationChart data={summary.grafico} />
                        ) : (
                            <Card className="bg-zinc-900 border-zinc-800 h-full flex items-center justify-center text-zinc-500">
                                Carteira vazia. Adicione ativos.
                            </Card>
                        )}
                    </div>
                </div>

                {/* --- SEÇÃO 3: LISTA DETALHADA --- */}
                {summary?.detalhes && summary.detalhes.length > 0 && (
                    <div className="mt-4">
                        <AssetList assets={summary.detalhes} />
                    </div>
                )}

            </div>
        )}
      </main>
      <div className="flex gap-4 mt-4 justify-center">
          {/* 1. Botão CANCELAR */}
          <Link to="/" className="justify-center">
            <Button
              type="button"
              variant="outline"
              className="border-white-500/50 text-white-500 hover:bg-white-500/10 hover:text-white-400 hover:border-white-500"
            >
              Voltar
            </Button>
          </Link>
        </div>
    </div>
  );
}