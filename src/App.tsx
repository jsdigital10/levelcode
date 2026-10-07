import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, ShieldCheck } from 'lucide-react';
import { ParticleBackground } from './components/ParticleBackground';
import { VimeoHeroPlayer } from './components/VimeoHeroPlayer';
import { ProjectCard, REAL_PROJECTS } from './components/ProjectMockups';
import { LEARNING_MODULES } from './components/LearningIcons3D';
import { BONUS_CHECKLIST, BonusChecklistItem } from './components/ProcessPipeline3D';

const CHECKOUT_URL = 'https://pay.kiwify.com.br/iV9Od27';
const BIOSITE_REAL_URL =
  'https://ivancaixetaadv.vercel.app/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAUyvWpleHRuA2FlbQIxMQBwZG9mAmZkaWQWUP0jNBm3XvqdD_2lwd2GmB_q43V9OXNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABp-FHxWz2BV__QKyzyu7DC5msbcy4GRbxrvJ7Mh0xSoWOGHjZzAFDcBbrlsyM_aem_nwq28rIBOLkOgV0XlfHjgA';

const BENEFITS = [
  {
    index: '01',
    title: 'Do zero à prática',
    description:
      'Você não precisa ser programador. Aprenda um fluxo claro utilizando inteligência artificial para estruturar sistemas reais.',
  },
  {
    index: '02',
    title: 'Sistemas e páginas úteis',
    description:
      'Desenvolva ferramentas de gestão, sistemas de atendimento, controle de orçamentos e biosites profissionais.',
  },
  {
    index: '03',
    title: 'Publicação online gratuita',
    description:
      'Saiba exatamente como hospedar e publicar seus projetos na internet sem custos iniciais de servidor.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'Preciso saber programar?',
    answer:
      'Não. O conteúdo foi estruturado para apresentar o processo de maneira prática e descomplicada, inclusive para quem está começando.',
  },
  {
    question: 'Vou aprender a criar sistemas?',
    answer:
      'Sim. O curso utiliza projetos práticos para mostrar o processo de criação de sistemas web.',
  },
  {
    question: 'Vou aprender a criar biosites?',
    answer: 'Sim. A criação de biosites profissionais faz parte do conteúdo bônus.',
  },
  {
    question: 'Vou aprender a hospedar meus projetos?',
    answer: 'Sim. Você verá também como colocar seus projetos online.',
  },
  {
    question: 'Preciso pagar hospedagem para começar?',
    answer:
      'O curso apresenta alternativas que permitem colocar projetos online utilizando opções gratuitas disponíveis nas plataformas utilizadas.',
  },
];

