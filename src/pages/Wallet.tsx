import { useEffect, useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { api } from "@/lib/axios";
import { AllocationChart } from "@/components/dashboard/allocation-chart";
import { AssetList } from "@/components/dashboard/asset-list";
import { Loader2, PieChart } from "lucide-react";
import { AddTransactionModal } from "@/components/dashboard/add-transaction-modal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Wallet() {
  
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);

  // Transformei em uma função reutilizável para recarregar os dados após adicionar
  async function loadData() {
    // setLoading(true) // Opcional: Se quiser mostrar loading ao recarregar
    try {
      const response = await api.get("/carteira/resumo");
      setSummary(response.data);
    } catch (error) {
      console.error("Erro ao carregar carteira:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pb-10">
      <Navbar />

      <main className="container mx-auto px-4 py-8">        
        
        {/* CABEÇALHO DA PÁGINA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 rounded-full">
                    <PieChart className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Minha Carteira</h1>
                    <p className="text-muted-foreground">Detalhamento de alocação e ativos.</p>
                </div>
            </div>

            {/* AQUI ESTÁ O BOTÃO DE ADICIONAR */}
            <AddTransactionModal onSuccess={loadData} />
        </div>

        {loading ? (
           <div className="flex h-[300px] w-full items-center justify-center">
               <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
           </div>
        ) : (
            <div className="flex flex-col gap-8">
                
                {/* GRÁFICO */}
                <div className="h-[400px] w-full">
                    {summary?.grafico && summary.grafico.length > 0 ? (
                        <AllocationChart data={summary.grafico} />
                    ) : (
                        <div className="text-center text-muted-foreground py-10 border border-dashed border-border rounded-lg">
                            <p className="mb-4">Sua carteira está vazia.</p>
                            {/* Se estiver vazia, mostra o botão aqui também para facilitar */}
                            <AddTransactionModal onSuccess={loadData} />
                        </div>
                    )}
                </div>

                {/* LISTA */}
                <div>
                     {summary?.detalhes && summary.detalhes.length > 0 && (
                        <AssetList assets={summary.detalhes} />
                     )}
                </div>

            </div>
        )}
      </main>
      <div className="flex gap-4 mt-4 justify-center">
          {/* 1. Botão CANCELAR */}
          <Link to="/" className="justify-center">
            <Button
              type="button"
              variant="outline"
              className="border-white-500/50 text-card-foreground-500 hover:bg-white-500/10 hover:text-card-foreground-400 hover:border-white-500"
            >
              Voltar
            </Button>
          </Link>
        </div>
    </div>
  );
}