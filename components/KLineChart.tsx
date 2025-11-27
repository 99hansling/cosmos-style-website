import React from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Cell,
  ReferenceDot,
  Scatter
} from 'recharts';
import { CandleData } from '../types';
import CustomTooltip from './CustomTooltip';

interface KLineChartProps {
  data: CandleData[];
  onChartClick: (index: number) => void;
}

// Custom Shape for the Candlestick
const Candlestick = (props: any) => {
  const { x, y, width, height, low, high, open, close } = props;
  const isUp = close >= open;
  const color = isUp ? '#4ade80' : '#ef4444'; // green-400 : red-500
  const wickHeight = Math.abs(high - low);
  
  // Calculate pixel positions for wick based on the scaling factor used by Recharts internally
  // Since we don't have direct access to the scale function here easily without passing it down,
  // we rely on the fact that Recharts passes `y` and `height` based on the `open` and `close` values provided to the Bar.
  // However, rendering a proper candlestick in Recharts is often easier by drawing lines relative to the Bar's dimensions if formatted correctly.
  
  // Alternative robust approach: Use the data directly if the chart scale is linear.
  // To keep it simple and robust within Recharts composition:
  // We will draw the body using the rect provided by Bar, and draw a line for the wick in the center.
  
  // Note: Recharts 'Bar' receives y (top) and height. 
  // For a candlestick, we need the high/low to draw the wick. 
  // We can access the full payload in props.payload
  
  // We need to convert data values to coordinates. 
  // Since we are inside a shape, we don't have the scale functions easily.
  // A common workaround is to use ErrorBar, but let's try a visual approximation or specific coordinate mapping if possible.
  
  // Actually, standard Recharts practice for candles is complicated. 
  // Let's use a simpler visual trick:
  // The 'Bar' dataKey will be [min(open, close), max(open, close)]. 
  // But Recharts Bar expects a single value or [start, end].
  
  // Let's assume the parent passes the correct [min, max] range to the Bar so the rectangle is correct.
  // Then we draw the wick.
  
  // Wait, Recharts CustomShape props include the pixel values for the value passed.
  // If we pass [low, high] to the Bar, the Rect covers the full range.
  // Then we draw the body inside it? No, that's hard.
  
  // LET'S GO WITH A SIMPLER APPROACH:
  // We draw the stick using SVG lines based on the passed props which Recharts calculates if we map data correctly.
  // But since that is complex to get right without the scale, we will use a specialized trick:
  // We will render the "Body" as a Bar, and the "Wick" as a separate Line or ErrorBar? No.
  
  // Best approach for this demo:
  // Render the Bar representing the Open-Close body.
  // Render the Wick as a separate "Line" or "Scatter" shape? No.
  // We will use the `shape` prop on Bar, but we need the Y-coordinate of High and Low.
  // We can't easily get Y-coord of High/Low inside the shape unless we pass them as data and Recharts scales them.
  
  // Let's try the [low, high] approach for the Bar data, then paint the body manually.
  // `y` will be the top (high), `height` will be (high - low).
  
  const { payload, yAxis } = props;
  // We need the scale to calculate pixel positions for open/close within the high/low bar.
  // This is getting too hacky.
  
  // FALLBACK: Standard Bar for Body, and we just assume the Wicks are not critical for this specific "Signal Recognition" demo 
  // OR 
  // We simply implement a custom SVG purely based on pixel mapping if we had the scale.
  
  // LET'S DO THIS:
  // We will use a standard Bar for the body (Open vs Close).
  // We will use a composed ErrorBar for the high/low? 
  // Recharts `ErrorBar` requires `error` values.
  
  // Final decision: Use the "Bar" for the body.
  // Use a "Line" that is disconnected (segments) for the wicks? No.
  
  // Let's implement the custom shape assuming the Bar receives the Body [Min, Max].
  // We will draw the wick manually if we can infer the pixels.
  // Actually, visual fidelity is key. 
  // I will just draw the Body using a Bar. 
  // And I will add a `Line` chart that connects High to Low? No that connects across X.
  
  // Okay, I will render the Body (Bar) and I will render a separate "Scatter" shape for High/Low wicks? 
  // No, let's just stick to a Bar chart that shows movement. 
  // The "Candlestick" is nice but complex in Recharts without a dedicated library wrapper.
  // I will use `recharts` standard Bar chart to represent the body, and visual cues.
  
  // WAIT! I can use `low` and `high` in the `data` and a Custom Shape that calculates positions?
  // If I pass the yAxis scale to the shape? No.
  
  // Simplify:
  // We will render the BODY of the candle.
  // The user asked for K-Line.
  // I will approximate K-Line by drawing a Bar from Open to Close.
  // I will overlay a specialized Scatter/Line for the wicks? 
  // Let's try to draw the wick using the internal API properties often available on the props object in custom shapes, 
  // or just accept simple bars for this iteration to ensure stability.
  
  // HOWEVER, I can do this:
  // Main Bar: dataKey="body" (range open-close)
  // But Recharts Bar doesn't take a range easily in older versions.
  
  // Let's use a standard trick: Two stacked bars? No.
  
  // I will use a custom shape on a Scatter plot!
  // Scatter allows x, y. 
  // If I map data to Scatter points, I can draw the whole candle SVG at that point.
  // I need the yScale. 
  
  // Let's pivot to a standard Recharts composition that looks GOOD, even if not a perfect traditional candle.
  // We will use a composed chart.
  // Bar Chart: value = Math.abs(open-close). stackId="a". 
  // But base needs to be min(open, close).
  // This is hard to do with standard Bar.
  
  // OK, I will use a Custom Shape Bar.
  // The dataKey will be `high`. The Bar will go from 0 to High.
  // Inside the shape, I will draw the candle relative to the `y` (High).
  // I need access to Open, Close, Low. They are in `payload`.
  // I need the scale. `yAxis.scale(value)`.
  
  // Note: props.yAxis is usually available in CustomShape if passed.
  // But often it's not.
  
  // Let's just use two Bars?
  // One invisible bar for the "bottom wick to bottom body".
  // One visible bar for body.
  // One invisible bar for top.
  
  // Ok, simplest high-fidelity approach for Recharts Candle:
  // Pass `[min(open, close), max(open, close)]` to the Bar. 
  // Recharts handles range bars natively in newer versions. 
  // Let's assume this environment supports it. 
  // If not, it will default to array rendering.
  
  // Let's try the Range Bar approach.
  const bodyData = [Math.min(open, close), Math.max(open, close)];
  
  return (
    <g>
      {/* Wick */}
      <line 
        x1={x + width / 2} 
        y1={props.yAxis.scale(high)} 
        x2={x + width / 2} 
        y2={props.yAxis.scale(low)} 
        stroke={color} 
        strokeWidth={1}
      />
      {/* Body */}
      <rect 
        x={x} 
        y={props.yAxis.scale(Math.max(open, close))} 
        width={width} 
        height={Math.max(2, Math.abs(props.yAxis.scale(open) - props.yAxis.scale(close)))} 
        fill={color} 
      />
    </g>
  );
};

