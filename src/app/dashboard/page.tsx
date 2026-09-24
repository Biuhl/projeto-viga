"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";

const producaoSemanal = [
  { dia: "Seg", producao: 1240 },
  { dia: "Ter", producao: 1380 },
  { dia: "Qua", producao: 1190 },
  { dia: "Qui", producao: 1520 },
  { dia: "Sex", producao: 1410 },
  { dia: "Sáb", producao: 980 },
  { dia: "Dom", producao: 720 },
];

const setores = [
  { nome: "Sólidos", producao: 4820, percentual: 86 },
  { nome: "Sachê", producao: 3610, percentual: 74 },
  { nome: "Cápsulas", producao: 2980, percentual: 68 },
  { nome: "Embalagem", producao: 4210, percentual: 81 },
];

const ocorrencias = [
  {
    horario: "14:32",
    setor: "Sólidos",
    tipo: "Parada",
    descricao: "Ajuste de equipamento",
    status: "Em análise",
  },
  {
    horario: "13:18",
    setor: "Embalagem",
    tipo: "Produção",
    descricao: "Meta diária atingida",
    status: "Concluído",
  },
  {
    horario: "11:47",
    setor: "Cápsulas",
    tipo: "Qualidade",
    descricao: "Inspeção de rotina",
    status: "Concluído",
  },
  {
    horario: "10:21",
    setor: "Sachê",
    tipo: "Parada",
    descricao: "Troca de formato",
    status: "Concluído",
  },
];

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

  const maiorProducao = Math.max(
    ...producaoSemanal.map((item) => item.producao)
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl p-6 md:p-8">

        {/* HEADER */}
        <header className="mb-8 flex flex-col gap-4 border-b border-zinc-800 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
              VIGA Operacional
            </span>

            <h1 className="mt-2 text-2xl font-bold">
              Olá, {usuario?.displayName || usuario?.email}
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Visão geral da operação
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            Sair
          </button>
        </header>

        {/* AVISO DEMONSTRAÇÃO */}
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-blue-900/50 bg-blue-950/20 px-4 py-3">
          <div className="h-2 w-2 rounded-full bg-blue-500" />

          <p className="text-xs text-blue-300">
            Ambiente de demonstração • Dados operacionais simulados
          </p>
        </div>

        {/* CARDS */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs text-zinc-500">
              Produção semanal
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              9.420
            </h2>

            <p className="mt-2 text-xs text-emerald-400">
              ↑ 8,4% em relação à semana anterior
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs text-zinc-500">
              Meta semanal
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              11.000
            </h2>

            <p className="mt-2 text-xs text-blue-400">
              85,6% atingido
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs text-zinc-500">
              Eficiência operacional
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              82,4%
            </h2>

            <p className="mt-2 text-xs text-emerald-400">
              ↑ 3,1% este período
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs text-zinc-500">
              Ocorrências
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              12
            </h2>

            <p className="mt-2 text-xs text-yellow-400">
              3 em análise
            </p>
          </div>

        </section>

        {/* AÇÕES */}
        <section className="mt-6">

          <div className="mb-3">
            <h2 className="text-sm font-semibold">
              Registrar dados
            </h2>

            <p className="text-xs text-zinc-500">
              Atualize as informações operacionais da planta
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <button className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-left transition hover:border-blue-600 hover:bg-zinc-900/80">
              <div className="mb-3 text-xl">＋</div>

              <p className="text-sm font-semibold">
                Registrar produção
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Quantidade, lote e setor
              </p>
            </button>

            <button className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-left transition hover:border-blue-600 hover:bg-zinc-900/80">
              <div className="mb-3 text-xl">⚠</div>

              <p className="text-sm font-semibold">
                Registrar ocorrência
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Paradas e eventos operacionais
              </p>
            </button>

            <button className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-left transition hover:border-blue-600 hover:bg-zinc-900/80">
              <div className="mb-3 text-xl">◷</div>

              <p className="text-sm font-semibold">
                Registrar parada
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Tempo e motivo da parada
              </p>
            </button>

            <button className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 text-left transition hover:border-blue-600 hover:bg-zinc-900/80">
              <div className="mb-3 text-xl">▤</div>

              <p className="text-sm font-semibold">
                Gerar relatório
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Consolidado operacional
              </p>
            </button>

          </div>
        </section>

        {/* GRÁFICO */}
        <section className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6">

          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">

            <div>
              <h2 className="text-sm font-semibold">
                Produção semanal
              </h2>

              <p className="mt-1 text-xs text-zinc-500">
                Volume produzido por dia
              </p>
            </div>

            <span className="text-xs text-zinc-500">
              Últimos 7 dias
            </span>

          </div>

          <div className="mt-8 flex h-64 items-end justify-between gap-3">

            {producaoSemanal.map((item) => {

              const altura =
                (item.producao / maiorProducao) * 100;

              return (
                <div
                  key={item.dia}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                >

                  <span className="text-[10px] text-zinc-500">
                    {item.producao}
                  </span>

                  <div className="flex h-52 w-full items-end">

                    <div
                      className="w-full rounded-t-md bg-blue-600 transition hover:bg-blue-500"
                      style={{
                        height: `${altura}%`,
                      }}
                    />

                  </div>

                  <span className="text-xs text-zinc-500">
                    {item.dia}
                  </span>

                </div>
              );
            })}

          </div>

        </section>

        {/* SETORES + OCORRÊNCIAS */}
        <section className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* SETORES */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

            <h2 className="text-sm font-semibold">
              Produção por setor
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              Desempenho operacional
            </p>

            <div className="mt-6 space-y-5">

              {setores.map((setor) => (

                <div key={setor.nome}>

                  <div className="mb-2 flex justify-between text-xs">

                    <span className="text-zinc-300">
                      {setor.nome}
                    </span>

                    <span className="text-zinc-500">
                      {setor.producao} un.
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-zinc-800">

                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{
                        width: `${setor.percentual}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* OCORRÊNCIAS */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-sm font-semibold">
                  Últimas ocorrências
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                  Eventos registrados na operação
                </p>
              </div>

              <span className="text-xs text-blue-500">
                Ver todas
              </span>

            </div>

            <div className="mt-5 divide-y divide-zinc-800">

              {ocorrencias.map((ocorrencia, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between py-4"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-xs">
                      {ocorrencia.tipo === "Parada"
                        ? "!"
                        : ocorrencia.tipo === "Qualidade"
                        ? "✓"
                        : "•"}
                    </div>

                    <div>

                      <p className="text-xs font-medium text-zinc-200">
                        {ocorrencia.descricao}
                      </p>

                      <p className="mt-1 text-[10px] text-zinc-500">
                        {ocorrencia.setor} • {ocorrencia.horario}
                      </p>

                    </div>

                  </div>

                  <span
                    className={`text-[10px] ${
                      ocorrencia.status === "Concluído"
                        ? "text-emerald-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {ocorrencia.status}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}