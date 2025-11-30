import { Navbar } from "@/components/ui/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Olá, <span className="text-emerald-500">{user?.name}</span> 👋
        </h1>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Exemplo de Card de Patrimônio */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-zinc-400 text-sm font-medium">
                Patrimônio Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">R$ 0,00</div>
              <p className="text-xs text-zinc-500 mt-1">+0% esse mês</p>
            </CardContent>
          </Card>

          {/* Aqui virão os gráficos no futuro */}
          <Card className="bg-zinc-900 border-zinc-800 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-zinc-400 text-sm font-medium">
                Meus Ativos
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center text-zinc-500">
              Você ainda não cadastrou ativos.
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
