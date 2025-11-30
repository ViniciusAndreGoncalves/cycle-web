import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { api } from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrandLogo } from "@/components/brand-logo";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

// Validação (Schema)
const registerSchema = z
  .object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Digite um e-mail válido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export function Register() {
  // Hook para redirecionar após o registro bem-sucedido
  const navigate = useNavigate();

  const { login } = useAuth();

  // Estado para controlar a mensagem de feedback (Verde ou Vermelha)
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);
    setStatus(null);

    try {
      console.log("Enviando dados...");

      // 1. Envia para o Laravel
      const response = await api.post("/register", {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword, // Laravel exige esse nome exato para validar o 'confirmed'
      });

      console.log("Sucesso ao cadastrar");

      // 2. Salva o Token no LocalStorage (Crachá para entrar no sistema)
      login(response.data.user.name, response.data.token);

      // 3. Feedback visual
      setStatus({
        type: "success",
        message: `Conta criada! Bem-vindo(a), ${response.data.user.name}!`,
      });

      // Espera 2 segundos para o usuário ler a mensagem antes de voltar a Home
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      let errorMsg = "Ocorreu um erro inesperado.";

      // Se o Laravel devolver erro (ex: E-mail já existe)
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }

      // 4. MENSAGEM DE ERRO (VERMELHA)
      setStatus({ type: "error", message: errorMsg });
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <BrandLogo />

      {/* BLOCO DE FEEDBACK VISUAL*/}
      {status && (
        <div
          className={`p-3 rounded-md text-sm font-bold text-center ${
            status.type === "success"
              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
              : "bg-red-500/10 text-red-500 border border-red-500/20"
          }`}
        >
          {/* CORREÇÃO 1: Usando .message */}
          {status.message}
        </div>
      )}

      <Card className="w-full max-w-md bg-zinc-900 text-foreground border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Crie sua Conta
          </CardTitle>
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
                      <Input
                        placeholder="Seu nome"
                        {...field}
                        className="bg-zinc-950 border-zinc-800 focus-visible:ring-emerald-600"
                      />
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
                      <Input
                        placeholder="exemplo@email.com"
                        {...field}
                        className="bg-zinc-950 border-zinc-800 focus-visible:ring-emerald-600"
                      />
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
                      <Input
                      placeholder="Mínimo 6 caracteres"
                        type="password"
                        {...field}
                        className="bg-zinc-950 border-zinc-800 focus-visible:ring-emerald-600"
                      />
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
                      <Input
                        type="password"
                        {...field}
                        className="bg-zinc-950 border-zinc-800 focus-visible:ring-emerald-600"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* BLOCO DE BOTÕES */}
              <div className="flex gap-4 mt-4 justify-center">
                {/* 1. Botão CANCELAR */}
                <Link to="/" className="justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500"
                  >
                    Cancelar
                  </Button>
                </Link>

                {/* 2. Botão CADASTRAR */}
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    // 2. SE ESTIVER CARREGANDO: Mostra o Spinner girando
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cadastrando...
                    </>
                  ) : (
                    // 3. SE NÃO: Mostra o texto normal
                    "Cadastrar"
                  )}
                </Button>
              </div>
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
  );
}
