"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import {
  auth,
  db,
  isCargoValido,
  type Cargo,
  type UserProfile,
} from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  deleteUser,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function CadastroPage() {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState<Cargo>("supervisor");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  function traduzErroFirebase(code: string) {
    switch (code) {
      case "auth/email-already-in-use":
        return "Esse e-mail já está cadastrado.";
      case "auth/weak-password":
        return "A senha precisa ter pelo menos 6 caracteres.";
      case "auth/invalid-email":
        return "E-mail inválido.";
      default:
        return "Erro ao criar conta. Tente novamente.";
    }
  }

  async function handleCadastro(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setCarregando(true);
  setErro("");

  const emailLimpo = email.trim().toLowerCase();
  const nomeLimpo = nome.trim();

  if (!isCargoValido(cargo)) {
    setErro("Cargo inválido.");
    setCarregando(false);
    return;
  }

  console.log("[1] antes de createUser");
  let credencialCriada = null;
  try {
    credencialCriada = await createUserWithEmailAndPassword(auth, emailLimpo, senha);
    console.log("[2] Auth criado:", credencialCriada.user.uid);

    if (nomeLimpo) {
      console.log("[3] antes de updateProfile");
      await updateProfile(credencialCriada.user, { displayName: nomeLimpo });
      console.log("[4] updateProfile ok");
    }

    const perfil: UserProfile = {
      nome: nomeLimpo,
      email: emailLimpo,
      cargo,
      setor: "",
      linha: "",
      equipe: "",
      ativo: true,
    };
    
    await setDoc(doc(db, "users", credencialCriada.user.uid), {
      ...perfil,
      criadoEm: serverTimestamp(),
      atualizadoEm: serverTimestamp(),
    });
    console.log("[6] setDoc ok");

    console.log("[7] redirecionando");
    window.location.href = "/dashboard";
  } catch (err: any) {
    console.error("[ERRO]", err.code, err.message, err);
    if (credencialCriada?.user) {
      try { await deleteUser(credencialCriada.user); } catch (e) { console.warn("rollback falhou", e); }
    }
    setErro(traduzErroFirebase(err.code));
    setCarregando(false);
  }
}

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">
      <div className="w-full max-w-sm rounded-xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        <Link
          href="/login"
          className="inline-block rounded-full border border-zinc-700 bg-zinc-800 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
        >
          ← Voltar
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-white">
          Criar conta no VIGA
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Cadastre seu acesso operacional.
        </p>

        <form onSubmit={handleCadastro} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Nome completo
            </label>
            <input
              type="text"
              placeholder="Ex: Gabriel Leite"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Cargo
            </label>
            <select
              value={cargo}
              onChange={(e) => {
                const valor = e.target.value;
                if (isCargoValido(valor)) setCargo(valor);
              }}
              className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="lider">Líder</option>
              <option value="supervisor">Supervisor</option>
              <option value="gerente">Gerente operacional</option>
            </select>
          </div>

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
              placeholder="Mínimo de 6 caracteres"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              minLength={6}
              className="mt-1.5 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {erro && <p className="text-xs font-medium text-red-400">{erro}</p>}

          <button
            type="submit"
            disabled={carregando}
            className="mt-2 w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {carregando ? "Criando conta..." : "Criar conta"}
          </button>
        </form>
      </div>
    </main>
  );
}