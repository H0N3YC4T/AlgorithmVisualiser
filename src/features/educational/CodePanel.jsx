import { useState, memo, useMemo } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("pseudo", js); // Use JS for pseudo
import PropTypes from "prop-types";
import { Terminal, Copy, Check } from "lucide-react";
import { uiDefaults } from "@/core/constants/ui";
import { classCategories } from "@/styles/divClassCustom";


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
        <h3 className={classCategories.smallHeading}>
          <Terminal className="w-4 h-4" /> {uiDefaults.codePanel.title}
        </h3>
        <div className="flex items-center gap-4">
          <div className={classCategories.controlGroup}>
            {Object.keys(uiDefaults.codePanel.languages).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveTab(lang)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === lang
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
                }`}
              >
                {uiDefaults.codePanel.languages[lang]}
              </button>
            ))}
          </div>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="relative group flex-1">
        <SyntaxHighlighter
          language={activeTab}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1.25rem",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.6",
          }}
          showLineNumbers={true}
          wrapLines={true}
          lineProps={(lineNumber) => {
            const isHighlighted = Array.isArray(activeLine)
              ? activeLine.includes(lineNumber)
              : lineNumber === activeLine;

            return {
              style: {
                display: "block",
                backgroundColor: isHighlighted ? "rgba(99, 102, 241, 0.15)" : "transparent",
                borderLeft: isHighlighted ? "3px solid #6366f1" : "3px solid transparent",
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
