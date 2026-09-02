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
<section id="contact" className="relative w-full border-t border-slate-800">
  <div className="lg:flex lg:h-screen">
    {/* Esquerda — marca */}
    <div className="lg:w-[55%] bg-[#080B10] flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-20 lg:py-0">
      <div className="flex items-center gap-3 text-white mb-10">
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className="shrink-0"
        >
          <path d="M6 4h12M6 20h12M12 4v16" strokeLinecap="round" />
        </svg>
        <span className={`text-2xl tracking-tight ${poppins.className}`}>VIGA</span>
      </div>

      <h2
        className={`max-w-xl text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-white ${poppins.className}`}
      >
        Menos informações perdidas. Decisões acertivas. Operação sob controle.
      </h2>

      <p className="max-w-md mt-6 text-slate-400 text-base sm:text-lg leading-relaxed">
        A VIGA organiza a rotina de quem toca a produção e de quem responde por
        ela — feito para lideres, supervisores e gerentes operacionais
        que decidiram parar de gerenciar tudo pelo WhatsApp.
      </p>
    </div>

    {/* Direita — formulário */}
    <div className="lg:w-[45%] bg-[#F4F5F7] flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-20 lg:py-0">
      <div className="max-w-md w-full mx-auto lg:mx-0">
        <h3 className="text-2xl font-bold text-slate-900 mb-1">
          Fale com a gente
        </h3>
        <p className="text-slate-500 text-sm mb-10">
          Tem interesse no projeto ou quer saber mais? Envie uma mensagem.
        </p>
        <ContactForm />
      </div>
    </div>
  </div>

  <footer className="px-6 py-6 border-t border-slate-800 bg-[#080B10] text-center text-xs text-slate-500">
    © {new Date().getFullYear()} Plataforma de Gestão Operacional.
  </footer>
</section>
      </div>
    </div>
  );
}