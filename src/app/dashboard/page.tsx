"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";

export default function DashboardPage() {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
        setCarregando(false);
      } else {
        window.location.href = "/login";
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    await signOut(auth);
    window.location.href = "/login";
  }

  if (carregando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400 text-sm">
        Carregando painel do VIGA...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <header className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
              VIGA Operacional
            </span>
            <h1 className="text-2xl font-bold mt-1">
              Olá, {usuario?.displayName || usuario?.email}
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            Sair
          </button>
        </header>

        <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <p className="text-zinc-400 text-sm">
            Painel do gestor operacional ativo. Conexão direta com autenticação estabelecida com sucesso.
          </p>
        </section>
      </div>
    </main>
  );
}