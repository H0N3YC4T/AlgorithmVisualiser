import PropTypes from "prop-types";
import { CHART_PATHS } from "@/constants/chartPaths";

/**
 * BigOChart Component
 * Renders a small SVG sparkline representing an algorithmic complexity curve.
 */
const BigOChart = ({ type, color, size = 30 }) => {
  const path = CHART_PATHS[type];

  if (!path) return null;

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 20 20" 
      className={`stroke-[2.5] fill-none ${color}`}
    >
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

BigOChart.propTypes = {
  type: PropTypes.oneOf(Object.keys(CHART_PATHS)).isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default BigOChart;
