import PropTypes from "prop-types";
import { memo } from "react";
import { Info, CheckCircle2, AlertCircle, ArrowRightCircle } from "lucide-react";
import { classCategories } from "@/styles/divClassCustom";
import { globalTheme } from "@/styles/globalTheme";

const localTheme = {
  container: (style) =>
    `p-8 ${classCategories.cardRound} border transition-all duration-500 ${style.bg} ${style.border} shadow-2xl min-h-[300px] h-full flex flex-col backdrop-blur-sm shadow-inner`,
  title: `${globalTheme.typography.sizes.subtext} font-black uppercase tracking-[0.25em]`,
  content: `font-mono ${globalTheme.typography.semantics.home.subtitle} leading-relaxed whitespace-pre-line text-slate-100 font-bold flex-1`,
};

const ProcessLog = memo(({ log, algorithm }) => {
  const logStyles = {
    info: {
      text: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/30",
      icon: <Info className="w-5 h-5" />,
    },
    match: {
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    mismatch: {
      text: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
      icon: <AlertCircle className="w-5 h-5" />,
    },
    success: {
      text: "text-emerald-400",
      bg: "bg-emerald-500/20",
      border: "border-emerald-500/50",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    shift: {
      text: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      icon: <ArrowRightCircle className="w-5 h-5" />,
    },
  };

  const style = logStyles[log?.type] || logStyles.info;

  const resolvedContent = (() => {
    if (!log) return "";
    const msgKey = log.messageKey;

    // Check in standard stepMessages OR visualSteps[key].message
    const template = algorithm?.stepMessages?.[msgKey] || algorithm?.visualSteps?.[msgKey]?.message;
    if (!template) return log.content || "";

    return template.replace(/{(\w+)}/g, (_, key) => {
      const val = log.params?.[key];
      return val !== undefined ? val : `{${key}}`;
    });
  })();

  return (
    <div className={localTheme.container(style)}>
      <div className={`flex items-center gap-3 mb-6 ${style.text}`}>
        {style.icon}
        <span className={localTheme.title}>{log?.title}</span>
      </div>
      <div className={localTheme.content}>{resolvedContent}</div>
    </div>
  );
});

ProcessLog.propTypes = {
  log: PropTypes.shape({
    type: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    messageKey: PropTypes.string,
    params: PropTypes.object,
  }),
  algorithm: PropTypes.object,
};

export default ProcessLog;
