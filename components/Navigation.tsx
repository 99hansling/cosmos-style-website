
import React from 'react';
import { LayoutDashboard, Globe, Activity, Settings, Hexagon } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Market Watch', icon: LayoutDashboard },
    { id: 'assets', label: 'Asset Galaxy', icon: Globe },
    { id: 'strategy', label: 'Strategy Lab', icon: Hexagon },
    { id: 'settings', label: 'System', icon: Settings },
  ];

  return (
    <nav className="w-20 md:w-64 h-full border-r border-white/5 bg-space-900/30 backdrop-blur-xl flex flex-col relative z-20">
      <div className="p-6 mb-8">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cosmic-purple to-orange-600 shadow-[0_0_20px_rgba(255,158,0,0.6)] animate-pulse" />
        <h1 className="hidden md:block mt-4 text-2xl font-serif text-white tracking-widest leading-none">
          PLANET<br /><span className="text-cosmic-orange">QUANT</span>
        </h1>
      </div>

      <div className="flex-1 space-y-2 px-3">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                isActive 
                  ? 'bg-white/5 text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] border border-white/10' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-cosmic-orange shadow-[0_0_10px_#FF9E00]" />
              )}
              <item.icon size={20} className={isActive ? 'text-cosmic-glow' : ''} />
              <span className="hidden md:block font-mono text-xs uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-6 mt-auto">
        <div className="hidden md:flex items-center gap-3 text-xs text-gray-500 font-mono border-t border-white/5 pt-4">
          <Activity size={12} className="text-green-500" />
          <span>NET: STABLE</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
