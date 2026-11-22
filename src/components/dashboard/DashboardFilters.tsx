"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useDebounce } from "@/hooks/use-debounce";
import type { ContentCategory } from "@/types/dashboard";

const SEARCH_DEBOUNCE_MS = 200;

type DashboardFiltersValue = {
  /** Wat er in het zoekveld staat (direct). */
  query: string;
  setQuery: (query: string) => void;
  /** De zoekterm waarop gefilterd wordt (gedebounced; wissen werkt direct). */
  searchQuery: string;
  categories: ContentCategory[];
  toggleCategory: (category: ContentCategory) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
};

const DashboardFiltersContext = createContext<DashboardFiltersValue | null>(
  null,
);

export function DashboardFiltersProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const debouncedQuery = useDebounce(query, SEARCH_DEBOUNCE_MS);
  const searchQuery = query.trim() === "" ? "" : debouncedQuery;

  const toggleCategory = useCallback((category: ContentCategory) => {
    setCategories((current) =>
      current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setQuery("");
    setCategories([]);
  }, []);

  const value = useMemo(
    () => ({
      query,
      setQuery,
      searchQuery,
      categories,
      toggleCategory,
      clearFilters,
      hasActiveFilters: searchQuery.trim() !== "" || categories.length > 0,
    }),
    [query, searchQuery, categories, toggleCategory, clearFilters],
  );

  return (
    <DashboardFiltersContext value={value}>{children}</DashboardFiltersContext>
  );
}

export function useDashboardFilters(): DashboardFiltersValue {
  const context = useContext(DashboardFiltersContext);
  if (!context) {
    throw new Error(
      "useDashboardFilters moet binnen DashboardFiltersProvider worden gebruikt",
    );
  }
  return context;
}
