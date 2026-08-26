import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="bg-slate-950 text-slate-100">
      {/* ===== HEADER / HERO (estilo tema padrão do Next.js) ===== */}
      <header
        id="hero"
        className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden bg-black text-white font-sans"
      >
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-8 text-center">
          {/* "Wordmark" no lugar do logo Next.js */}
          <div className="text-7xl sm:text-xl font-bold tracking-tight">
            VIGA
          </div>

          <ol className="font-mono text-sm sm:text-base text-left list-decimal list-inside leading-relaxed text-white/90 space-y-1">
              PLATAFORMA DE{" "}
              <span className="bg-white/10 px-1.5 py-0.5 rounded font-mono">
                GESTÃO OPERACIONAL
              </span>        
          </ol>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <a
              href="#contact"
              className="rounded-full bg-white text-black px-6 py-3 text-sm sm:text-base font-medium hover:bg-white/90 transition-colors"
            >
              Solicitar acesso
            </a>
            <a
              href="#about"
              className="rounded-full border border-white/20 px-6 py-3 text-sm sm:text-base font-medium hover:bg-white/10 transition-colors"
            >
              Conhecer o projeto
            </a>
          </div>
        </div>
      </header>

      {/* ===== ABOUT ===== */}
      <section id="about" className="px-6 py-24 bg-slate-950">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-400">
              Sobre o Projeto
            </span>
            <h2 className="text-3xl sm:text-4xl font-black">
              Objetivo &amp; Proposta
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl space-y-3">
              <h3 className="font-bold text-lg text-white">Objetivo</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Desenvolver uma plataforma para centralizar, organizar e
                acompanhar as informações da rotina operacional,
                proporcionando maior agilidade na identificação de
                problemas, acompanhamento de atividades e tomada de
                decisões.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl space-y-3">
              <h3 className="font-bold text-lg text-white">Proposta</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                A solução permitirá registrar ocorrências, acompanhar
                pendências, definir responsáveis, monitorar indicadores e
                manter um histórico completo das ações realizadas. Também
                poderá usar automações e Inteligência Artificial para
                analisar informações, identificar padrões, gerar alertas,
                organizar prioridades e auxiliar gestores na tomada de
                decisão.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl space-y-3 md:col-span-2">
              <h3 className="font-bold text-lg text-white">
                Segurança &amp; Governança
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Todas as ações serão realizadas de forma controlada, com
                níveis de acesso, registro de atividades, rastreabilidade e
                fluxos de aprovação quando necessário. A Inteligência
                Artificial atuará como assistente, fornecendo análises e
                recomendações, enquanto decisões críticas permanecerão sob
                responsabilidade dos profissionais autorizados.
              </p>
            </div>
          </div>

          {/* Benefícios */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-center">Benefícios</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Redução do tempo de resposta às ocorrências",
                "Centralização das informações",
                "Maior controle sobre atividades e pendências",
                "Redução de processos manuais e repetitivos",
                "Aumento da rastreabilidade operacional",
                "Melhor comunicação entre equipes",
                "Apoio à tomada de decisões baseada em dados",
                "Maior visibilidade para gestores e lideranças",
              ].map((beneficio) => (
                <div
                  key={beneficio}
                  className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl text-sm text-slate-300 leading-relaxed"
                >
                  {beneficio}
                </div>
              ))}
            </div>
          </div>

          {/* Visão */}
          <div className="bg-slate-900/60 border border-blue-900/40 p-8 sm:p-10 rounded-2xl space-y-3 text-center max-w-3xl mx-auto">
            <h3 className="font-bold text-lg text-blue-400 uppercase tracking-widest text-sm">
              Visão
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A plataforma busca transformar a gestão operacional em um
              processo mais ágil, integrado, rastreável e orientado por
              dados, conectando pessoas, processos, informações e
              automações em um único ambiente. O objetivo não é substituir
              a gestão humana, mas fornecer às pessoas as informações
              certas, no momento certo, para que decisões melhores sejam
              tomadas mais rapidamente.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONTACT / FOOTER ===== */}
      <section
        id="contact"
        className="px-6 py-24 bg-slate-900 border-t border-slate-800"
      >
        <div className="max-w-xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-blue-400">
              Contato
            </span>
            <h2 className="text-3xl font-black">Fale com a gente</h2>
            <p className="text-slate-400 text-sm">
              Tem interesse no projeto ou quer saber mais? Envie uma
              mensagem.
            </p>
          </div>

          <ContactForm />
        </div>

        <footer className="max-w-5xl mx-auto mt-16 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Plataforma de Gestão Operacional.
        </footer>
      </section>
    </div>
  );
}