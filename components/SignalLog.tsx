import React from 'react';
import { CandleData } from '../types';

interface SignalLogProps {
  data: CandleData[];
}

const SignalLog: React.FC<SignalLogProps> = ({ data }) => {
  // Filter for signals
  const signals = data
    .map((candle, index) => ({ ...candle, originalIndex: index }))
    .filter(c => c.signal || c.customSignal)
    .reverse();

  return (
    <div className="bg-space-800/50 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-white/5 bg-space-900/50">
        <h3 className="text-white font-serif tracking-wide text-sm">Detected Signals</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
        {signals.length === 0 ? (
          <div className="text-center text-gray-600 mt-10 text-xs font-mono">NO SIGNALS DETECTED</div>
        ) : (
          signals.map((s, i) => {
            const isBuy = s.signal === 'BUY' || s.customSignal === 'BUY';
            const type = s.customSignal ? 'MANUAL' : 'ALGO';
            return (
              <div key={i} className="flex items-center justify-between p-3 rounded bg-space-900/40 border border-white/5 hover:border-white/20 transition-colors group">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-mono mb-1">{s.time}</span>
                    <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded border ${type === 'MANUAL' ? 'border-purple-500/50 text-purple-400' : 'border-blue-500/50 text-blue-400'}`}>
                            {type}
                        </span>
                        <span className="text-gray-300 text-sm font-mono">{s.close.toFixed(2)}</span>
                    </div>
                </div>
                <div className={`text-sm font-bold tracking-wider ${isBuy ? 'text-green-400' : 'text-red-400'} drop-shadow-sm`}>
                    {s.signal || s.customSignal}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SignalLog;