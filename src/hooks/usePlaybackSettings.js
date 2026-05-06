import { useState } from "react";

/**
 * usePlaybackSettings Hook
 * Handles the playback rate state.
 */
export const usePlaybackSettings = (initialRate = 2.45) => {
  const [playbackRate, setPlaybackRate] = useState(initialRate);

  return {
    playbackRate,
    setPlaybackRate,
  };
};
