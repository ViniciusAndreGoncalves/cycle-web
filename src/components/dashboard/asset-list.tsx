import { 
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table" // Precisa ter rodado: npx shadcn@latest add table
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react"

interface Asset {
    ticker: string
    nome: string
    categoria: string
    qtd: number
    preco_medio: number
    preco_atual: number
    saldo_atual: number
    rentabilidade_perc: number
    seta: 'up' | 'down'
}

interface AssetListProps {
    assets: Asset[]
}

export function AssetList({ assets }: AssetListProps) {
    
  // Função para formatar dinheiro
  const money = (val: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

  // Formatador de Quantidade (Inteligente para Cripto)
  const formatQtd = (val: number) => {
    return val.toLocaleString('pt-BR', { 
        maximumFractionDigits: 8, // Até 8 casas para Bitcoin
        minimumFractionDigits: 0 
    })
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
            <CardTitle className="text-zinc-400 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Meus Ativos Detalhados
            </CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow className="border-zinc-800 hover:bg-transparent">
                        <TableHead className="text-zinc-500">Ativo</TableHead>
                        <TableHead className="text-zinc-500 text-right">Qtd.</TableHead>
                        <TableHead className="text-zinc-500 text-right">Preço Médio</TableHead>
                        <TableHead className="text-zinc-500 text-right">Preço Atual</TableHead>
                        <TableHead className="text-zinc-500 text-right">Saldo</TableHead>
                        <TableHead className="text-zinc-500 text-right">Rentabilidade</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {assets.map((asset) => (
                        <TableRow key={asset.ticker} className="border-zinc-800 hover:bg-zinc-800/50">
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-bold text-white">{asset.ticker}</span>
                                    <span className="text-xs text-zinc-500">{asset.nome}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right text-zinc-300 font-mono">
                                {formatQtd(asset.qtd)}
                            </TableCell>
                            <TableCell className="text-right text-zinc-400">
                                {money(asset.preco_medio)}
                            </TableCell>
                            <TableCell className="text-right text-white font-medium">
                                {money(asset.preco_atual)}
                            </TableCell>
                            <TableCell className="text-right text-white font-bold">
                                {money(asset.saldo_atual)}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className={`flex items-center justify-end gap-1 font-bold ${
                                    asset.seta === 'up' ? 'text-emerald-500' : 'text-red-500'
                                }`}>
                                    {asset.seta === 'up' 
                                        ? <ArrowUp className="h-4 w-4" /> 
                                        : <ArrowDown className="h-4 w-4" />
                                    }
                                    {asset.rentabilidade_perc}%
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}