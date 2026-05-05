import PropTypes from 'prop-types';
import { memo } from 'react';

/**
 * Legend Component
 * Displays a color-coded key for the visualizer elements.
 */
const Legend = memo(({ items }) => {
  if (!items || items.length === 0) return null;

  // Specific layout for pathfinding (5 items)
  const isPathfindingLegend = items.length === 5;

  if (isPathfindingLegend) {
    return (
      <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 h-full flex flex-col justify-center items-center gap-6 shadow-2xl">
        <div className="flex justify-center gap-8">
          {items.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-sm border border-white/5 ${item.color} shadow-lg`} />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8">
          {items.slice(3, 5).map((item, idx) => (
            <div key={idx + 3} className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-sm border border-white/5 ${item.color} shadow-lg`} />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 h-full">
      <div className="flex flex-wrap gap-4 items-center justify-center h-full">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded border border-white/5 ${item.color} shadow-md`} />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

Legend.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  })).isRequired
};

export default Legend;
