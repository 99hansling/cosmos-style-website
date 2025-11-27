
import React, { useState, useMemo, useEffect } from 'react';
import KLineChart from './components/KLineChart';
import ControlPanel from './components/ControlPanel';
import SignalLog from './components/SignalLog';
import Navigation from './components/Navigation';
import CosmicBackground from './components/CosmicBackground';
import AssetsView from './components/AssetsView';
import StrategyView from './components/StrategyView';
import { generateData } from './utils/dataGenerator';
import { AlgoParams, CandleData } from './types';
import { Activity, Radio, Cpu, Bell } from 'lucide-react';

const App: React.FC = () => {
  // State for Navigation
  const [currentView, setCurrentView] = useState('dashboard');

  // Initial Data Generation (kept at App level to persist while switching views)
  const initialData = useMemo(() => generateData(100), []);
  const [data, setData] = useState<CandleData[]>(initialData);
  
  const [params, setParams] = useState<AlgoParams>({
    maShort: 5,
    maLong: 20,
    rsiThreshold: 30,
    stopLoss: 1.5,
    takeProfit: 3.0
  });

  const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);

  // Handle Chart Click for Custom Signals
  const handleChartClick = (index: number) => {
    setLastClickedIndex(index);
    const updatedData = [...data];
    const currentSignal = updatedData[index].customSignal;
    
    // Cycle: Null -> BUY -> SELL -> Null
    if (!currentSignal) updatedData[index].customSignal = 'BUY';
    else if (currentSignal === 'BUY') updatedData[index].customSignal = 'SELL';
    else updatedData[index].customSignal = null;

    setData(updatedData);
  };

  useEffect(() => {
    // Simulation of recalculation loop
  }, [params]);

  // View Renderer
  const renderContent = () => {
    switch (currentView) {
      case 'assets':
        return <AssetsView />;
      case 'strategy':
        return <StrategyView />;
      case 'settings':
        return (
            <div className="flex items-center justify-center h-full text-gray-500 font-mono">
                SYSTEM SETTINGS // ACCESS RESTRICTED
            </div>
        );
      case 'dashboard':
      default:
        return (
            <div className="grid grid-cols-12 gap-6 h-full overflow-hidden">
                {/* Left: Chart Area (Hero) */}
                <section className="col-span-12 lg:col-span-9 flex flex-col gap-4 h-full relative group">
                  
                  {/* Chart Header Overlay */}
                  <div className="absolute top-4 left-6 z-10 pointer-events-none">
                    <h2 className="text-2xl font-serif text-white/90 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">BTC / USD</h2>
                    <p className="text-cosmic-glow font-mono text-sm drop-shadow-md">Perpetual Futures</p>
                  </div>

                   <div className="absolute top-4 right-6 z-10 flex gap-2">
                      <span className="px-3 py-1 bg-space-800/80 border border-white/10 rounded text-xs text-gray-300 font-mono backdrop-blur cursor-pointer hover:bg-white/10 hover:text-white transition-colors">15m</span>
                      <span className="px-3 py-1 bg-white/10 border border-white/20 rounded text-xs text-white font-mono backdrop-blur cursor-pointer shadow-[0_0_10px_rgba(255,255,255,0.1)]">1H</span>
                      <span className="px-3 py-1 bg-space-800/80 border border-white/10 rounded text-xs text-gray-300 font-mono backdrop-blur cursor-pointer hover:bg-white/10 hover:text-white transition-colors">4H</span>
                   </div>

                  <div className="flex-1 bg-space-800/20 border border-white/5 rounded-2xl overflow-hidden relative shadow-2xl backdrop-blur-sm">
                     {/* Glowing border effect on container */}
                     <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]"></div>
                     
                     <div className="w-full h-full p-2">
                       <KLineChart data={data} onChartClick={handleChartClick} />
                     </div>

                     {/* Instruction Toast */}
                     <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/60 text-gray-400 text-xs rounded-full border border-white/10 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                       Click on a candle to toggle Custom Signal
                     </div>
                  </div>
                </section>

                {/* Right: Sidebar (Controls & Logs) */}
                <aside className="hidden lg:flex col-span-3 flex-col gap-6 h-full overflow-hidden">
                  <div className="flex-none">
                    <ControlPanel params={params} onChange={setParams} />
                  </div>
                  <div className="flex-1 min-h-0">
                    <SignalLog data={data} />
                  </div>
                </aside>
            </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-space-900 text-gray-200 font-sans selection:bg-cosmic-purple selection:text-white overflow-hidden flex relative">
      
      {/* Dynamic Background */}
      <CosmicBackground />

      {/* Navigation Sidebar */}
      <Navigation currentView={currentView} onNavigate={setCurrentView} />

      {/* Main Layout */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
          
          {/* Top Bar */}
          <header className="px-8 py-5 border-b border-white/5 flex justify-between items-center backdrop-blur-sm bg-space-900/10">
            <div className="flex items-center gap-4">
                 <h2 className="text-white/50 text-xs font-mono uppercase tracking-[0.2em]">{currentView} VIEW</h2>
            </div>
            <div className="flex gap-6 text-xs font-mono text-gray-400">
               <div className="flex items-center gap-2">
                 <Activity size={14} className="text-green-400" />
                 <span className="hidden sm:inline">SYSTEM: ONLINE</span>
               </div>
               <div className="flex items-center gap-2">
                 <Cpu size={14} className="text-cosmic-purple" />
                 <span className="hidden sm:inline">LATENCY: 12ms</span>
               </div>
               <div className="flex items-center gap-2">
                 <Radio size={14} className="text-cosmic-orange animate-pulse" />
                 <span className="hidden sm:inline">FEED: LIVE</span>
               </div>
               <div className="ml-4 pl-4 border-l border-white/10 text-white cursor-pointer hover:text-cosmic-glow">
                   <Bell size={16} />
               </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-6 h-full overflow-hidden">
             {renderContent()}
          </main>
      </div>
    </div>
  );
};

export default App;
