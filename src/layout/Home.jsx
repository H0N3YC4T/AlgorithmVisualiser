import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ChevronDown, Zap } from "lucide-react";
import { BigOChart, CategorySection } from "@/components/UI";
import { homeDefaults } from "@/constants/home";
import { HOME_CATEGORIES } from "@/algorithmConfigs/categories";
import { globalTheme } from "@/styles/globalTheme";
import { classCategories } from "@/styles/divClassCustom";
import { cheatsheetConfig } from "@/algorithmConfigs/cheatsheetConfig";

const homeTheme = {
  container: `bg-transparent text-${globalTheme.colors.textHigh} font-sans relative`,
  wrapper: "min-h-screen max-w-[1200px] mx-auto z-10 grow",
  header: "text-center space-y-4 pt-4",
  homeTitle: `${globalTheme.typography.semantics.home.title} font-black text-${globalTheme.colors.textHigh} tracking-tight mb-2`,
  conceptCard: `p-5 bg-slate-900/40 border border-slate-800/60 ${classCategories.cardRound} space-y-4 hover:border-slate-700 transition-colors shadow-xl`,
  iconBox: "p-2 rounded-xl bg-slate-950 border border-slate-800",
  notationCard: `p-4 ${classCategories.cardRound} border border-slate-800/60 space-y-3 flex flex-col justify-between`,
  complexityCard: `p-4 ${classCategories.cardRound} border border-slate-800/60 bg-indigo-500/5 space-y-3 group hover:border-slate-700 transition-colors shadow-xl`,
  footer: `text-center border-t border-${globalTheme.colors.borderStrong}`,
  copyright: `pt-2 pb-2 font-black ${globalTheme.typography.sizes.baseSmall} text-${globalTheme.colors.textDisabled} uppercase ${globalTheme.typography.tracking.wider}`,
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

export default function Home({ algorithms, onSelect }) {
  const [collapsedCategories, setCollapsedCategories] = useState(
    new Set(["cheatsheet", ...HOME_CATEGORIES.map((cat) => cat.id)]),
  );

  const groupedAlgorithms = useMemo(() => {
    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };

    // Initialize groups to ensure sections appear even if empty (though we hide empty ones in CategorySection)
    const grouped = {};
    HOME_CATEGORIES.forEach((cat) => (grouped[cat.id] = []));

    (algorithms || []).forEach((algo) => {
      const catId = algo.metadata?.category || algo.category || "Other";
      if (!grouped[catId]) grouped[catId] = [];
      grouped[catId].push(algo);
    });

    // Sort each category by difficulty (primary) and name (secondary)
    Object.keys(grouped).forEach((catId) => {
      grouped[catId].sort((a, b) => {
        const diffA = difficultyOrder[(a.homeCard?.difficulty || "Medium").toLowerCase()] || 2;
        const diffB = difficultyOrder[(b.homeCard?.difficulty || "Medium").toLowerCase()] || 2;

        if (diffA !== diffB) return diffA - diffB;
        return (a.homeCard?.name || "").localeCompare(b.homeCard?.name || "");
      });
    });

    return grouped;
  }, [algorithms]);

  const toggleCategory = (category) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  return (
    <div className={homeTheme.container}>
      <div className={homeTheme.wrapper}>
        {/* Header */}
        <div className={homeTheme.header}>
          <h1 className={homeTheme.homeTitle}>
            {homeDefaults.hero.title} <span className="text-indigo-500">{homeDefaults.hero.titleAccent}</span>
          </h1>
          <p className={homeTheme.homeSubtitle}>{homeDefaults.hero.description}</p>
        </div>

        {/* Big O Reference */}
        <div className="space-y-0">
          <button onClick={() => toggleCategory("cheatsheet")} className={homeTheme.sectionHeader.container}>
            <div className={homeTheme.sectionHeader.border}>
              <div className={homeTheme.sectionHeader.iconBox(!collapsedCategories.has("cheatsheet"))}>
                <FileText className="w-5 h-5" />
              </div>
              <h2 className={homeTheme.sectionHeader.title(!collapsedCategories.has("cheatsheet"))}>
                Big O Cheatsheet{" "}
                <span
                  className={`ml-4 ${globalTheme.typography.sizes.baseSmall} text-slate-700 font-black tracking-[0.1em]`}
                >
                  ({cheatsheetConfig.caseCards.length})
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
                <div className="space-y-4">
                  {/* Concept Cards - 3 Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                    {cheatsheetConfig.caseCards.map((card) => (
                      <div key={card.label} className={homeTheme.conceptCard}>
                        <div className="flex items-center gap-4">
                          <div className={`${homeTheme.iconBox} ${card.color}`}>
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
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {cheatsheetConfig.bigONotations.map((item) => (
                      <div key={item.label} className={`${homeTheme.notationCard} ${item.bg}`}>
                        <div className="flex items-center justify-between">
                          <span
                            className={`${globalTheme.typography.sizes.header} font-black ${item.color.replace("stroke-", "text-")}`}
                          >
                            {item.label}
                          </span>
                          <BigOChart type={item.type} color={item.color} />
                        </div>
                        <div className="h-full">
                          <div
                            className={`${globalTheme.typography.sizes.baseLarge} font-black text-white uppercase tracking-[0.1em] mb-1`}
                          >
                            {item.name}
                          </div>
                          <p
                            className={`${globalTheme.typography.sizes.subtext} text-slate-500 font-medium leading-snug items-center `}
                          >
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Space Complexity Cards - 3 Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cheatsheetConfig.spaceComplexities.map((item) => (
                      <div key={item.label} className={homeTheme.complexityCard}>
                        <div className="flex items-center justify-between">
                          <span className={`${globalTheme.typography.sizes.baseLarge} font-black text-indigo-400`}>
                            {item.label}
                          </span>
                          <div
                            className={`${globalTheme.typography.sizes.baseLarge} font-black text-white/40 uppercase tracking-[0.2em]`}
                          >
                            {item.name}
                          </div>
                        </div>
                        <div>
                          <p
                            className={`${globalTheme.typography.sizes.baseSmall} text-slate-500 font-medium leading-relaxed mb-4`}
                          >
                            {item.desc}
                          </p>
                          <div className="flex items-center gap-2">
                            <span
                              className={`${globalTheme.typography.sizes.baseSmall} font-black text-indigo-500/50 uppercase`}
                            >
                              EX:
                            </span>
                            <span
                              className={`${globalTheme.typography.sizes.baseSmall} text-slate-600 font-mono italic truncate`}
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
          {HOME_CATEGORIES.map((cat) => (
            <CategorySection
              key={cat.id}
              category={cat.name}
              algorithms={groupedAlgorithms[cat.id]}
              icon={cat.icon}
              cols={cat.cols}
              isCollapsed={collapsedCategories.has(cat.id)}
              toggleCollapse={() => toggleCategory(cat.id)}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
      <footer className={`${homeTheme.footer}`}>
        <div className={`${homeTheme.copyright}`}>© 2026 Interactive Visualizer Platform</div>
      </footer>
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
  onSelect: PropTypes.func.isRequired,
};
