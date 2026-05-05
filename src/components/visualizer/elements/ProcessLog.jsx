import PropTypes from "prop-types";
import { memo } from "react";
import { Info, CheckCircle2, AlertCircle, ArrowRightCircle } from "lucide-react";

const ProcessLog = memo(({ log, algorithm }) => {
  const logStyles = {
    info: {
      text: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/30",
      icon: <Info className="w-4 h-4" />,
    },
    match: {
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
    mismatch: {
      text: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
      icon: <AlertCircle className="w-4 h-4" />,
    },
    success: {
      text: "text-emerald-400",
      bg: "bg-emerald-500/20",
      border: "border-emerald-500/50",
      icon: <CheckCircle2 className="w-4 h-4" />,
    },
    shift: {
      text: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      icon: <ArrowRightCircle className="w-4 h-4" />,
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
    <div
      className={`p-6 rounded-2xl border transition-all duration-500 ${style.bg} ${style.border} shadow-2xl min-h-[240px] h-full flex flex-col`}
    >
      <div className={`flex items-center gap-2 mb-4 ${style.text}`}>
        {style.icon}
        <span className="text-xs font-black uppercase tracking-[0.2em]">{log?.title}</span>
      </div>
      <div className="font-mono text-[13px] leading-relaxed whitespace-pre-line text-slate-100 font-medium flex-1">
        {resolvedContent}
      </div>
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
