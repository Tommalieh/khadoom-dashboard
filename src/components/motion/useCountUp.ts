"use client";

import { useEffect, useMemo, useState } from "react";

export function useCountUp(value: number, durationMs = 650) {
  const [display, setDisplay] = useState(0);

  const start = useMemo(() => display, []); // initial baseline once

  useEffect(() => {
    const from = start;
    const to = value;
    const startTime = performance.now();

    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - startTime) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, durationMs]);

  return display;
}
