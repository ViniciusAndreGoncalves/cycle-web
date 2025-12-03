import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { api } from "@/lib/axios"
import { Plus, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Schema
const formSchema = z.object({
  ticker: z.string().min(3, "Digite o código do ativo (Ex: PETR4)"),
  tipo: z.enum(["Compra", "Venda"]),
  quantidade: z.coerce.number().positive("A quantidade deve ser positiva"),
  preco_unitario: z.coerce.number().nonnegative("O preço não pode ser negativo"),
  data_movimentacao: z.string().min(1, "Data é obrigatória"),
})

interface AddTransactionModalProps {
  onSuccess: () => void 
}

export function AddTransactionModal({ onSuccess }: AddTransactionModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  // CORREÇÃO: Removi o <z.infer<...>> daqui.
  // Deixamos o 'zodResolver' definir os tipos automaticamente.
  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticker: "",
      tipo: "Compra", // TypeScript agora entende que isso é uma string válida do enum
      quantidade: 0,
      preco_unitario: 0,
      data_movimentacao: new Date().toISOString().split('T')[0],
    },
  })

  // Usamos o tipo 'FormValues' aqui para garantir a segurança no envio
  async function onSubmit(values: any) {
    setLoading(true)
    setErrorMsg("")

    // --- VALIDAÇÃO MANUAL DE SEGURANÇA ---
    const qtd = Number(values.quantidade);
    const preco = Number(values.preco_unitario);

    if (qtd <= 0) {
        setErrorMsg("A quantidade deve ser maior que zero.");
        return;
    }
    if (preco < 0) {
        setErrorMsg("O preço não pode ser negativo.");
        return;
    }

    try {
      // Pequeno ajuste: converter para número explicitamente caso o coerce falhe visualmente
      await api.post('/movimentacoes', {
        ...values,
        quantidade: Number(values.quantidade),
        preco_unitario: Number(values.preco_unitario),
      })
      
      setOpen(false)
      form.reset()
      onSuccess()

    } catch (error: any) {
      console.error(error)
      setErrorMsg(error.response?.data?.message || "Erro ao salvar. Verifique o código do ativo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
          <Plus className="h-4 w-4" />
          Nova Transação
        </Button>
      </DialogTrigger>
      
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Transação</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            
            <FormField
              control={form.control}
              name="ticker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código do Ativo</FormLabel>
                  <FormControl>
                    <Input 
                        placeholder="Ex: PETR4, BTC" 
                        {...field} 
                        className="bg-zinc-950 border-zinc-700 uppercase"
                        // Força uppercase ao digitar
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="bg-zinc-950 border-zinc-700">
                            <SelectValue />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                        <SelectItem value="Compra">Compra</SelectItem>
                        <SelectItem value="Venda">Venda</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="data_movimentacao"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                        <Input type="date" {...field} className="bg-zinc-950 border-zinc-700 text-white" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* QUANTIDADE */}
                <FormField
                control={form.control}
                name="quantidade"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                        <Input 
                            type="number" 
                            step="any" 
                            {...field} // Espalha as props (onBlur, ref, etc)
                            
                            // CORREÇÃO 1: Garante que o valor nunca é unknown
                            value={field.value ?? ''} 
                            
                            // CORREÇÃO 2: Garante que o onChange receba o valor correto
                            onChange={(e) => field.onChange(e.target.value)}
                            
                            className="bg-zinc-950 border-zinc-700" 
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                {/* PREÇO UNITÁRIO */}
                <FormField
                control={form.control}
                name="preco_unitario"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Preço Unitário (R$)</FormLabel>
                    <FormControl>
                        <Input 
                            type="number" 
                            step="0.01" 
                            {...field} // Espalha as props
                            
                            // CORREÇÃO 1: Fallback para string vazia se for null/undefined/unknown
                            value={field.value ?? ''} 
                            
                            // CORREÇÃO 2: Passa o valor cru (o Zod vai converter pra número depois)
                            onChange={(e) => field.onChange(e.target.value)}
                            
                            className="bg-zinc-950 border-zinc-700" 
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            {errorMsg && (
                <div className="text-red-400 text-sm bg-red-900/20 p-2 rounded border border-red-900/50 text-center">
                    {errorMsg}
                </div>
            )}

            <DialogFooter>
              <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 w-full mt-4">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}