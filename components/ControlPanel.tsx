import React from 'react';
import { AlgoParams } from '../types';

interface ControlPanelProps {
  params: AlgoParams;
  onChange: (newParams: AlgoParams) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ params, onChange }) => {
  const handleChange = (key: keyof AlgoParams, value: number) => {
    onChange({ ...params, [key]: value });
  };

  return (
    <div className="bg-space-800/50 backdrop-blur-md border border-white/5 p-6 rounded-xl flex flex-col gap-6 h-full relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cosmic-purple/10 rounded-full blur-[40px] pointer-events-none" />

      <div>
        <h2 className="text-xl font-serif text-white mb-1 tracking-wide">Algorithm Parameters</h2>
        <p className="text-gray-500 text-xs uppercase tracking-wider">Tuning Matrix v2.4</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label className="text-gray-400">MA Short Window</label>
            <span className="text-cosmic-glow font-mono">{params.maShort}</span>
          </div>
          <input
            type="range"
            min="2"
            max="50"
            value={params.maShort}
            onChange={(e) => handleChange('maShort', Number(e.target.value))}
            className="w-full h-1 bg-space-700 rounded-lg appearance-none cursor-pointer accent-cosmic-purple hover:accent-cosmic-glow transition-all"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label className="text-gray-400">MA Long Window</label>
            <span className="text-cosmic-glow font-mono">{params.maLong}</span>
          </div>
          <input
            type="range"
            min="10"
            max="200"
            value={params.maLong}
            onChange={(e) => handleChange('maLong', Number(e.target.value))}
            className="w-full h-1 bg-space-700 rounded-lg appearance-none cursor-pointer accent-cosmic-purple hover:accent-cosmic-glow transition-all"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <label className="text-gray-400">RSI Threshold</label>
            <span className="text-cosmic-orange font-mono">{params.rsiThreshold}</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={params.rsiThreshold}
            onChange={(e) => handleChange('rsiThreshold', Number(e.target.value))}
            className="w-full h-1 bg-space-700 rounded-lg appearance-none cursor-pointer accent-cosmic-orange hover:accent-yellow-400 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                 <label className="text-gray-500 text-xs uppercase">Stop Loss %</label>
                 <input 
                    type="number" 
                    value={params.stopLoss}
                    onChange={(e) => handleChange('stopLoss', Number(e.target.value))}
                    className="w-full bg-space-900 border border-white/10 rounded p-2 text-white font-mono focus:border-red-500 outline-none transition-colors"
                 />
            </div>
            <div className="space-y-1">
                 <label className="text-gray-500 text-xs uppercase">Take Profit %</label>
                 <input 
                    type="number" 
                    value={params.takeProfit}
                    onChange={(e) => handleChange('takeProfit', Number(e.target.value))}
                    className="w-full bg-space-900 border border-white/10 rounded p-2 text-white font-mono focus:border-green-500 outline-none transition-colors"
                 />
            </div>
        </div>
      </div>

      <div className="mt-auto">
        <button className="w-full py-3 bg-gradient-to-r from-cosmic-purple to-indigo-900 rounded-lg text-white font-serif tracking-widest hover:brightness-110 transition-all shadow-[0_0_15px_rgba(123,44,191,0.4)]">
            RECALCULATE SIGNALS
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;