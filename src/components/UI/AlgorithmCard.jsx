import PropTypes from "prop-types";
import { globalTheme } from "@/styles/globalTheme";
import { classCategories } from "@/styles/divClassCustom";
import { homeDefaults } from "@/constants/home";



const localTheme = {
  appCard: `group relative text-left p-8 bg-slate-900/40 border border-slate-800/60 hover:border-indigo-500/50 rounded-3xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(99,102,241,0.15)] flex flex-col justify-between overflow-hidden`,
  cardHeading: `text-2xl font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight`,
  cardDescription: classCategories.cardDescription,
  badgeBase: `text-[10px] font-black uppercase tracking-widest rounded-lg border`,
  complexityPill: `flex items-center gap-2 px-3 py-1.5 bg-slate-950/60 border border-slate-800/50 rounded-xl text-[11px] font-bold shadow-inner flex-shrink-0`,
  complexityLabel: `text-slate-500 uppercase tracking-tighter`,
};

const getComplexityColor = (complexity) => {
  if (!complexity) return homeDefaults.complexityColors.default;
  const c = complexity.toLowerCase();

  if ((c.includes("1") && !c.includes("n") && !c.includes("v")) || c.includes("ω(d)") || c.includes("o(d)"))
    return homeDefaults.complexityColors.elite;

  if (
    (c.includes("log") && !c.includes("n log") && !c.includes("v")) ||
    c.includes("√") ||
    c.includes("n/m") ||
    (c.includes("v") && !c.includes("+") && !c.includes("e") && !c.includes("^"))
  ) {
    return homeDefaults.complexityColors.excellent;
  }

  if (
    (c.includes("n") &&
      !c.includes("log") &&
      !c.includes("^") &&
      !c.includes("{") &&
      (!c.includes("m") || c.includes("+ m")) &&
      !c.includes("nk")) ||
    c.includes("v + e")
  ) {
    return homeDefaults.complexityColors.good;
  }

  if (c.includes("n log") || c.includes("nk") || c.includes(")log v")) return homeDefaults.complexityColors.fair;

  return homeDefaults.complexityColors.poor;
};

const getDifficultyColor = (difficulty) => {
  return homeDefaults.difficultyColors[difficulty] || homeDefaults.difficultyColors.default;
};

const AlgorithmCard = ({ algo, onSelect }) => {
  return (
    <button type="button" onClick={() => onSelect(algo.id)} className={localTheme.appCard}>
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] group-hover:bg-indigo-500/10 transition-all duration-500" />

      <div className="space-y-6 relative z-10 flex-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className={localTheme.cardHeading}>{algo.name}</h3>
          <span className={`${localTheme.badgeBase} ${getDifficultyColor(algo.difficulty)} py-1 px-3`}>
            {algo.difficulty}
          </span>
        </div>

        <p className={localTheme.cardDescription}>{algo.description}</p>

        {algo.complexity && (
          <div className="pt-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <div className={localTheme.complexityPill} title="Best Case">
                <span className={localTheme.complexityLabel}>B:</span>
                <span className={getComplexityColor(algo.complexity.timeBest)}>{algo.complexity.timeBest}</span>
              </div>
              <div className={localTheme.complexityPill} title="Average Case">
                <span className={localTheme.complexityLabel}>A:</span>
                <span className={getComplexityColor(algo.complexity.timeAvg)}>{algo.complexity.timeAvg}</span>
              </div>
              <div className={localTheme.complexityPill} title="Worst Case">
                <span className={localTheme.complexityLabel}>W:</span>
                <span className={getComplexityColor(algo.complexity.timeWorst)}>{algo.complexity.timeWorst}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {algo.complexity.timePre && (
                <div className={localTheme.complexityPill} title="Preprocessing Time">
                  <span className={localTheme.complexityLabel}>PREP:</span>
                  <span className="text-indigo-400">{algo.complexity.timePre}</span>
                </div>
              )}
              <div className={localTheme.complexityPill} title="Space Complexity">
                <span className={localTheme.complexityLabel}>SPACE:</span>
                <span className="text-indigo-400">{algo.complexity.space}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

AlgorithmCard.propTypes = {
  algo: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default AlgorithmCard;
