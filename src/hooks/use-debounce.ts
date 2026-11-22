"use client";

import { useEffect, useState } from "react";

/** Geeft `value` pas door nadat die `delay` ms niet is veranderd. */
export function useDebounce<T>(value: T, delay = 200): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
