import { MapPin, Target, Square, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { classCategories } from '@/styles/divClassCustom';

export default function GridEditor({ selectedTool, setTool, disabled, onClear }) {
  const localTheme = {
    container: "flex items-center gap-4",
    toolBtn: (isActive, tool, disabled) => `
      flex items-center gap-2 px-4 py-2 rounded-xl ${classCategories.logicText.split(" ")[0]} font-bold transition-all duration-300
      ${isActive
        ? `${tool.bgColor} ${tool.color} ${tool.borderColor} border shadow-lg scale-105 z-10`
        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 border-transparent border'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `,
    clearBtn: `flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl ${classCategories.logicText.split(" ")[0]} font-black uppercase tracking-widest hover:bg-rose-500/20 transition-all disabled:opacity-30 whitespace-nowrap active:scale-95`,
    lockBadge: `${classCategories.logicText.split(" ")[0]} font-bold text-rose-400/60 uppercase tracking-tighter ml-2 animate-pulse`,
  };

  const tools = [
    { id: 'start', label: 'Start', icon: MapPin, color: 'text-amber-400', bgColor: 'bg-amber-400/10', borderColor: 'border-amber-400/30' },
    { id: 'end', label: 'End', icon: Target, color: 'text-emerald-400', bgColor: 'bg-emerald-400/10', borderColor: 'border-emerald-400/30' },
    { id: 'wall', label: 'Wall', icon: Square, color: 'text-slate-200', bgColor: 'bg-slate-600/40', borderColor: 'border-slate-500/50' }
  ];

  return (
    <div className={localTheme.container}>
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = selectedTool === tool.id;

        return (
          <button
            key={tool.id}
            onClick={() => !disabled && setTool(tool.id)}
            disabled={disabled}
            className={localTheme.toolBtn(isActive, tool, disabled)}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'animate-pulse' : ''}`} />
            {tool.label}
          </button>
        );
      })}

      {onClear && (
        <>
          <div className="w-px h-8 bg-slate-800 mx-1" />
          <button
            onClick={onClear}
            disabled={disabled}
            className={localTheme.clearBtn}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </>
      )}

      {disabled && (
        <span className={localTheme.lockBadge}>
          Locked
        </span>
      )}
    </div>
  );
}

GridEditor.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  setTool: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  onClear: PropTypes.func
};
