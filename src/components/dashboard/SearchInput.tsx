"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useDashboardFilters } from "./DashboardFilters";

const OVERVIEW_PATH = "/dashboard";

type SearchInputProps = {
  className?: string;
};

export function SearchInput({ className }: SearchInputProps) {
  const { query, setQuery } = useDashboardFilters();
  const pathname = usePathname();
  const router = useRouter();
  // Voorkomt een history-entry per toetsaanslag terwijl de navigatie nog loopt.
  const navigatingFrom = useRef<string | null>(null);

  useEffect(() => {
    if (pathname === OVERVIEW_PATH) navigatingFrom.current = null;
  }, [pathname]);

  function handleChange(value: string) {
    setQuery(value);
    // De resultaten staan op het overzicht; vanaf een andere pagina gaan we daarheen.
    if (pathname !== OVERVIEW_PATH && navigatingFrom.current !== pathname) {
      navigatingFrom.current = pathname;
      router.push(OVERVIEW_PATH);
    }
  }

  return (
    <div className={cn("relative", className)}>
      <Search
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="search"
        value={query}
        onChange={(event) => handleChange(event.target.value)}
        placeholder="Zoek in jullie momenten..."
        aria-label="Zoeken op titel of tag"
        className="h-10 rounded-full border-2 bg-paper pr-9 pl-9 shadow-retro-sm [&::-webkit-search-cancel-button]:hidden"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          aria-label="Zoekterm wissen"
          className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full hover:bg-muted"
        >
          <X aria-hidden className="size-4" />
        </button>
      )}
    </div>
  );
}
