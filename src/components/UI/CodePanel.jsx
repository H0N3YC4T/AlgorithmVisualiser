import { useState, memo, useMemo } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import PropTypes from "prop-types";
import { Terminal, Copy, Check } from "lucide-react";
import { uiDefaults } from "@/constants/ui";
import { classCategories } from "@/styles/divClassCustom";
import { algorithmPageTheme as apt } from "@/styles/localThemes/algorithmPageTheme";

const localTheme = {
  tabBtn: (isActive) =>
    `px-3 py-1.5 rounded-xl ${apt.button} transition-all ${
      isActive
        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
        : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
    }`,
  copyBtn: "p-2 hover:bg-slate-800 rounded-xl text-slate-500 hover:text-white transition-colors",
  codeTitle: apt.codeTitle,
  visualiserTitle: apt.visualiserTitle,
  syntaxStyle: {
    margin: 0,
    padding: "1.25rem",
    background: "transparent",
    fontSize: apt.code.split(" ")[0].includes("text-[") ? apt.code.split(" ")[0].replace("text-[", "").replace("]", "") : "14px",
    lineHeight: "1.6",
  },
};

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("pseudo", js);

const CodePanel = memo(({ codeSnippets, lineHighlights, activeStep }) => {
  const [activeTab, setActiveTab] = useState("javascript");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Determine which line to highlight based on the current activeStep and active language
  const activeLine = useMemo(() => lineHighlights?.[activeStep]?.[activeTab], [lineHighlights, activeStep, activeTab]);

  if (!codeSnippets) return null;

  return (
    <div className={classCategories.subPanel}>
      <div className={classCategories.subPanelHeader}>
        <h3 className={`${localTheme.codeTitle} flex items-center gap-2`}>
          <Terminal className="w-4 h-4" /> {uiDefaults.codePanel.title}
        </h3>
        <div className="flex items-center gap-4">
          <div className={classCategories.controlGroup}>
            {Object.keys(uiDefaults.codePanel.languages).map((lang) => (
              <button key={lang} onClick={() => setActiveTab(lang)} className={localTheme.tabBtn(activeTab === lang)}>
                {uiDefaults.codePanel.languages[lang]}
              </button>
            ))}
          </div>
          <button onClick={handleCopy} className={localTheme.copyBtn}>
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="relative group flex-1">
        <SyntaxHighlighter
          language={activeTab}
          style={vscDarkPlus}
          customStyle={localTheme.syntaxStyle}
          showLineNumbers={true}
          wrapLines={true}
          lineProps={(lineNumber) => {
            const isHighlighted = Array.isArray(activeLine)
              ? activeLine.includes(lineNumber)
              : lineNumber === activeLine;

            return {
              style: {
                display: "block",
                backgroundColor: isHighlighted ? "rgba(186, 140, 242, 0.11)" : "transparent",
                borderLeft: isHighlighted ? "3px solid #7f81e6ff" : "3px solid transparent",
                paddingLeft: "0.75rem",
                marginLeft: "-1.25rem",
                marginRight: "-1.25rem",
                transition: "all 0.3s ease",
              },
            };
          }}
        >
          {codeSnippets[activeTab]}
        </SyntaxHighlighter>
      </div>
    </div>
  );
});

CodePanel.propTypes = {
  codeSnippets: PropTypes.objectOf(PropTypes.string).isRequired,
  lineHighlights: PropTypes.object,
  activeStep: PropTypes.string,
};

export default CodePanel;
