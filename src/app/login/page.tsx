"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  function traduzErroFirebase(code: string) {
    switch (code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "E-mail ou senha incorretos.";
      case "auth/invalid-email":
        return "E-mail inválido.";
      case "auth/too-many-requests":
        return "Muitas tentativas. Tente novamente em instantes.";
      default:
        return "Erro ao entrar. Tente novamente.";
    }
  }

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCarregando(true);
    setErro("");

    const emailLimpo = email.trim().toLowerCase();

    try {
      await signInWithEmailAndPassword(auth, emailLimpo, senha);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setErro(traduzErroFirebase(err.code));
      setCarregando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <div className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-white">Entrar no VIGA</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Acesse seu painel operacional.
        </p>

        <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              E-mail
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {erro && <p className="text-xs font-medium text-red-400">{erro}</p>}

          <button
            type="submit"
            disabled={carregando}
            className="mt-2 w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>

          <Link
            href="/cadastro"
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-center text-sm font-semibold text-zinc-200 transition hover:bg-zinc-700 hover:text-white"
          >
            Criar conta
          </Link>
        </form>
      </div>
    </main>
  );
}