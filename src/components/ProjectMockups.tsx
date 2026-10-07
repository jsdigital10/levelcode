import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Globe, MousePointerClick } from 'lucide-react';

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  url: string;
  displayHost: string;
  description: string;
}

export const REAL_PROJECTS: ProjectItem[] = [
  {
    id: 'agendacell',
    name: 'Agenda Cell',
    category: 'Sistema Web',
    url: 'https://agendacell.vercel.app',
    displayHost: 'agendacell.vercel.app',
    description: 'Sistema prático desenvolvido para organizar atendimentos e processos do dia a dia.',
  },
  {
    id: 'gestaocar',
    name: 'Gestão Car',
    category: 'Sistema de Gestão',
    url: 'https://gestaocar.vercel.app',
    displayHost: 'gestaocar.vercel.app',
    description:
      'Aplicação de gestão para controle simples de corridas, ganhos e despesas de motoristas.',
  },
  {
    id: 'chatclick',
    name: 'ChatClick',
    category: 'Experiência Interativa',
    url: 'https://chatclickofc.vercel.app',
    displayHost: 'chatclickofc.vercel.app',
    description:
      'Projeto web interativo voltado para atendimento dinâmico e apresentação moderna.',
  },
  {
    id: 'ivancaixeta',
    name: 'Ivan Caixeta Advocacia',
    category: 'Biosite Profissional',
    url: 'https://ivancaixetaadv.vercel.app/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAdGRleAUyvWpleHRuA2FlbQIxMQBwZG9mAmZkaWQWUP0jNBm3XvqdD_2lwd2GmB_q43V9OXNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABp-FHxWz2BV__QKyzyu7DC5msbcy4GRbxrvJ7Mh0xSoWOGHjZzAFDcBbrlsyM_aem_nwq28rIBOLkOgV0XlfHjgA',
    displayHost: 'ivancaixetaadv.vercel.app',
    description:
      'Biosite profissional estruturado para apresentar serviços, autoridade e canais diretos de contato.',
  },
];

export const ProjectCard: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [interactiveMode, setInteractiveMode] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoadIframe(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: '320px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={containerRef}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#0A0A0F] ring-1 ring-white/[0.08] transition-all duration-300 hover:ring-purple-500/40"
    >
      {/* Discreet Browser Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] bg-[#0D0D14] px-3.5 py-2.5">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 truncate rounded-md bg-black/40 px-2.5 py-1 text-[11px] font-mono text-slate-400 hover:text-slate-200 transition-colors"
          title={`Abrir ${project.url}`}
        >
          <Globe className="h-3 w-3 text-purple-400/80 shrink-0" />
          <span className="truncate">{project.displayHost}</span>
        </a>

        <button
          type="button"
          onClick={() => setInteractiveMode((prev) => !prev)}
          className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors cursor-pointer shrink-0 ${
            interactiveMode
              ? 'bg-purple-500/20 text-purple-300 ring-1 ring-purple-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Alternar navegação direta dentro do preview"
        >
          <MousePointerClick className="h-3 w-3" />
          <span className="hidden sm:inline">
            {interactiveMode ? 'Navegando' : 'Interagir'}
          </span>
        </button>
      </div>

      {/* Real Site Preview Window */}
      <div className="relative h-[340px] sm:h-[400px] w-full overflow-hidden bg-[#07070B]">
        {!iframeLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2.5 bg-[#07070B] p-6 text-center">
            <div className="h-6 w-6 rounded-full border-2 border-purple-500/25 border-t-purple-400 animate-spin" />
            <span className="text-xs text-slate-400 font-normal">
              Carregando preview real de {project.displayHost}...
            </span>
          </div>
        )}

        {shouldLoadIframe && (
          <iframe
            src={project.url}
            title={`Preview real: ${project.name}`}
            className="h-full w-full border-0 bg-white"
            loading="lazy"
            onLoad={() => setIframeLoaded(true)}
          />
        )}

        {/* Clickable Overlay that opens the exact real URL in a new tab (unless user toggled interactive scroll mode) */}
        {!interactiveMode && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir projeto ${project.name} em nova aba`}
            className="absolute inset-0 z-20 flex items-end justify-end bg-gradient-to-t from-black/55 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-black/80 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur-md">
              <span>ABRIR PROJETO</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-purple-300" />
            </span>
          </a>
        )}
      </div>

      {/* Clean Project Footer Info & Direct Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/[0.06] p-5 sm:p-6">
        <div className="min-w-0">
          <div className="text-xs font-mono text-purple-400/90">{project.category}</div>
          <h3 className="mt-1 font-display text-lg sm:text-xl font-medium text-white tracking-tight truncate">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-300 transition-colors"
            >
              {project.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-slate-400 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/[0.05] px-4 py-2.5 text-xs font-medium text-slate-200 ring-1 ring-white/10 transition-all duration-200 hover:bg-purple-600 hover:text-white hover:ring-purple-400 whitespace-nowrap shrink-0"
        >
          <span>ABRIR PROJETO ↗</span>
        </a>
      </div>
    </article>
  );
};
