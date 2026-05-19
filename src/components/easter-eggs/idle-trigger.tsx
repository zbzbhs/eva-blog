"use client";

import { useEffect, useState } from "react";

export function useIdleTimer(timeout: number = 5000) {
  const [idleTrigger, setIdleTrigger] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIdleTrigger((prev) => prev + 1);
      }, timeout);
    };

    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [timeout]);

  return idleTrigger;
}
