import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/lib/axios";

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
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

// Schema simples (Apenas E-mail e Senha)
const loginSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    setStatus(null);

    try {
      console.log("Tentando logar...");

      const response = await api.post("/login", values);

      console.log("Login OK:");

      // Salva o Token e o Usuário
      login(response.data.user.name, response.data.token);

      setStatus({
        type: "success",
        message: `Bem-vindo de volta, ${response.data.user.name}!`,
      });

      // Redireciona rápido (1.5s)
      setTimeout(() => {
        navigate("/");
      }, 450);
    } catch (error: any) {
      console.error("Erro no login:", error);
      let errorMsg = "Ocorreu um erro ao entrar.";

      // Pega a mensagem do Laravel ("E-mail ou senha incorretos")
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }

      setStatus({ type: "error", message: errorMsg });
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <BrandLogo />

      {/* FEEDBACK (Fora do Card) */}
      {status && (
        <div
          className={`w-full max-w-md mb-4 p-3 rounded-md text-sm font-bold text-center border ${
            status.type === "success"
              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
              : "bg-red-500/10 text-red-500 border-red-500/20"
          }`}
        >
          {status.message}
        </div>
      )}

      <Card className="w-full max-w-md bg-zinc-900 text-foreground border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Acesse sua Conta
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Entre com suas credenciais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Senha</FormLabel>
                      {/* Link de Esqueci a senha (Visual por enquanto) */}
                      <Link
                        to="#"
                        className="text-xs text-emerald-500 hover:underline"
                      >
                        Esqueceu a senha?
                      </Link>
                    </div>
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
                      Entrando...
                    </>
                  ) : (
                    // 3. SE NÃO: Mostra o texto normal
                    "Entrar"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <div className="text-sm text-muted-foreground">
            Ainda não tem uma conta?{" "}
            <Link to="/register" className="text-emerald-500 hover:underline">
              Criar uma conta
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
