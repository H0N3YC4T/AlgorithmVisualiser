import { BrowserRouter } from "react-router-dom";
import { algorithms } from "./core/constants/index";
import { AppRouter } from "./router";
import { useAlgorithmState } from "./hooks/useAlgorithmState";
import Background from "./components/common/Background";

/**
 * Main Application Component
 *
 * Objectives:
 * 1. Global state management via useAlgorithmState hook.
 * 2. Navigation management via AppRouter.
 * 3. Consistent styling and background.
 */
export default function App() {
  const stateManager = useAlgorithmState(algorithms);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#050505] text-slate-200 overflow-hidden font-outfit">
        {/* Persistent Background */}
        <Background />

        {/* Dynamic Content */}
        <AppRouter categories={[...new Set(algorithms.map((a) => a.category).filter(Boolean))]} algorithms={algorithms} stateManager={stateManager} />
      </div>
    </BrowserRouter>
  );
}
