"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "babybaas:favorites";
const CHANGE_EVENT = "babybaas:favorites-change";

type FavoriteOverrides = Record<string, boolean>;

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function parse(raw: string | null): FavoriteOverrides {
  if (!raw) return {};
  try {
    const value: unknown = JSON.parse(raw);
    return value && typeof value === "object" ? (value as FavoriteOverrides) : {};
  } catch {
    return {};
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/**
 * Favoriet-status per item, lokaal bewaard in `localStorage`.
 * Zonder opgeslagen keuze geldt de standaardwaarde uit de data.
 */
export function useFavorites() {
  const raw = useSyncExternalStore(subscribe, readRaw, () => null);
  const overrides = useMemo(() => parse(raw), [raw]);

  const isFavorite = useCallback(
    (id: string, fallback: boolean) => overrides[id] ?? fallback,
    [overrides],
  );

  const setFavorite = useCallback((id: string, value: boolean) => {
    const next = { ...parse(readRaw()), [id]: value };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Opslag niet beschikbaar (bijv. privévenster); keuze blijft niet bewaard.
      return;
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { isFavorite, setFavorite };
}
