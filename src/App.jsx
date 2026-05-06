import { BrowserRouter } from "react-router-dom";
import { algorithms } from "@/core/constants/index";
import { AppRouter } from "@/router";
import { useUrlResolver } from "@/core/hooks";
import Background from "@/components/common/Background";

export default function App() {
  return (
    <BrowserRouter basename="/algorithms">
      <div className="relative min-h-screen text-slate-200 overflow-hidden font-outfit">
        <Background />
        <AppContent />
      </div>
    </BrowserRouter>
  );
}

function AppContent() {
  const stateManager = useUrlResolver(algorithms);
  return (
    <AppRouter
      categories={[...new Set(algorithms.map((a) => a.category).filter(Boolean))]}
      algorithms={algorithms}
      stateManager={stateManager}
    />
  );
}
