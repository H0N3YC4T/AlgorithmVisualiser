import { Routes, Route, useParams, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "../layout/Home";
import VisualizerFrame from "../layout/VisualizerFrame";

/**
 * AppRouter Component
 * Uses react-router-dom to manage navigation between algorithms.
 */
export const AppRouter = ({ categories, algorithms, stateManager }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home categories={categories} algorithms={algorithms} onSelect={(id) => stateManager.setSelectedAlgoId(id)} />
        }
      />

      <Route
        path="/visualizer/:algoId"
        element={<VisualizerWrapper stateManager={stateManager} algorithms={algorithms} />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const VisualizerWrapper = ({ stateManager, algorithms }) => {
  const { algoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (algoId && stateManager.selectedAlgoId !== algoId) {
      const exists = algorithms.some((a) => a.id === algoId);
      if (exists) {
        stateManager.setSelectedAlgoId(algoId);
      } else {
        navigate("/");
      }
    }
  }, [algoId, stateManager, algorithms, navigate]);

  return (
    <VisualizerFrame
      key={stateManager.algorithm.id}
      algorithm={stateManager.algorithm}
      state={stateManager.state}
      target={stateManager.target}
      setTarget={stateManager.setTarget}
      pattern={stateManager.pattern}
      setPattern={stateManager.setPattern}
      softReset={stateManager.softReset}
      factoryReset={stateManager.factoryReset}
      nextStep={stateManager.nextStep}
      prevStep={stateManager.prevStep}
      updateState={stateManager.updateState}
      toggleWall={stateManager.toggleWall}
      history={stateManager.history}
      preprocessing={stateManager.preprocessing}
      canPrev={stateManager.history.length > 0}
      canNext={!stateManager.state.isFinished}
      onBack={() => navigate("/")}
      gridTool={stateManager.gridTool}
      setGridTool={stateManager.setGridTool}
    />
  );
};