export default function App() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showMobileFloatingBar, setShowMobileFloatingBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowMobileFloatingBar(window.scrollY > 680);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#050507] text-[#F8FAFC] overflow-x-hidden">
      <ParticleBackground />

      {/* ==================================================
          TOP NAVIGATION (3-Zone Contract, Minimal & Clean)
      ================================================== */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#050507]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <a
            href="#topo"
            className="font-display text-base sm:text-lg font-semibold tracking-wider text-white hover:text-purple-300 transition-colors"
          >
            LEVELCODE
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-normal text-slate-400">
            <a href="#beneficios" className="hover:text-white transition-colors whitespace-nowrap">
              Proposta
            </a>
            <a href="#projetos" className="hover:text-white transition-colors whitespace-nowrap">
              Projetos Reais
            </a>
            <a href="#conteudo" className="hover:text-white transition-colors whitespace-nowrap">
              Conteúdo
            </a>
            <a href="#faq" className="hover:text-white transition-colors whitespace-nowrap">
              Dúvidas
            </a>
          </nav>

          <div className="flex items-center">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.07] px-3.5 py-2 text-xs sm:text-sm font-medium text-white ring-1 ring-white/15 transition-all duration-200 hover:bg-purple-600 hover:ring-purple-400 whitespace-nowrap shrink-0"
            >
              <span>Acessar agora</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* ==================================================
            1. HERO LIMPO + 2. VÍDEO GRANDE INTEGRADO
        ================================================== */}
        <section
          id="topo"
          className="mx-auto w-full max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs sm:text-sm font-mono font-normal tracking-[0.2em] text-purple-300/90 uppercase">
              LevelCode · Do Zero ao Sistema
            </p>

            <h1
              className="mt-4 font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.18]"
              style={{ textWrap: 'balance' }}
            >
              Aprenda a transformar ideias em{' '}
              <span className="bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-300 bg-clip-text text-transparent font-semibold">
                sistemas web, páginas e projetos digitais
              </span>{' '}
              na prática.
            </h1>

            <p
              className="mx-auto mt-4 max-w-2xl text-sm sm:text-base md:text-lg font-normal text-slate-400 leading-relaxed"
              style={{ textWrap: 'balance' }}
            >
              Um método direto e descomplicado para criar suas próprias ferramentas, sistemas de
              gestão e biosites profissionais — mesmo começando do absoluto zero.
            </p>
          </div>

          {/* Large, Proportional, Seamlessly Integrated Main Video */}
          <div className="mt-10 sm:mt-12 w-full">
            <VimeoHeroPlayer />
          </div>

          {/* Primary Action Below Video */}
          <div className="mt-8 sm:mt-10 flex flex-col items-center text-center">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-purple-600 px-7 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base font-medium text-white shadow-[0_10px_35px_-5px_rgba(139,92,246,0.5)] ring-1 ring-purple-400/40 transition-all duration-200 hover:bg-purple-500 hover:shadow-[0_12px_45px_-5px_rgba(139,92,246,0.65)] whitespace-nowrap"
            >
              <span>Quero começar agora</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* ==================================================
            3. BENEFÍCIOS (Clean Architectural Strip)
        ================================================== */}
        <section
          id="beneficios"
          className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 border-t border-white/[0.06]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {BENEFITS.map((item) => (
              <div key={item.index} className="flex flex-col">
                <span className="font-mono text-xs text-purple-400/90">{item.index}</span>
                <h2 className="mt-2 font-display text-lg sm:text-xl font-medium text-white tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base font-normal text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================
            4. PROJETOS REAIS COM PREVIEW
        ================================================== */}
        <section
          id="projetos"
          className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24 border-t border-white/[0.06]"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-mono tracking-[0.18em] text-purple-400 uppercase">
              Vitrine Real
            </p>
            <h2
              className="mt-2.5 font-display text-xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              PROJETOS QUE VOCÊ VAI APRENDER A CRIAR
            </h2>
            <p className="mt-3 text-sm sm:text-base font-normal text-slate-400 leading-relaxed">
              Visualize os sistemas funcionando abaixo ou clique em qualquer projeto para abrir e
              testar diretamente no seu navegador.
            </p>
          </div>

          {/* Desktop: 2 projects per row | Mobile: 1 project per row */}
          <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {REAL_PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* ==================================================
            5. CONTEÚDO / ENTREGA + BÔNUS INCLUSO
        ================================================== */}
        <section
          id="conteudo"
          className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24 border-t border-white/[0.06]"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-mono tracking-[0.18em] text-purple-400 uppercase">
              Estrutura do Curso
            </p>
            <h2
              className="mt-2.5 font-display text-xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              O que você vai dominar na prática
            </h2>
            <p className="mt-3 text-sm sm:text-base font-normal text-slate-400 leading-relaxed">
              Etapas diretas ao ponto para você sair da ideia inicial até o sistema publicado.
            </p>
          </div>

          {/* 6 Clean Modules Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {LEARNING_MODULES.map((mod) => (
              <div
                key={mod.number}
                className="rounded-2xl bg-[#0A0A10] p-6 ring-1 ring-white/[0.07] transition-colors hover:ring-white/[0.15]"
              >
                <span className="font-mono text-xs text-purple-400">{mod.number}</span>
                <h3 className="mt-2.5 font-display text-base sm:text-lg font-medium text-white">
                  {mod.title}
                </h3>
                <p className="mt-2 text-sm font-normal text-slate-400 leading-relaxed">
                  {mod.description}
                </p>
              </div>
            ))}
          </div>

          {/* Clean Bonus Section Integrated Naturally */}
          <div className="mt-10 sm:mt-12 rounded-2xl bg-gradient-to-br from-[#0F0C1B] via-[#0A0A11] to-[#08080D] p-6 sm:p-9 ring-1 ring-purple-500/25">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="font-mono text-xs text-purple-300 tracking-wider uppercase">
                  Bônus Incluso no Acesso
                </span>
                <h3 className="mt-2 font-display text-xl sm:text-2xl font-medium text-white tracking-tight">
                  Criação de Biosites Profissionais
                </h3>
                <p className="mt-2.5 text-sm sm:text-base font-normal text-slate-400 leading-relaxed">
                  Além dos sistemas web, você aprende a construir páginas de apresentação de alto
                  padrão para profissionais, empresas e clientes.
                </p>

                <div className="mt-5">
                  <a
                    href={BIOSITE_REAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-purple-300 hover:text-white transition-colors"
                  >
                    <span>Ver exemplo real de Biosite (Ivan Caixeta Advocacia)</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <ul className="space-y-2.5">
                  {BONUS_CHECKLIST.map((item) => (
                    <BonusChecklistItem key={item} label={item} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            6. OFERTA & CTA FINAL
        ================================================== */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24 border-t border-white/[0.06]">
          <div className="relative overflow-hidden rounded-3xl bg-[#090910] px-6 py-14 sm:px-12 sm:py-20 text-center ring-1 ring-white/[0.09]">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[600px] rounded-full opacity-35 blur-[110px]"
              style={{
                background:
                  'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(79, 70, 229, 0.2) 60%, transparent 100%)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <p className="font-mono text-xs tracking-[0.2em] text-purple-300 uppercase">
                Acesso Imediato
              </p>

              <h2
                className="mt-3 font-display text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.15]"
                style={{ textWrap: 'balance' }}
              >
                Tire suas ideias do papel e construa seus próprios sistemas.
              </h2>

              <p
                className="mx-auto mt-4 max-w-xl text-sm sm:text-base font-normal text-slate-400 leading-relaxed"
                style={{ textWrap: 'balance' }}
              >
                Garanta seu acesso ao LevelCode e aprenda passo a passo todo o processo de criação e
                publicação.
              </p>

              <div className="mt-8">
                <a
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-purple-600 px-8 py-4 sm:px-10 sm:py-4.5 text-sm sm:text-base font-medium text-white shadow-[0_10px_40px_-5px_rgba(139,92,246,0.55)] ring-1 ring-purple-400/50 transition-all duration-200 hover:bg-purple-500 whitespace-nowrap"
                >
                  <span>Acessar o LevelCode agora</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5 text-purple-400/80 shrink-0" />
                <span>Ambiente seguro de inscrição via Kiwify</span>
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================
            7. FAQ (Dúvidas Frequentes)
        ================================================== */}
        <section
          id="faq"
          className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20 border-t border-white/[0.06]"
        >
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-white">
              Perguntas frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={item.question}
                  className={`rounded-xl transition-colors duration-200 ${
                    isOpen
                      ? 'bg-[#0C0B14] ring-1 ring-purple-500/35'
                      : 'bg-[#09090F] ring-1 ring-white/[0.07] hover:ring-white/[0.14]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm sm:text-base font-medium text-white">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-purple-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 text-sm font-normal text-slate-400 leading-relaxed border-t border-white/[0.05] pt-3">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* QUIET FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-[#050507] py-8 pb-20 md:pb-8">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 text-xs text-slate-500">
          <div className="font-display font-medium tracking-wider text-slate-300">
            LEVELCODE · DO ZERO AO SISTEMA
          </div>
          <div>© {new Date().getFullYear()} LevelCode. Todos os direitos reservados.</div>
        </div>
      </footer>

      {/* DISCREET MOBILE FLOATING BAR */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 md:hidden transition-all duration-200 ${
          showMobileFloatingBar
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-[#07070C]/95 px-4 py-2.5 backdrop-blur-xl">
          <span className="font-display text-xs font-medium tracking-wider text-white">
            LEVELCODE
          </span>

          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-purple-600 px-3.5 py-2 text-xs font-medium text-white whitespace-nowrap"
          >
            <span>Começar agora</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