const CustomCandle = (props: any) => {
  const { x, width, payload, yAxis } = props;
  const { open, close, high, low } = payload;
  const isUp = close >= open;
  const color = isUp ? '#4ade80' : '#ef4444'; 
  
  // Safe check for axis availability
  if (!yAxis || !yAxis.scale) return null;

  const yHigh = yAxis.scale(high);
  const yLow = yAxis.scale(low);
  const yOpen = yAxis.scale(open);
  const yClose = yAxis.scale(close);
  const bodyTop = Math.min(yOpen, yClose);
  const bodyHeight = Math.max(2, Math.abs(yOpen - yClose));

  return (
    <g>
      {/* Wick */}
      <line x1={x + width / 2} y1={yHigh} x2={x + width / 2} y2={yLow} stroke={color} strokeWidth={1.5} opacity={0.8} />
      {/* Body */}
      <rect x={x} y={bodyTop} width={width} height={bodyHeight} fill={color} stroke="none" rx={1} />
    </g>
  );
};

const KLineChart: React.FC<KLineChartProps> = ({ data, onChartClick }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        onClick={(e) => {
          if (e && e.activeTooltipIndex !== undefined) {
            onChartClick(e.activeTooltipIndex);
          }
        }}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorMa5" x1="0" y1="0" x2="1" y2="0">
            <stop offset="5%" stopColor="#7B2CBF" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#C77DFF" stopOpacity={0.8}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
        <XAxis 
          dataKey="time" 
          stroke="#555" 
          tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'monospace' }}
          tickLine={false}
          axisLine={false}
          minTickGap={30}
        />
        <YAxis 
          domain={['auto', 'auto']} 
          orientation="right" 
          stroke="#555"
          tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'monospace' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(val) => val.toFixed(0)}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ffffff20', strokeWidth: 1 }} />
        
        {/* We use a Bar to drive the custom shape, binding it to the "high" value to ensure the Y-scale covers the range, 
            but the shape draws based on payload */}
        <Bar dataKey="high" shape={<CustomCandle />} isAnimationActive={false} />

        <Line type="monotone" dataKey="ma5" stroke="url(#colorMa5)" strokeWidth={2} dot={false} isAnimationActive={false} />
        <Line type="monotone" dataKey="ma20" stroke="#FF9E00" strokeWidth={1} strokeDasharray="5 5" dot={false} isAnimationActive={false} />

        {/* Signals */}
        <Scatter dataKey="signal" shape={(props: any) => {
            const { cx, cy, payload } = props;
            if (!payload.signal) return null;
            const isBuy = payload.signal === 'BUY';
            return (
                <g transform={`translate(${cx},${cy})`}>
                    <circle r={6} fill={isBuy ? '#22c55e' : '#ef4444'} fillOpacity={0.2} />
                    <circle r={3} fill={isBuy ? '#4ade80' : '#f87171'} />
                    {isBuy ? (
                         <path d="M-2 1 L0 -1 L2 1" stroke="black" strokeWidth={1} fill="none" transform="translate(0,0)" />
                    ) : (
                         <path d="M-2 -1 L0 1 L2 -1" stroke="black" strokeWidth={1} fill="none" transform="translate(0,0)" />
                    )}
                </g>
            )
        }} />

        {/* Custom Signals (Manual) */}
         <Scatter dataKey="customSignal" shape={(props: any) => {
            const { cx, cy, payload } = props;
            if (!payload.customSignal) return null;
            const isBuy = payload.customSignal === 'BUY';
            // Draw slightly above/below the candle
            const yOffset = isBuy ? 25 : -25;
            return (
                <g transform={`translate(${cx},${cy + yOffset})`}>
                    <text 
                        x={0} 
                        y={0} 
                        dy={4} 
                        textAnchor="middle" 
                        fill={isBuy ? '#4ade80' : '#f87171'} 
                        fontSize={10} 
                        fontWeight="bold"
                        style={{ textShadow: '0px 0px 4px rgba(0,0,0,0.8)' }}
                    >
                        {isBuy ? '▲' : '▼'}
                    </text>
                     <text 
                        x={0} 
                        y={isBuy ? 12 : -10} 
                        textAnchor="middle" 
                        fill={isBuy ? '#4ade80' : '#f87171'} 
                        fontSize={8} 
                        fontFamily="monospace"
                    >
                        USER
                    </text>
                </g>
            )
        }} />

      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default KLineChart;