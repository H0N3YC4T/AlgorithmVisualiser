import { BrowserRouter } from "react-router-dom";
import { algorithms } from "@/algorithmConfigs";
import { AppRouter } from "@/router";
import { useVisualizationManager } from "@/hooks/useVisualizationManager";
import { Background } from "@/components/UI";

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
  const stateManager = useVisualizationManager(algorithms);
  return <AppRouter algorithms={algorithms} stateManager={stateManager} />;
}
