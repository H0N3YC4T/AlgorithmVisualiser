import PropTypes from 'prop-types';
import { Layers, Zap, MousePointer2 } from 'lucide-react';

export default function AlgorithmMetrics({ iterations, comparisons, accesses }) {
  const items = [
    { label: 'Passes', value: iterations, icon: Layers, color: 'text-white', bg: 'bg-white/5' },
    { label: 'Comparisons', value: comparisons, icon: Zap, color: 'text-blue-400', bg: 'bg-blue-400/5' },
    { label: 'Accesses', value: accesses, icon: MousePointer2, color: 'text-indigo-400', bg: 'bg-indigo-400/5' },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {items.map((item) => (
        <div 
          key={item.label}
          className="bg-slate-900/40 border border-slate-800/60 p-3 px-5 rounded-2xl flex items-center gap-4 transition-all hover:border-slate-700/80"
        >
          <div className={`p-2 ${item.bg} rounded-xl`}>
            <item.icon className={`w-4 h-4 ${item.color}`} />
          </div>
          <div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{item.label}</div>
            <div className={`text-xl font-mono font-black ${item.color} leading-none`}>
              {item.value || 0}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

AlgorithmMetrics.propTypes = {
  iterations: PropTypes.number,
  comparisons: PropTypes.number,
  accesses: PropTypes.number,
};
