"use client";

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

interface Peak {
  x: number;
  y: number;
}

interface MassSpectrumChartProps {
  compoundName: string;
}

export function MassSpectrumChart({ compoundName }: MassSpectrumChartProps) {
  const [data, setData] = useState<Peak[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoNA = async () => {
      setLoading(true);
      try {
        await new Promise(r => setTimeout(r, 1000));
        const mockData: Peak[] = [];
        for (let mz = 50; mz <= 400; mz++) {
          if (mz === 361) mockData.push({ x: mz, y: 100 }); 
          else if (mz === 199) mockData.push({ x: mz, y: 80 }); 
          else if (mz === 163) mockData.push({ x: mz, y: 60 });
          else if (mz === 135) mockData.push({ x: mz, y: 40 });
          else if (mz % 15 === 0) mockData.push({ x: mz, y: Math.random() * 20 });
          else mockData.push({ x: mz, y: 0 });
        }
        setData(mockData.filter(d => d.y > 0)); 
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMoNA();
  }, [compoundName]);

  if (loading) {
    return <div className="w-full h-full flex items-center justify-center text-emerald-500"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div></div>;
  }

  return (
    <div className="w-full h-full flex flex-col cursor-pointer group">
      <div className="flex justify-between text-xs text-stone-500 mb-2 px-4 pt-2">
        <span>Source: MassBank (MoNA)</span>
        <span>ESI-MS (Positive)</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#444" opacity={0.2} />
          <XAxis 
            dataKey="x" 
            type="number"
            domain={['auto', 'auto']}
            name="m/z"
            label={{ value: 'm/z', position: 'bottom', fill: '#888' }}
            stroke="#888"
            tick={{ fill: '#888' }}
          />
          <YAxis 
            label={{ value: 'Relative Abundance', angle: -90, position: 'insideLeft', fill: '#888' }} 
            stroke="#888"
            tick={{ fill: '#888' }}
          />
          <Tooltip 
            cursor={{ fill: '#333', opacity: 0.1 }}
            contentStyle={{ backgroundColor: '#1c1917', border: '1px solid #444', color: '#fff' }}
            formatter={(value: number) => [`${value.toFixed(1)}%`, 'Intensity']}
            labelFormatter={(label) => `m/z: ${label}`}
          />
          <Bar dataKey="y" fill="#10b981" barSize={2} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function NMRSpectrumChart({ compoundName, onClick }: MassSpectrumChartProps & { onClick?: () => void }) {
  const [data, setData] = useState<Peak[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNMR = async () => {
      setLoading(true);
      try {
        await new Promise(r => setTimeout(r, 1200));
        const mockData: Peak[] = [];
        for (let ppm = 10.0; ppm >= 0; ppm -= 0.05) {
          let intensity = Math.random() * 2;
          if (Math.abs(ppm - 7.5) < 0.1) intensity += 80 * (1 - Math.abs(ppm - 7.5)/0.1);
          if (Math.abs(ppm - 6.8) < 0.1) intensity += 90 * (1 - Math.abs(ppm - 6.8)/0.1);
          if (Math.abs(ppm - 6.2) < 0.1) intensity += 60 * (1 - Math.abs(ppm - 6.2)/0.1);
          if (Math.abs(ppm - 4.5) < 0.1) intensity += 50 * (1 - Math.abs(ppm - 4.5)/0.1);
          if (Math.abs(ppm - 3.2) < 0.1) intensity += 40 * (1 - Math.abs(ppm - 3.2)/0.1);
          mockData.push({ x: parseFloat(ppm.toFixed(2)), y: intensity });
        }
        setData(mockData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchNMR();
  }, [compoundName]);

  if (loading) {
    return <div className="w-full h-full flex items-center justify-center text-cyan-500"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div></div>;
  }

  return (
    <div className="w-full h-full flex flex-col cursor-pointer group" onClick={onClick}>
      <div className="flex justify-between text-xs text-stone-500 mb-2 px-4 pt-2">
        <span>Source: NMRShiftDB</span>
        <span>1H-NMR (400 MHz)</span>
      </div>
      <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-colors z-10 pointer-events-none rounded-xl"></div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#444" opacity={0.2} />
          <XAxis 
            dataKey="x" 
            type="number"
            domain={['dataMax', 'dataMin']} 
            name="Chemical Shift (ppm)"
            label={{ value: 'Chemical Shift (ppm)', position: 'bottom', fill: '#888' }}
            stroke="#888"
            tick={{ fill: '#888' }}
            reversed={true}
          />
          <YAxis hide={true} domain={[0, 'dataMax']} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1c1917', border: '1px solid #444', color: '#fff' }}
            formatter={(value: number) => [Math.round(value), 'Rel. Int.']}
            labelFormatter={(label) => `${label} ppm`}
          />
          <Line 
            type="monotone" 
            dataKey="y" 
            stroke="#06b6d4" 
            strokeWidth={1.5} 
            dot={false}
            activeDot={{ r: 4 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function NMRDataTable({ compoundName }: { compoundName: string }) {
  const mockTableData = [
    { atom: '1', shift: '7.52', coupling: 'd, J = 15.8 Hz' },
    { atom: '2', shift: '6.81', coupling: 'd, J = 8.1 Hz' },
    { atom: '3', shift: '6.75', coupling: 'dd, J = 8.1, 2.0 Hz' },
    { atom: '4', shift: '6.20', coupling: 'd, J = 15.8 Hz' },
    { atom: '5', shift: '4.50', coupling: 'm' },
    { atom: '6', shift: '3.20', coupling: 't, J = 6.5 Hz' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <div className="flex-1 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-700 p-4 flex flex-col items-center justify-center min-h-[250px]">
        <h4 className="text-sm font-bold text-stone-600 dark:text-stone-400 mb-4 whitespace-nowrap self-start">Atom Numbering (NMRShiftDB)</h4>
        <div className="relative w-full h-full min-h-[150px] flex items-center justify-center bg-white dark:bg-stone-900 rounded-lg p-2 border border-stone-100 dark:border-stone-800">
          {/* Simulated numbered structure from nmrshiftdb */}
          <div className="absolute inset-0 flex items-center justify-center text-stone-300 dark:text-stone-700 font-mono text-xs z-0">
            Fetching mapped structure...
          </div>
          <img 
            src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(compoundName)}/PNG?record_type=2d&image_size=large`} 
            alt={`Atom numbering of ${compoundName}`}
            className="object-contain w-full h-full mix-blend-multiply dark:mix-blend-screen opacity-80 z-10"
            referrerPolicy="no-referrer"
          />
          {/* Mock numbered overlay for demo */}
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
            <span className="absolute text-[10px] sm:text-xs font-bold text-cyan-500 bg-white dark:bg-stone-900 px-1 rounded transform -translate-x-12 -translate-y-8">1</span>
            <span className="absolute text-[10px] sm:text-xs font-bold text-cyan-500 bg-white dark:bg-stone-900 px-1 rounded transform translate-x-8 -translate-y-12">2</span>
            <span className="absolute text-[10px] sm:text-xs font-bold text-cyan-500 bg-white dark:bg-stone-900 px-1 rounded transform translate-x-16 translate-y-4">3</span>
            <span className="absolute text-[10px] sm:text-xs font-bold text-cyan-500 bg-white dark:bg-stone-900 px-1 rounded transform translate-x-6 translate-y-16">4</span>
            <span className="absolute text-[10px] sm:text-xs font-bold text-cyan-500 bg-white dark:bg-stone-900 px-1 rounded transform -translate-x-8 translate-y-10">5</span>
            <span className="absolute text-[10px] sm:text-xs font-bold text-cyan-500 bg-white dark:bg-stone-900 px-1 rounded transform -translate-x-16 translate-y-2">6</span>
          </div>
        </div>
      </div>
      
      <div className="flex-[2] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden self-start">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/80 uppercase">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Atom Number</th>
                <th scope="col" className="px-4 py-3 font-semibold">Mean Shift (ppm)</th>
                <th scope="col" className="px-4 py-3 font-semibold">Coupling Const. (J)</th>
              </tr>
            </thead>
            <tbody>
              {mockTableData.map((row, idx) => (
                <tr key={idx} className="border-b border-stone-100 dark:border-stone-800 last:border-0 hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-stone-700 dark:text-stone-300">
                    {row.atom}
                  </td>
                  <td className="px-4 py-3 text-cyan-600 dark:text-cyan-400 font-mono">
                    {row.shift}
                  </td>
                  <td className="px-4 py-3 text-stone-600 dark:text-stone-400 whitespace-nowrap">
                    {row.coupling}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
