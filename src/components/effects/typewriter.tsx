"use client";

import { useEffect, useState, useRef } from "react";

interface Props {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({ text, speed = 40, className, onComplete }: Props) {
  const [displayed, setDisplayed] = useState("");
  const [cursor, setCursor] = useState(true);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const type = () => {
      if (cancelled) return;
      if (i < text.length) {
        // Random stutter: 5-15% chance of extra delay
        const stutterChance = Math.random();
        const stutterDelay =
          stutterChance > 0.85
            ? speed * (3 + Math.random() * 5)
            : stutterChance > 0.95
            ? speed * (6 + Math.random() * 10)
            : speed;

        setDisplayed(text.slice(0, i + 1));
        i++;
        timeout = setTimeout(type, stutterDelay);
      } else {
        onCompleteRef.current?.();
      }
    };

    timeout = setTimeout(type, speed);

    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setCursor((c) => !c);
    }, 530);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      <span
        className="text-eva-red"
        style={{ opacity: cursor ? 1 : 0 }}
      >
        ▌
      </span>
    </span>
  );
}
