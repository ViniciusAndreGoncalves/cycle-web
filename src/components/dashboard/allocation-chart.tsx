import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Cores "Clean" para o gráfico
const COLORS = ['#10b981', '#8b5cf6', '#f59e0b', '#3b82f6', '#ef4444'];

interface DataItem {
  name: string
  value: number
  percentage: number
  fill?: string
  [key: string]: any
}

interface AllocationChartProps {
  data: DataItem[]
}

export function AllocationChart({ data }: AllocationChartProps) {
    
  // Customização do Tooltip (o quadradinho que aparece ao passar o mouse)
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900 border border-zinc-700 p-2 rounded-md shadow-lg">
          <p className="text-zinc-100 font-bold">{payload[0].name}</p>
          <p className="text-emerald-500 text-sm">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payload[0].value)}
          </p>
          <p className="text-zinc-400 text-xs">{payload[0].payload.percentage}% da carteira</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 flex flex-col h-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-zinc-400 text-sm font-medium uppercase tracking-wider">
            Alocação por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4">
        
        {/* LADO ESQUERDO: O GRÁFICO */}
        <div className="w-full h-[250px] md:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60} // Faz o buraco do Donut
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none" // Remove bordas brancas feias
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LADO DIREITO: A LEGENDA / ESTATÍSTICAS */}
        <div className="w-full md:w-1/2 flex flex-col gap-3 justify-center">
            {data.map((item, index) => (
                <div key={index} className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                        {/* Bolinha da cor */}
                        <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.fill || COLORS[index] }} 
                        />
                        <span className="text-zinc-300 text-sm group-hover:text-white transition-colors">
                            {item.name}
                        </span>
                    </div>
                    <div className="text-right">
                        <div className="text-white font-medium text-sm">
                            {item.percentage}%
                        </div>
                        <div className="text-zinc-500 text-xs">
                             {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </CardContent>
    </Card>
  )
}