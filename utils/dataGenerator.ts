import { CandleData } from '../types';

export const generateData = (count: number): CandleData[] => {
  let price = 10000;
  const data: CandleData[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const time = new Date(now.getTime() - (count - i) * 60000 * 60).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Random walk
    const volatility = 0.02;
    const change = price * volatility * (Math.random() - 0.5);
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * (price * 0.01);
    const low = Math.min(open, close) - Math.random() * (price * 0.01);
    const volume = Math.floor(Math.random() * 5000) + 1000;

    price = close;

    // Simple Moving Average Mock Calculation
    const ma5 = i > 4 ? (data[i-1].close + data[i-2].close + data[i-3].close + data[i-4].close + close) / 5 : close;
    const ma20 = i > 19 ? close * 0.98 : close * 0.95; // Fake MA20 for visual separation

    // Random signal generation
    let signal: 'BUY' | 'SELL' | null = null;
    if (Math.random() > 0.95) signal = 'BUY';
    else if (Math.random() > 0.95) signal = 'SELL';

    data.push({
      time,
      open,
      high,
      low,
      close,
      volume,
      ma5,
      ma20,
      signal
    });
  }
  return data;
};
