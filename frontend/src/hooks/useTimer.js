import { useRef, useCallback } from "react";

export function useTimer() {
  const startRef = useRef(null);

  const start = useCallback(() => {
    startRef.current = performance.now();
  }, []);

  const stop = useCallback(() => {
    if (startRef.current === null) return 0;
    return (performance.now() - startRef.current) / 1000;
  }, []);

  return { start, stop };
}
