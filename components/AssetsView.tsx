
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

const AssetsView: React.FC = () => {
  const assets = [
    { id: 1, name: 'Bitcoin Alpha', code: 'BTC-A', price: '$64,230.50', change: 2.4, colorFrom: '#F7931A', colorTo: '#9c3412', size: 'w-24 h-24' },
    { id: 2, name: 'Ethereum Nova', code: 'ETH-N', price: '$3,450.12', change: -0.8, colorFrom: '#627EEA', colorTo: '#2a3563', size: 'w-20 h-20' },
    { id: 3, name: 'Solana Flare', code: 'SOL-F', price: '$145.67', change: 12.5, colorFrom: '#14F195', colorTo: '#9945FF', size: 'w-16 h-16' },
    { id: 4, name: 'Tether Void', code: 'USDT-V', price: '$1.00', change: 0.01, colorFrom: '#26A17B', colorTo: '#0F4C3A', size: 'w-14 h-14' },
    { id: 5, name: 'Doge Comet', code: 'DOGE-C', price: '$0.12', change: -5.4, colorFrom: '#C2A633', colorTo: '#635312', size: 'w-12 h-12' },
    { id: 6, name: 'Ripple Tide', code: 'XRP-T', price: '$0.62', change: 1.2, colorFrom: '#23292F', colorTo: '#008CFF', size: 'w-16 h-16' },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto custom-scrollbar relative">
       {/* View Header */}
       <div className="mb-12 relative z-10">
        <h2 className="text-4xl font-serif text-white tracking-widest mb-2">ASSET <span className="text-transparent bg-clip-text bg-gradient-to-r from-cosmic-purple to-cosmic-orange">GALAXY</span></h2>
        <p className="text-gray-400 font-mono text-sm max-w-xl">
          Real-time visualization of high-cap liquidity pools represented as celestial bodies. Size correlates to relative market volume.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {assets.map((asset) => (
          <div key={asset.id} className="group relative bg-space-800/40 backdrop-blur-md border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(123,44,191,0.15)] overflow-hidden">
            
            {/* Background Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{asset.name}</h3>
                    <span className="text-xs font-mono text-gray-500">{asset.code}</span>
                </div>
                {asset.change >= 0 ? (
                    <div className="flex items-center text-green-400 bg-green-900/20 px-2 py-1 rounded text-sm font-mono border border-green-500/20">
                        <ArrowUpRight size={14} className="mr-1" />
                        {asset.change}%
                    </div>
                ) : (
                    <div className="flex items-center text-red-400 bg-red-900/20 px-2 py-1 rounded text-sm font-mono border border-red-500/20">
                        <ArrowDownRight size={14} className="mr-1" />
                        {Math.abs(asset.change)}%
                    </div>
                )}
            </div>

            <div className="flex items-end justify-between">
                <div>
                    <p className="text-gray-400 text-xs font-mono uppercase mb-1">Current Price</p>
                    <p className="text-2xl font-serif text-white">{asset.price}</p>
                </div>
                
                {/* Planet Visualization */}
                <div className="relative">
                    <div 
                        className={`${asset.size} rounded-full shadow-inner relative z-10 transition-transform duration-[10s] ease-linear group-hover:scale-110`}
                        style={{
                            background: `radial-gradient(circle at 30% 30%, ${asset.colorFrom}, ${asset.colorTo})`,
                            boxShadow: `inset -4px -4px 20px rgba(0,0,0,0.8), 0 0 20px ${asset.colorFrom}40`
                        }}
                    >
                         {/* Ring effect for some planets */}
                         {asset.id % 2 === 0 && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/10 rounded-full opacity-50 scale-y-[0.3] rotate-45 group-hover:rotate-[60deg] transition-transform duration-1000" />
                         )}
                    </div>
                    {/* Glow behind planet */}
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full blur-xl -z-0 opacity-40 group-hover:opacity-60 transition-opacity"
                        style={{ background: asset.colorFrom }}
                    />
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 font-mono">
                <span className="flex items-center gap-1">
                    <Activity size={12} /> VOL: HIGH
                </span>
                <span>24H RANGE</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetsView;
