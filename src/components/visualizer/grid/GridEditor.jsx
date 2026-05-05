import { MapPin, Target, Square } from 'lucide-react';
import PropTypes from 'prop-types';

export default function GridEditor({ selectedTool, setTool, disabled }) {
  const tools = [
    { id: 'start', label: 'Start', icon: MapPin, color: 'text-sky-400', bgColor: 'bg-sky-400/10', borderColor: 'border-sky-400/30' },
    { id: 'end', label: 'End', icon: Target, color: 'text-emerald-400', bgColor: 'bg-emerald-400/10', borderColor: 'border-emerald-400/30' },
    { id: 'wall', label: 'Wall', icon: Square, color: 'text-rose-400', bgColor: 'bg-rose-400/10', borderColor: 'border-rose-400/30' }
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mr-2">Grid Tools:</span>
      <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-800 shadow-inner">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = selectedTool === tool.id;
          
          return (
            <button
              key={tool.id}
              onClick={() => !disabled && setTool(tool.id)}
              disabled={disabled}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300
                ${isActive 
                  ? `${tool.bgColor} ${tool.color} ${tool.borderColor} border shadow-lg scale-105 z-10` 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 border-transparent border'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'animate-pulse' : ''}`} />
              {tool.label}
            </button>
          );
        })}
      </div>
      {disabled && (
        <span className="text-[9px] font-bold text-rose-400/60 uppercase tracking-tighter ml-2 animate-pulse">
          Editing Locked (Search Active)
        </span>
      )}
    </div>
  );
}

GridEditor.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  setTool: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
