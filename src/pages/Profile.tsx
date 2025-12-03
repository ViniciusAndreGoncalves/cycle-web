import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/axios";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Trash2, Save } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function Profile() {
  const { user, login, logout } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // Carrega os dados atuais nos campos ao abrir a tela
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email || "",
      }));
    }
  }, [user]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Envia apenas o que foi preenchido
      const payload: any = {
        name: formData.name,
        email: formData.email,
      };
      // Só envia senha se o usuário digitou algo
      if (formData.password) {
        payload.password = formData.password;
        payload.password_confirmation = formData.password_confirmation;
      }

      const response = await api.put("/user", payload);

      // Atualiza o contexto global com o novo nome
      // Precisamos pegar o token atual do localStorage pois a API não retorna um novo token no update
      const currentToken = localStorage.getItem("auth_token") || "";
      login(response.data.user.name, currentToken);

      alert("Perfil atualizado com sucesso!");
      setFormData((prev) => ({
        ...prev,
        password: "",
        password_confirmation: "",
      })); // Limpa campos de senha
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Erro ao atualizar.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteAccount() {
    try {
      await api.delete("/user");
      logout(); // Limpa tudo e manda pra home
      alert("Sua conta foi excluída.");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir conta.");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>

        {/* CARD DE EDIÇÃO */}
        <Card className="bg-zinc-900 border-zinc-800 mb-8">
          <CardHeader>
            <CardTitle>Dados Pessoais</CardTitle>
            <CardDescription>
              Atualize suas informações e credenciais.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleUpdate}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-zinc-950 border-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-zinc-950 border-zinc-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="pass">Nova Senha (Opcional)</Label>
                  <Input
                    id="pass"
                    type="password"
                    placeholder="Deixe vazio para manter"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="bg-zinc-950 border-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conf">Confirmar Senha</Label>
                  <Input
                    id="conf"
                    type="password"
                    placeholder="Repita a nova senha"
                    value={formData.password_confirmation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password_confirmation: e.target.value,
                      })
                    }
                    className="bg-zinc-950 border-zinc-700"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t border-zinc-800 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* CARD ZONA DE PERIGO */}
        <Card className="border-red-900/50 bg-red-950/10">
          <CardHeader>
            <CardTitle className="text-red-500">Zona de Perigo</CardTitle>
            <CardDescription className="text-red-400/70">
              Essas ações são irreversíveis. Ao excluir sua conta, todos os seus
              dados de carteira serão perdidos.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-end">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir minha conta
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Você tem certeza absoluta?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-zinc-400">
                    Essa ação não pode ser desfeita. Isso excluirá
                    permanentemente sua conta e removerá seus dados dos nossos
                    servidores.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Sim, excluir conta
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>

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
      </main>
    </div>
  );
}
