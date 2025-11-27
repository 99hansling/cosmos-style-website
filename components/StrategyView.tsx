
import React from 'react';
import { Hexagon, Zap, GitBranch, ShieldAlert } from 'lucide-react';

const StrategyView: React.FC = () => {
  return (
    <div className="p-8 h-full overflow-y-auto custom-scrollbar">
      <div className="mb-10">
        <h2 className="text-4xl font-serif text-white tracking-widest mb-2">STRATEGY <span className="text-cosmic-glow">LAB</span></h2>
        <p className="text-gray-400 font-mono text-sm">Configure algorithmic triggers and execution logic.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Logic Flow Column */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Node 1: Signal Generation */}
            <div className="bg-space-800/60 backdrop-blur border border-white/10 rounded-xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                            <Zap size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-wide">Signal Generator</h3>
                    </div>
                    <span className="text-xs font-mono text-green-400 px-2 py-1 bg-green-900/30 rounded border border-green-500/30">ACTIVE</span>
                </div>
                
                <div className="space-y-4">
                     <div className="flex items-center gap-4 bg-space-900/50 p-3 rounded border border-white/5">
                        <span className="text-xs text-gray-400 font-mono w-16">INPUT A</span>
                        <div className="flex-1 h-1 bg-gray-700 rounded overflow-hidden">
                            <div className="h-full w-3/4 bg-green-500/50" />
                        </div>
                        <span className="text-xs text-white font-mono">MA(5) > MA(20)</span>
                     </div>
                     <div className="flex items-center gap-4 bg-space-900/50 p-3 rounded border border-white/5">
                        <span className="text-xs text-gray-400 font-mono w-16">INPUT B</span>
                         <div className="flex-1 h-1 bg-gray-700 rounded overflow-hidden">
                            <div className="h-full w-1/2 bg-yellow-500/50" />
                        </div>
                        <span className="text-xs text-white font-mono">RSI &lt; 30</span>
                     </div>
                </div>
            </div>

            {/* Connecting Line */}
            <div className="flex justify-center -my-2">
                <div className="w-0.5 h-8 bg-gradient-to-b from-green-500/50 to-blue-500/50" />
            </div>

            {/* Node 2: Filter Logic */}
            <div className="bg-space-800/60 backdrop-blur border border-white/10 rounded-xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                         <div className="p-2 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            <GitBranch size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-wide">Trend Filter</h3>
                    </div>
                    <span className="text-xs font-mono text-blue-400 px-2 py-1 bg-blue-900/30 rounded border border-blue-500/30">PASS-THROUGH</span>
                </div>
                <div className="text-sm text-gray-400 font-mono p-3 bg-space-900/50 rounded border border-white/5">
                    IF (Volume_24h > Threshold_Min) AND (Volatility &lt; Max_Safe) THEN PASS
                </div>
            </div>

             {/* Connecting Line */}
            <div className="flex justify-center -my-2">
                <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500/50 to-red-500/50" />
            </div>

             {/* Node 3: Risk Management */}
             <div className="bg-space-800/60 backdrop-blur border border-white/10 rounded-xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500 shadow-[0_0_10px_#ef4444]" />
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded bg-red-500/10 text-red-400 border border-red-500/20">
                            <ShieldAlert size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-wide">Risk Guard</h3>
                    </div>
                    <span className="text-xs font-mono text-red-400 px-2 py-1 bg-red-900/30 rounded border border-red-500/30">MONITORING</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-space-900/50 p-3 rounded border border-white/5 text-center">
                        <p className="text-xs text-gray-500 uppercase">Stop Loss</p>
                        <p className="text-xl font-mono text-white">1.5%</p>
                    </div>
                     <div className="bg-space-900/50 p-3 rounded border border-white/5 text-center">
                        <p className="text-xs text-gray-500 uppercase">Take Profit</p>
                        <p className="text-xl font-mono text-white">3.0%</p>
                    </div>
                </div>
            </div>

        </div>

        {/* Configuration Panel */}
        <div className="bg-space-900/40 backdrop-blur border border-white/5 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <Hexagon size={18} className="text-cosmic-purple" />
                <h3 className="text-sm font-serif text-white tracking-widest">GLOBAL PARAMETERS</h3>
            </div>

            <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-mono">EXECUTION MODE</label>
                    <select className="w-full bg-space-800 border border-white/10 rounded p-2 text-sm text-white focus:border-cosmic-purple outline-none">
                        <option>Aggressive (High Frequency)</option>
                        <option>Balanced (Standard)</option>
                        <option>Conservative (Low Risk)</option>
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-mono">MAX POSITION SIZE</label>
                    <div className="flex items-center gap-2">
                        <input type="range" className="flex-1 h-1 bg-space-700 rounded-lg appearance-none cursor-pointer accent-cosmic-purple" />
                        <span className="text-xs text-white font-mono bg-space-800 px-2 py-1 rounded">2.5 BTC</span>
                    </div>
                 </div>

                 <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <p className="text-orange-400 text-xs font-mono leading-relaxed">
                        WARNING: Changing strategy parameters while positions are open may result in immediate liquidation of existing orders.
                    </p>
                 </div>
                 
                 <button className="w-full py-3 mt-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono text-white transition-colors uppercase tracking-widest">
                    Save Configuration
                 </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyView;
