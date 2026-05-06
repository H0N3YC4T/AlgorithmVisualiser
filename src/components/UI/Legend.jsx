import PropTypes from 'prop-types';
import { memo } from 'react';
import { classCategories } from '@/styles/divClassCustom';

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
      <div className={`${classCategories.glassPanel} rounded-[2rem] p-8 h-full flex flex-col justify-center items-center gap-8`}>
        <div className="flex justify-center gap-10">
          {items.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className={`w-5 h-5 rounded-md border border-white/5 ${item.color} shadow-xl`} />
              <span className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-10">
          {items.slice(3, 5).map((item, idx) => (
            <div key={idx + 3} className="flex items-center gap-4">
              <div className={`w-5 h-5 rounded-md border border-white/5 ${item.color} shadow-xl`} />
              <span className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${classCategories.glassPanel} rounded-[2rem] p-6 h-full flex items-center justify-center`}>
      <div className="flex flex-wrap gap-6 items-center justify-center">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-md border border-white/5 ${item.color} shadow-lg`} />
            <span className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em]">{item.label}</span>
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
