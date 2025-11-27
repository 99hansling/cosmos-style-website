export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ma5?: number;
  ma20?: number;
  signal?: 'BUY' | 'SELL' | null; // Algorithmic signal
  customSignal?: 'BUY' | 'SELL' | null; // User manually added signal
}

export interface AlgoParams {
  maShort: number;
  maLong: number;
  rsiThreshold: number;
  stopLoss: number;
  takeProfit: number;
}
