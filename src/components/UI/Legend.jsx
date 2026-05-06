import PropTypes from "prop-types";
import { memo } from "react";
import { classCategories } from "@/styles/divClassCustom";

/**
 * Legend Component
 * Displays a color-coded key for the visualizer elements.
 */
const Legend = memo(({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div
      className={`${classCategories.glassPanel} ${classCategories.cardRound} p-3 h-full flex items-center justify-center`}
    >
      <div className="flex flex-wrap gap-x-8 gap-y-6 items-center justify-center">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className={`w-5 h-5 rounded-md border border-white/10 ${item.color} shadow-lg`} />
            <span className={`${classCategories.logicText.split(" ")[0]} font-black text-slate-400 uppercase tracking-[0.2em]`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

Legend.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Legend;
