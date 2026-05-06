import PropTypes from "prop-types";
import { memo } from "react";
import { classCategories } from "@/styles/divClassCustom";
import { algorithmPageTheme as apt } from "@/styles/localThemes/algorithmPageTheme";

const localTheme = {
  container: `${classCategories.glassPanel} ${classCategories.cardRound} p-3 h-full flex items-center justify-center`,
  itemLabel: apt.key,
};

/**
 * Legend Component
 * Displays a color-coded key for the Visualiser elements.
 */
const Legend = memo(({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className={localTheme.container}>
      <div className="flex flex-wrap gap-x-8 gap-y-6 items-center justify-center">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className={`w-5 h-5 rounded-md border border-white/10 ${item.color} shadow-lg`} />
            <span className={localTheme.itemLabel}>{item.label}</span>
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
