import React from 'react';
import { TooltipProps } from 'recharts';
import { CandleData } from '../types';

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as CandleData;
    return (
      <div className="bg-space-800/95 border border-white/10 p-4 rounded-lg shadow-[0_0_20px_rgba(123,44,191,0.2)] backdrop-blur-xl min-w-[180px]">
        <p className="text-gray-400 text-xs mb-2 font-mono tracking-widest uppercase border-b border-white/10 pb-1">{label}</p>
        <div className="space-y-1.5 text-xs font-mono">
          <div className="flex justify-between">
            <span className="text-gray-400">Open</span>
            <span className="text-white">{data.open.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">High</span>
            <span className="text-white">{data.high.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Low</span>
            <span className="text-white">{data.low.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Close</span>
            <span className={`font-bold ${data.close >= data.open ? 'text-green-400' : 'text-red-400'}`}>
              {data.close.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-white/5 mt-2">
            <span className="text-cosmic-purple">MA5</span>
            <span className="text-gray-300">{data.ma5?.toFixed(2)}</span>
          </div>
           <div className="flex justify-between">
            <span className="text-cosmic-orange">MA20</span>
            <span className="text-gray-300">{data.ma20?.toFixed(2)}</span>
          </div>

          {data.signal && (
            <div className={`mt-3 py-1 px-2 rounded text-center font-bold tracking-wider border ${data.signal === 'BUY' ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-red-500/20 border-red-500/50 text-red-400'}`}>
              ALGO: {data.signal}
            </div>
          )}
          {data.customSignal && (
            <div className={`mt-1 py-1 px-2 rounded text-center font-bold tracking-wider border ${data.customSignal === 'BUY' ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-red-500/20 border-red-500/50 text-red-400'}`}>
              MANUAL: {data.customSignal}
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;