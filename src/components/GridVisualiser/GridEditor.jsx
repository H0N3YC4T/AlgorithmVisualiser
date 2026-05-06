import { MapPin, Target, Square, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { globalTheme } from "@/styles/globalTheme";
import { algorithmPageTheme as apt } from "@/styles/localThemes/algorithmPageTheme";

const localTheme = {
  container: "flex items-center gap-4 relative",
  toolBtn: (active, tool, disabled) =>
    `flex items-center gap-2.5 px-5 py-2.5 rounded-xl border-2 transition-all duration-300 font-black ${apt.button} ${
      active
        ? `${tool.color} ${tool.bgColor} ${tool.borderColor} scale-105 shadow-lg shadow-indigo-500/10`
        : `text-slate-500 bg-slate-900/50 border-slate-800/40 hover:bg-slate-800 hover:text-slate-300`
    } ${disabled ? "opacity-40 cursor-not-allowed scale-100" : "active:scale-95"}`,
  clearBtn: `flex items-center gap-2.5 px-5 py-2.5 rounded-xl border-2 border-rose-500/30 text-rose-400 bg-rose-500/5 hover:bg-rose-500/15 transition-all duration-300 font-black ${apt.button} active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed`,
  lockBadge: `absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg animate-bounce`,
};

export default function GridEditor({ selectedTool, setTool, disabled, onClear }) {
  const tools = [
    {
      id: "start",
      label: "Start",
      icon: MapPin,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
      borderColor: "border-amber-400/30",
    },
    {
      id: "end",
      label: "End",
      icon: Target,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
      borderColor: "border-emerald-400/30",
    },
    {
      id: "wall",
      label: "Wall",
      icon: Square,
      color: "text-slate-200",
      bgColor: "bg-slate-600/40",
      borderColor: "border-slate-500/50",
    },
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
            <Icon className={`w-3.5 h-3.5 ${isActive ? "animate-pulse" : ""}`} />
            {tool.label}
          </button>
        );
      })}

      {onClear && (
        <>
          <div className="w-px h-8 bg-slate-800 mx-1" />
          <button onClick={onClear} disabled={disabled} className={localTheme.clearBtn}>
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </>
      )}

      {disabled && <span className={localTheme.lockBadge}>Locked</span>}
    </div>
  );
}

GridEditor.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  setTool: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  onClear: PropTypes.func,
};
