import React from 'react';

export const ParticleBackground: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle Top Purple-Indigo Ambient Glow */}
      <div
        className="absolute -top-60 left-1/2 -translate-x-1/2 h-[540px] w-[1000px] rounded-full opacity-20 blur-[140px]"
        style={{
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, rgba(79, 70, 229, 0.2) 50%, transparent 100%)',
        }}
      />
      {/* Ultra-discreet secondary blue/violet depth */}
      <div
        className="absolute top-[35%] right-[-15%] h-[420px] w-[420px] rounded-full opacity-10 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};
