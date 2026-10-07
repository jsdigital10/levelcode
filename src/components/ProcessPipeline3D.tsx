import React from 'react';
import { Check } from 'lucide-react';

export const BONUS_CHECKLIST = [
  'Criação de biosites profissionais do zero',
  'Personalização de identidade visual e informações',
  'Integração direta com WhatsApp e redes sociais',
  'Botões de ação e layout 100% responsivo',
  'Publicação e hospedagem online gratuita',
];

export const BonusChecklistItem: React.FC<{ label: string }> = ({ label }) => (
  <li className="flex items-center gap-3 text-sm sm:text-base text-slate-300 font-normal">
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-purple-400">
      <Check className="h-3.5 w-3.5" />
    </span>
    <span>{label}</span>
  </li>
);
