import ContactForm from "@/components/ContactForm";
import SpaceBackground from "@/components/spaceBackground";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["800", "900"],
});


export default function Home() {
  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Fundo de estrelas fixo em toda a tela */}
      <SpaceBackground />

      {/* Conteúdo da página com z-index acima do canvas */}
      <div className="relative z-10">
        {/* ===== HEADER / HERO ===== */}
        <header
          id="hero"
          className="h-screen flex flex-col justify-center items-center px-6 text-white font-sans"
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-10 text-center">
            {/* Wordmark no estilo original */}
            <div className="text-8xl sm:text-9xl font-bold tracking-tight">
              VIGA
            </div>

            <ol className="font-mono text-lg sm:text-2xl text-left list-decimal list-inside leading-relaxed text-white/90 space-y-1">
              PLATAFORMA DE{" "}
              <span className="bg-white/10 px-2 py-1 rounded font-mono">
                GESTÃO OPERACIONAL
              </span>
            </ol>

            <div className="flex flex-col sm:flex-row items-center gap-5 pt-3">
              <a
                href="#contact"
                className="rounded-lg bg-white text-black px-7 py-3.5 text-base sm:text-lg font-medium hover:bg-green-500 hover:text-white transition-colors"
              >
                SOLICITAR ACESSO!
              </a>
              <a
                href="#about"
                className="rounded-lg border border-white/20 px-7 py-3.5 text-base sm:text-lg font-medium hover:bg-white hover:text-black transition-colors"
              >
                CONHECER O PROJETO...
              </a>
            </div>
          </div>
        </header>
        {/* ===== SEÇÃO DE IMPACTO*/}
        <section
  id="about"
  className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-24 text-white"
>
  <div className="w-full max-w-6xl mx-auto space-y-16">
    
    {/* Cabeçalho discreto */}
    <div className="space-y-2 text-left">
      <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400 font-mono">
        Pilar Operacional
      </span>
      <h3 className="text-xl sm:text-2xl font-bold text-slate-200 tracking-tight">
        Domínio Total da Operação
      </h3>
    </div>

    {/* Grid: Frases mais limpas e espaçadas + Imagem */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      
      {/* Lado Esquerdo: Frases mais sutis, menores e com bastante respiro */}
      <div className={`lg:col-span-7 space-y-10 sm:space-y-12 text-left ${poppins.className}`}>
        
        <div className="space-y-1">
          <span className="text-xs font-mono text-emerald-400/80 uppercase tracking-wider">01</span>
          <h1 className="text-xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight leading-snug select-none cursor-default hover:translate-x-2 transition-transform duration-300">
            Estatísticas operacionais
          </h1>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-mono text-blue-400/80 uppercase tracking-wider">02</span>
          <h1 className="text-xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight leading-snug select-none cursor-default hover:translate-x-2 transition-transform duration-300">
            Passagem de Turnos
          </h1>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-mono text-purple-400/80 uppercase tracking-wider">03</span>
          <h1 className="text-xl sm:text-4xl lg:text-6xl font-bold text-white tracking-tight leading-snug select-none cursor-default hover:translate-x-2 transition-transform duration-300">
            Tomada de decisão assertiva
          </h1>
        </div>

      </div>

      {/* Lado Direito: Imagem corporativa proporcional */}
      <div className="lg:col-span-5 flex justify-center items-center">
        <a
          href="#"
          aria-label="Ambiente Corporativo VIGA"
          className="group flex w-full max-w-[420px] aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-neutral-900/40 backdrop-blur-2xl transition-all duration-300 hover:border-white/40 shadow-2xl"
        >
          <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/corporate-desk.jpeg`}
          alt="Ambiente Corporativo VIGA"
          className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
        />
        </a>
      </div>

    </div>
  </div>
</section>

        {/* ===== CONTACT / FOOTER ===== */}
        <section
          id="contact"
          className="px-6 py-24 bg-slate-950/80 backdrop-blur-sm border-t border-slate-800"
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
    </div>
  );
}