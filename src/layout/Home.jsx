import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ChevronDown, Layers, Search, Map, Zap, HelpCircle } from "lucide-react";
import { BigOChart, CategorySection } from "@/components/UI";
import { homeDefaults } from "@/constants/home";
import { classCategories } from "@/styles/divClassCustom";
import { globalTheme } from "@/styles/globalTheme";

const ICON_MAP = {
  Layers,
  Search,
  Map,
  Zap,
  HelpCircle,
};

const localTheme = {
  container: `min-h-screen bg-transparent text-${globalTheme.colors.textHigh} p-8 md:p-12 font-sans relative`,
  wrapper: "max-w-[1400px] mx-auto space-y-6 relative z-10",
  header: "text-center space-y-6 pt-12",
  badge: `inline-flex items-center gap-3 px-4 py-2 rounded-full bg-${globalTheme.colors.primary}/10 border border-${globalTheme.colors.primary}/20 text-${globalTheme.colors.primaryLight} ${globalTheme.typography.sizes.baseSmall} font-black uppercase tracking-[0.2em]`,
  conceptCard: `p-5 bg-slate-900/40 border border-slate-800/60 ${classCategories.cardRound} space-y-4 hover:border-slate-700 transition-colors shadow-xl`,
  iconBox: "p-2 rounded-xl bg-slate-950 border border-slate-800",
  notationCard: `p-4 ${classCategories.cardRound} border border-slate-800/60 space-y-3 flex flex-col justify-between`,
  complexityCard: `p-4 ${classCategories.cardRound} border border-slate-800/60 bg-indigo-500/5 space-y-3 group hover:border-slate-700 transition-colors shadow-xl`,
  footer: `pt-24 border-t border-${globalTheme.colors.borderStrong} text-center`,
  copyright: `${globalTheme.typography.sizes.baseSmall} font-black text-${globalTheme.colors.textDisabled} uppercase tracking-[0.5em]`,
  homeTitle: `${globalTheme.typography.semantics.home.title} font-black text-${globalTheme.colors.textHigh} tracking-tight mb-2`,
  homeSubtitle: `${globalTheme.typography.semantics.home.subtitle} font-medium text-${globalTheme.colors.textMuted} max-w-2xl mx-auto mb-4`,
  sectionHeader: {
    container: "w-full group focus:outline-none",
    border: `flex items-center gap-4 py-3 border-b border-${globalTheme.colors.borderStrong} transition-colors group-hover:border-${globalTheme.colors.border}`,
    iconBox: (active) =>
      `p-2 transition-all rounded-xl ${active ? `bg-${globalTheme.colors.primary} text-${globalTheme.colors.textHigh} shadow-[0_0_15px_rgba(99,102,241,0.3)]` : `bg-slate-900 text-${globalTheme.colors.textDisabled}`}`,
    title: (active) =>
      `${globalTheme.typography.semantics.home.section} font-black uppercase tracking-normal transition-colors ${active ? `text-${globalTheme.colors.textHigh}` : `text-${globalTheme.colors.textDisabled}`}`,
  },
};

