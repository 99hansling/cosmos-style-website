
import React from 'react';

const CosmicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20 bg-[#050508]">
      {/* Deep Space Base Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-space-800 via-[#020205] to-black opacity-80" />

      {/* Primary Planet (Purple Void) */}
      <div className="absolute -top-[10%] -left-[10%] w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle_at_70%_70%,_var(--tw-gradient-stops))] from-cosmic-purple/30 via-purple-900/10 to-transparent blur-[100px] animate-pulse-slow" />
      
      {/* Secondary Planet (Orange Star - Collision Object) */}
      <div className="absolute top-[30%] -right-[20%] w-[90vw] h-[90vw] rounded-full bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-orange-600/20 via-red-900/10 to-transparent blur-[120px]" />

      {/* The Collision Point / Horizon Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />
      
      {/* Intense Shockwave Diagonals */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[200px] bg-gradient-to-r from-transparent via-cosmic-purple/20 to-transparent -rotate-45 blur-2xl mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[100px] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rotate-[30deg] blur-3xl mix-blend-screen" />

      {/* Star Field & Dust */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150 mix-blend-overlay" />
      
      {/* Floating Particles (Simulated) */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full blur-[2px] opacity-60 animate-bounce delay-100" />
      <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-cosmic-orange rounded-full blur-[1px] opacity-50 animate-bounce delay-700" />
    </div>
  );
};

export default CosmicBackground;
