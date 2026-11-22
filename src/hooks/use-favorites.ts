"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "babybaas:favorites";
const CHANGE_EVENT = "babybaas:favorites-change";

export type FavoriteOverrides = Record<string, boolean>;

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Leest de opgeslagen favorieten. Ongeldige JSON, arrays en niet-booleaanse
 * waarden (bijv. handmatig aangepaste opslag) worden genegeerd.
 */
export function parseFavoriteOverrides(raw: string | null): FavoriteOverrides {
  if (!raw) return {};
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, boolean] => typeof entry[1] === "boolean",
    ),
  );
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
  const overrides = useMemo(() => parseFavoriteOverrides(raw), [raw]);

  const isFavorite = useCallback(
    (id: string, fallback: boolean) => overrides[id] ?? fallback,
    [overrides],
  );

  const setFavorite = useCallback((id: string, value: boolean) => {
    const next = { ...parseFavoriteOverrides(readRaw()), [id]: value };
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
