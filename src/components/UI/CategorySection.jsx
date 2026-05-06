import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AlgorithmCard } from "@/components/UI";
import { classCategories } from "@/styles/divClassCustom";
import { globalTheme } from "@/styles/globalTheme";

const localTheme = {
  sectionHeader: {
    container: "w-full group focus:outline-none",
    border: `flex items-center gap-6 py-4 border-b border-${globalTheme.colors.borderStrong} transition-colors group-hover:border-${globalTheme.colors.border}`,
    iconBox: (active) =>
      `p-3 transition-all rounded-2xl ${active ? `bg-${globalTheme.colors.primary} text-${globalTheme.colors.textHigh} shadow-[0_0_20px_rgba(99,102,241,0.4)]` : `bg-slate-900 text-${globalTheme.colors.textDisabled}`}`,
    title: (active) =>
      `${globalTheme.typography.semantics.home.section} font-black uppercase tracking-normal transition-colors ${active ? `text-${globalTheme.colors.textHigh}` : `text-${globalTheme.colors.textDisabled}`}`,
  },
};



const CategorySection = ({ category, algorithms, icon, isCollapsed, toggleCollapse, onSelect, cols = 3 }) => {
  if (!algorithms || algorithms.length === 0) return null;

  const gridClass = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} gap-4 pt-4 pb-6`;

  return (
    <div className="space-y-0">
      <button onClick={toggleCollapse} className={localTheme.sectionHeader.container}>
        <div className={localTheme.sectionHeader.border}>
          <div className={localTheme.sectionHeader.iconBox(!isCollapsed)}>{icon}</div>
          <h2 className={localTheme.sectionHeader.title(!isCollapsed)}>
            {category}{" "}
            <span
              className={`ml-6 ${globalTheme.typography.sizes.baseSmall} text-slate-700 font-black tracking-[0.2em]`}
            >
              ({algorithms.length})
            </span>
          </h2>
          <div className="flex-1" />
          <ChevronDown
            className={`w-10 h-10 text-slate-600 group-hover:text-indigo-500 transition-all duration-500 ${isCollapsed ? "-rotate-90 opacity-40" : "rotate-0 opacity-100"}`}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className={gridClass}>
              {algorithms.map((algo) => (
                <AlgorithmCard key={algo.id} algo={algo} onSelect={onSelect} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

CategorySection.propTypes = {
  category: PropTypes.string.isRequired,
  algorithms: PropTypes.array.isRequired,
  icon: PropTypes.node,
  isCollapsed: PropTypes.bool.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  cols: PropTypes.number,
};

export default CategorySection;
