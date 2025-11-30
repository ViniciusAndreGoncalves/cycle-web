import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link } from "react-router-dom"
import { api } from "@/lib/axios"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Validação (Schema)
const registerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
})

export function Register() {
    const navigate = useNavigate() // Hook para redirecionar após o registro bem-sucedido

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      console.log("Enviando dados...", values)

      // 1. Envia para o Laravel
      const response = await api.post('/register', {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword // Laravel exige esse nome exato para validar o 'confirmed'
      })

      console.log("Sucesso ao cadastrar")

      // 2. Salva o Token no LocalStorage (Crachá para entrar no sistema)
      localStorage.setItem('auth_token', response.data.token)
      localStorage.setItem('user_name', response.data.user.name)

      // 3. Feedback visual
      alert("Conta criada com sucesso! Bem-vindo(a) " + response.data.user.name)

      // 4. Manda para a Home (Dashboard)
      navigate("/")

    } catch (error: any) {
      console.error("Erro no cadastro:", error)
      
      // Se o Laravel devolver erro (ex: E-mail já existe)
      if (error.response && error.response.data.message) {
        alert("Erro: " + error.response.data.message)
      } else {
        alert("Ocorreu um erro inesperado. Verifique se o servidor está rodando.")
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md bg-zinc-900 text-foreground border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Crie sua Conta</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Preencha seus dados para começar
          </CardDescription>
        </CardHeader>
        <CardContent>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} className="bg-zinc-950 border-zinc-800 focus-visible:ring-emerald-600" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="exemplo@email.com" {...field} className="bg-zinc-950 border-zinc-800 focus-visible:ring-emerald-600" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} className="bg-zinc-950 border-zinc-800 focus-visible:ring-emerald-600" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} className="bg-zinc-950 border-zinc-800 focus-visible:ring-emerald-600" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-4 font-bold">
                Cadastrar
              </Button>
            </form>
          </Form>

        </CardContent>
        <CardFooter className="justify-center">
          <div className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-emerald-500 hover:underline">
              Fazer Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}