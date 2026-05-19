// src/components/search/search-box.tsx
"use client";

import { useState, useRef } from "react";

interface Props {
  onSearch: (query: string) => void;
}

export function SearchBox({ onSearch }: Props) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="font-mono text-sm mb-4">
      <div
        className="flex items-center gap-2 bg-eva-black border border-eva-purple rounded px-3 py-2 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <span className="text-eva-red shrink-0">&gt;</span>
        <span className={focused ? "text-text-muted" : "text-text-secondary"}>
          SEARCH_ARCHIVE:
        </span>
        <input
          ref={inputRef}
          type="text"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onSearch(e.target.value)}
          className="bg-transparent border-none outline-none text-text-primary flex-1 font-mono text-sm"
          placeholder="_"
        />
        {focused && (
          <span className="text-eva-red cursor-blink">▊</span>
        )}
      </div>
    </div>
  );
}
