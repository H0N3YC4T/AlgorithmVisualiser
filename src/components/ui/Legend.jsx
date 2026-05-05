import PropTypes from 'prop-types';

/**
 * Legend Component
 * Displays a color-coded key for the visualizer elements.
 */
export default function Legend({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 h-full">
      <div className="flex flex-wrap gap-4 items-center h-full">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded border ${item.color}`} />
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Legend.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
  })).isRequired
};
