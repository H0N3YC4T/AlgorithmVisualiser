import PropTypes from "prop-types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ChevronDown, Layers, Search, Map, Zap, HelpCircle } from "lucide-react";
import { homeDefaults } from "../core/constants/home";
import { classCategory } from "../styles/class-category";

const ICON_MAP = {
  Layers,
  Search,
  Map,
  Zap,
  HelpCircle,
};

const BigOChart = ({ type, color }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 20 20" className={`stroke-[2.5] fill-none ${color}`}>
      <path d={homeDefaults.charts[type]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

BigOChart.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default function Home({ algorithms, categories, onSelect }) {
  const getCategoryIcon = (category) => {
    const iconName = homeDefaults.categoryMeta[category] || homeDefaults.categoryMeta.default;
    const Icon = ICON_MAP[iconName] || ICON_MAP.HelpCircle;
    return <Icon className="w-5 h-5" />;
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

  const [collapsedCategories, setCollapsedCategories] = useState(
    new Set(["cheatsheet", ...categories]),
  );

  const toggleCategory = (category) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-200 p-6 md:p-8 font-sans relative">
      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 pt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
            <Zap className="w-3.5 h-3.5" /> {homeDefaults.hero.badge}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
            {homeDefaults.hero.title} <span className="text-indigo-500">{homeDefaults.hero.titleAccent}</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-bold text-sm tracking-wide">{homeDefaults.hero.description}</p>
        </div>

        {/* Big O Reference */}
        <div className="space-y-0">
          <button onClick={() => toggleCategory("cheatsheet")} className={classCategory.sectionHeader.container}>
            <div className={classCategory.sectionHeader.border}>
              <div className={classCategory.sectionHeader.iconBox(!collapsedCategories.has("cheatsheet"))}>
                <FileText className="w-5 h-5" />
              </div>
              <h2 className={classCategory.sectionHeader.title(!collapsedCategories.has("cheatsheet"))}>
                Big O Cheatsheet <span className="ml-3 text-[10px] text-slate-700 font-black tracking-widest">({homeDefaults.caseCards.length})</span>
              </h2>
              <div className="flex-1" />
              <ChevronDown
                className={`w-5 h-5 text-slate-600 group-hover:text-indigo-500 transition-all duration-500 ${collapsedCategories.has("cheatsheet") ? "-rotate-90 opacity-40" : "rotate-0 opacity-100"}`}
              />
            </div>
          </button>

          <AnimatePresence initial={false}>
            {!collapsedCategories.has("cheatsheet") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                <div className="space-y-12 pt-10 pb-14">
                  {/* Concept Cards - 3 Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {homeDefaults.caseCards.map((card) => (
                      <div key={card.label} className="p-8 bg-slate-900/40 border border-slate-800/60 rounded-[1.5rem] space-y-4 hover:border-slate-700 transition-colors shadow-xl">
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-xl ${card.bg} border ${card.border} shadow-lg`}>
                            <card.icon className={`w-5 h-5 ${card.color}`} />
                          </div>
                          <h3 className="font-black text-white text-[13px] uppercase tracking-[0.15em]">{card.label}</h3>
                        </div>
                        <p className="text-slate-500 text-[13px] font-bold leading-relaxed">{card.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Big O Notation Cards - 6 Columns */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {homeDefaults.bigONotations.map((item) => (
                      <div
                        key={item.label}
                        className={`p-6 rounded-[1.25rem] border border-slate-800/60 ${item.bg} space-y-4 group hover:border-slate-700 transition-colors shadow-lg`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[17px] font-black ${item.color.replace("stroke-", "text-")}`}>
                            {item.label}
                          </span>
                          <BigOChart type={item.type} color={item.color} />
                        </div>
                        <div>
                          <div className="text-[11px] font-black text-white uppercase tracking-widest mb-2">
                            {item.name}
                          </div>
                          <p className="text-[12px] text-slate-400 font-bold leading-tight">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Space Complexity Cards - 3 Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {homeDefaults.spaceComplexities.map((item) => (
                      <div
                        key={item.label}
                        className="p-6 rounded-[1.5rem] border border-slate-800/60 bg-indigo-500/5 space-y-4 group hover:border-slate-700 transition-colors shadow-lg"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[15px] font-black text-indigo-400">{item.label}</span>
                          <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">
                            {item.name}
                          </div>
                        </div>
                        <div>
                          <p className="text-[12px] text-slate-500 font-bold leading-relaxed mb-4">{item.desc}</p>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                              {homeDefaults.complexityLabels.examples}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono italic">{item.examples}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Algorithm Explorer */}
        {['Pattern Matching Algorithms', 'Sorting Algorithms', 'Searching Algorithms', 'Pathfinding Algorithms'].map((category) => {
          const categoryAlgorithms = algorithms
            .filter((a) => a.category === category)
            .sort(
              (a, b) =>
                (homeDefaults.difficultyMap[a.difficulty] || 0) - (homeDefaults.difficultyMap[b.difficulty] || 0),
            );

          if (categoryAlgorithms.length === 0) return null;

          const isCollapsed = collapsedCategories.has(category);

          return (
            <div key={category} className="space-y-0">
              <button onClick={() => toggleCategory(category)} className={classCategory.sectionHeader.container}>
                <div className={classCategory.sectionHeader.border}>
                  <div className={classCategory.sectionHeader.iconBox(!isCollapsed)}>{getCategoryIcon(category)}</div>
                  <h2 className={classCategory.sectionHeader.title(!isCollapsed)}>
                    {category}{" "}
                    <span className="ml-3 text-[10px] text-slate-700 font-black tracking-widest">
                      ({categoryAlgorithms.length})
                    </span>
                  </h2>
                  <div className="flex-1" />
                  <ChevronDown
                    className={`w-5 h-5 text-slate-600 group-hover:text-indigo-500 transition-all duration-500 ${isCollapsed ? "-rotate-90 opacity-40" : "rotate-0 opacity-100"}`}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {!isCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className={category === 'Pathfinding Algorithms' ? "grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 pb-14" : classCategory.grid}>
                      {categoryAlgorithms.map((algo) => (
                        <button
                          key={algo.id}
                          type="button"
                          onClick={() => onSelect(algo.id)}
                          className={classCategory.algoCard}
                        >
                          <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500" />

                          <div className="space-y-4 relative z-10 flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors leading-tight">
                                {algo.name}
                              </h3>
                              <span
                                className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border transition-colors ${getDifficultyColor(algo.difficulty)}`}
                              >
                                {algo.difficulty}
                              </span>
                            </div>

                            <p className="text-slate-500 text-[13px] font-bold leading-relaxed line-clamp-3">
                              {algo.description}
                            </p>

                            {algo.complexity && (
                              <div className="pt-2 flex flex-col gap-2">
                                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                                  <div
                                    className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-950/80 border border-slate-800/60 text-[10px] font-black shrink-0"
                                    title="Best Case"
                                  >
                                    <span className="text-slate-600">{homeDefaults.complexityLabels.best}</span>
                                    <span className={getComplexityColor(algo.complexity.timeBest)}>
                                      {algo.complexity.timeBest}
                                    </span>
                                  </div>
                                  <div
                                    className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-950/80 border border-slate-800/60 text-[10px] font-black shrink-0"
                                    title="Average Case"
                                  >
                                    <span className="text-slate-600">{homeDefaults.complexityLabels.avg}</span>
                                    <span className={getComplexityColor(algo.complexity.timeAvg)}>
                                      {algo.complexity.timeAvg}
                                    </span>
                                  </div>
                                  <div
                                    className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-950/80 border border-slate-800/60 text-[10px] font-black shrink-0"
                                    title="Worst Case"
                                  >
                                    <span className="text-slate-600">{homeDefaults.complexityLabels.worst}</span>
                                    <span className={getComplexityColor(algo.complexity.timeWorst)}>
                                      {algo.complexity.timeWorst}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
                                  {algo.complexity.timePre && (
                                    <div
                                      className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-950/80 border border-slate-800/60 text-[10px] font-black shrink-0"
                                      title="Preprocessing Time"
                                    >
                                      <span className="text-slate-600 uppercase tracking-wider">
                                        {homeDefaults.complexityLabels.prep}
                                      </span>
                                      <span className="text-indigo-400">{algo.complexity.timePre}</span>
                                    </div>
                                  )}
                                  <div
                                    className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-950/80 border border-slate-800/60 text-[10px] font-black shrink-0"
                                    title="Space Complexity"
                                  >
                                    <span className="text-slate-600 uppercase tracking-wider">
                                      {homeDefaults.complexityLabels.space}
                                    </span>
                                    <span className="text-indigo-400">{algo.complexity.space}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        <div className="pt-16 border-t border-slate-900 text-center">
          <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">
            &copy; {homeDefaults.footer.copyright}
          </p>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  algorithms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      difficulty: PropTypes.string,
      description: PropTypes.string,
      complexity: PropTypes.shape({
        timeBest: PropTypes.string,
        timeAvg: PropTypes.string,
        timeWorst: PropTypes.string,
        space: PropTypes.string,
      }),
    }),
  ).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};