export default function Home({ algorithms, categories, onSelect }) {
  const [collapsedCategories, setCollapsedCategories] = useState(new Set(["cheatsheet", ...(categories || [])]));

  const groupedAlgorithms = useMemo(() => {
    return (algorithms || []).reduce((acc, algo) => {
      const cat = algo.category || "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(algo);
      return acc;
    }, {});
  }, [algorithms]);

  const toggleCategory = (category) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  const getCategoryIcon = (category) => {
    const iconName = homeDefaults.categoryMeta[category] || homeDefaults.categoryMeta.default;
    const Icon = ICON_MAP[iconName] || ICON_MAP.HelpCircle;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <div className={localTheme.container}>
      <div className={localTheme.wrapper}>
        {/* Header */}
        <div className={localTheme.header}>
          <div className={localTheme.badge}>
            <Zap className="w-4 h-4" /> {homeDefaults.hero.badge}
          </div>
          <h1 className={localTheme.homeTitle}>
            {homeDefaults.hero.title} <span className="text-indigo-500">{homeDefaults.hero.titleAccent}</span>
          </h1>
          <p className={localTheme.homeSubtitle}>{homeDefaults.hero.description}</p>
        </div>

        {/* Big O Reference */}
        <div className="space-y-0">
          <button onClick={() => toggleCategory("cheatsheet")} className={localTheme.sectionHeader.container}>
            <div className={localTheme.sectionHeader.border}>
              <div className={localTheme.sectionHeader.iconBox(!collapsedCategories.has("cheatsheet"))}>
                <FileText className="w-5 h-5" />
              </div>
              <h2 className={localTheme.sectionHeader.title(!collapsedCategories.has("cheatsheet"))}>
                Big O Cheatsheet{" "}
                <span
                  className={`ml-4 ${globalTheme.typography.sizes.baseSmall} text-slate-700 font-black tracking-[0.1em]`}
                >
                  ({homeDefaults.caseCards.length})
                </span>
              </h2>
              <div className="flex-1" />
              <ChevronDown
                className={`w-8 h-8 text-slate-600 group-hover:text-indigo-500 transition-all duration-500 ${collapsedCategories.has("cheatsheet") ? "-rotate-90 opacity-40" : "rotate-0 opacity-100"}`}
              />
            </div>
          </button>

          <AnimatePresence initial={false}>
            {!collapsedCategories.has("cheatsheet") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="overflow-hidden"
              >
                <div className="space-y-12 pt-8 pb-12">
                  {/* Concept Cards - 3 Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {homeDefaults.caseCards.map((card) => (
                      <div key={card.label} className={localTheme.conceptCard}>
                        <div className="flex items-center gap-4">
                          <div className={`${localTheme.iconBox} ${card.color}`}>
                            <card.icon className="w-5 h-5" />
                          </div>
                          <h3
                            className={`font-black text-white ${globalTheme.typography.sizes.baseSmall} uppercase tracking-[0.1em]`}
                          >
                            {card.label}
                          </h3>
                        </div>
                        <p
                          className={`text-slate-500 ${globalTheme.typography.sizes.baseSmall} font-medium leading-relaxed`}
                        >
                          {card.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Big O Notation Cards - 6 Columns */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {homeDefaults.bigONotations.map((item) => (
                      <div key={item.label} className={`${localTheme.notationCard} ${item.bg}`}>
                        <div className="flex items-center justify-between">
                          <span
                            className={`${globalTheme.typography.sizes.header} font-black ${item.color.replace("stroke-", "text-")}`}
                          >
                            {item.label}
                          </span>
                          <BigOChart type={item.type} color={item.color} />
                        </div>
                        <div>
                          <div
                            className={`${globalTheme.typography.sizes.subtext} font-black text-white uppercase tracking-[0.1em] mb-1`}
                          >
                            {item.name}
                          </div>
                          <p
                            className={`${globalTheme.typography.sizes.subtext} text-slate-500 font-medium leading-snug line-clamp-2`}
                          >
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Space Complexity Cards - 3 Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {homeDefaults.spaceComplexities.map((item) => (
                      <div key={item.label} className={localTheme.complexityCard}>
                        <div className="flex items-center justify-between">
                          <span className={`${globalTheme.typography.sizes.baseSmall} font-black text-indigo-400`}>
                            {item.label}
                          </span>
                          <div
                            className={`${globalTheme.typography.sizes.subtext} font-black text-white/30 uppercase tracking-[0.2em]`}
                          >
                            {item.name}
                          </div>
                        </div>
                        <div>
                          <p
                            className={`${globalTheme.typography.sizes.subtext} text-slate-500 font-medium leading-relaxed mb-4`}
                          >
                            {item.desc}
                          </p>
                          <div className="flex items-center gap-2">
                            <span
                              className={`${globalTheme.typography.sizes.subtext} font-black text-indigo-500/50 uppercase`}
                            >
                              EX:
                            </span>
                            <span
                              className={`${globalTheme.typography.sizes.subtext} text-slate-600 font-mono italic truncate`}
                            >
                              {item.examples}
                            </span>
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
        <div className="space-y-0">
          {Object.keys(groupedAlgorithms).map((category) => (
            <CategorySection
              key={category}
              category={category}
              algorithms={groupedAlgorithms[category]}
              icon={getCategoryIcon(category)}
              isCollapsed={collapsedCategories.has(category)}
              toggleCollapse={() => toggleCategory(category)}
              onSelect={onSelect}
            />
          ))}
        </div>

        <div className={localTheme.footer}>
          <p className={localTheme.copyright}>&copy; {homeDefaults.footer.copyright}</p>
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
