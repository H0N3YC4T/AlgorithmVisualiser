import { useState, useEffect, useCallback, useRef } from 'react';

export default function useVisualizerPlayback(nextStep, reset, isFinished, speed = 500) {
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef(null);

  const stopPlay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stopPlay();
    } else {
      if (isFinished) {
        reset();
      }
      setIsPlaying(true);
    }
  }, [isPlaying, isFinished, reset, stopPlay]);

  useEffect(() => {
    if (isPlaying && !isFinished) {
      timerRef.current = setInterval(() => {
        nextStep();
      }, speed);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isFinished, nextStep, speed]);

  return { isPlaying, togglePlay, stopPlay };
}
