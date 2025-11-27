import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

export function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <Card className="w-full max-w-sm bg-zinc-900 text-zinc-50 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Acessar Sistema</CardTitle>
          <CardDescription className="text-center text-zinc-400">
            Entre com seu e-mail e senha para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="exemplo@email.com" 
              className="bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-emerald-600"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input 
              id="password" 
              type="password" 
              className="bg-zinc-950 border-zinc-800 text-white focus-visible:ring-emerald-600"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full bg-white text-black hover:bg-zinc-200">
            Entrar
          </Button>
          <div className="text-center text-sm text-zinc-400">
            Não tem conta?{" "}
            <Link to="/register" className="text-emerald-500 hover:underline">
              Criar agora
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}