"use client";

import { useMemo } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { filterContentItems } from "@/lib/content-filter";
import { CONTENT_ITEMS } from "@/lib/mock-data";
import type { ContentItem } from "@/types/dashboard";
import { ContentCard } from "./ContentCard";
import { useDashboardFilters } from "./DashboardFilters";

function openItem(item: ContentItem) {
  // Placeholder tot er een detailpagina is; alleen zichtbaar tijdens ontwikkeling.
  if (process.env.NODE_ENV !== "production") {
    console.log("Moment geopend:", item.id);
  }
}

export function ContentGrid() {
  const { searchQuery, categories, clearFilters } = useDashboardFilters();
  const { isFavorite, setFavorite } = useFavorites();

  const items = useMemo(
    () => filterContentItems(CONTENT_ITEMS, searchQuery, categories),
    [searchQuery, categories],
  );

  return (
    <MotionConfig reducedMotion="user">
      <p aria-live="polite" className="mb-3 text-sm font-semibold text-muted-foreground">
        {items.length === 1 ? "1 moment" : `${items.length} momenten`}
      </p>

      {items.length === 0 ? (
        <EmptyState onClear={clearFilters} />
      ) : (
        <motion.ul layout className="relative grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item) => {
              const favorite = isFavorite(item.id, item.isFavorite);
              return (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                >
                  <ContentCard
                    item={item}
                    isFavorite={favorite}
                    onToggleFavorite={() => setFavorite(item.id, !favorite)}
                    onOpen={() => openItem(item)}
                  />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      )}
    </MotionConfig>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-3 rounded-[1.5rem] border-2 border-dashed border-ink bg-paper px-6 py-12 text-center"
    >
      <span className="flex size-14 items-center justify-center rounded-full border-[3px] border-ink bg-yellow shadow-retro-sm">
        <SearchX aria-hidden className="size-7" />
      </span>
      <h3 className="text-2xl">Niets gevonden</h3>
      <p className="max-w-sm text-muted-foreground">
        Geen momenten die passen bij je zoekterm of filters. Probeer een ander
        woord of wis de filters.
      </p>
      <Button
        onClick={onClear}
        className="mt-1 h-10 rounded-full border-2 border-ink px-5 font-bold shadow-retro-sm"
      >
        Wis zoekterm en filters
      </Button>
    </motion.div>
  );
}
