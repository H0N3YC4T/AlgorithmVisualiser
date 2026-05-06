import { useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * useNavigationState Hook
 * Handles algorithm selection and URL synchronization.
 */
export const useNavigationState = (algorithms) => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedAlgoId = useMemo(() => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    const id = pathParts[pathParts.length - 1];
    return algorithms.some((a) => a.id === id) ? id : algorithms[0].id;
  }, [location.pathname, algorithms]);

  const algorithm = useMemo(() => {
    return algorithms.find((a) => a.id === selectedAlgoId);
  }, [selectedAlgoId, algorithms]);

  const setSelectedAlgoId = useCallback(
    (id) => {
      if (id === selectedAlgoId) return;
      navigate(`/${id}`);
    },
    [selectedAlgoId, navigate],
  );

  return {
    selectedAlgoId,
    setSelectedAlgoId,
    algorithm,
    onBack: () => navigate("/"),
  };
};
