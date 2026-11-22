"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import { CATEGORY_FILTERS } from "@/lib/content-categories";
import { cn } from "@/lib/utils";
import type { CategoryFilter } from "@/types/dashboard";
import { useDashboardFilters } from "./DashboardFilters";

export function FilterChips() {
  const { categories, toggleCategory, clearFilters, hasActiveFilters } =
    useDashboardFilters();

  return (
    <div
      role="group"
      aria-label="Filter op soort moment"
      className="-mx-5 flex gap-2 overflow-x-auto px-5 pt-1 pb-3 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
    >
      {CATEGORY_FILTERS.map((filter) => (
        <FilterChip
          key={filter.id}
          filter={filter}
          active={categories.includes(filter.id)}
          onToggle={() => toggleCategory(filter.id)}
        />
      ))}

      <AnimatePresence>
        {hasActiveFilters && (
          <motion.button
            type="button"
            onClick={clearFilters}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.9 }}
            className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-bold text-ink/70 underline-offset-4 hover:text-ink hover:underline"
          >
            <X aria-hidden className="size-4" />
            Wis filters
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

type FilterChipProps = {
  filter: CategoryFilter;
  active: boolean;
  onToggle: () => void;
};

function FilterChip({ filter, active, onToggle }: FilterChipProps) {
  const Icon = filter.icon;

  return (
    <motion.button
      type="button"
      aria-pressed={active}
      onClick={onToggle}
      whileTap={{ scale: 0.9 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 500, damping: 22 }}
      className={cn(
        "relative flex shrink-0 items-center gap-1.5 rounded-full border-2 px-3.5 py-1.5 text-sm font-bold transition-[background-color,border-color,box-shadow] duration-200",
        active
          ? cn("border-ink shadow-retro-sm", filter.activeClassName)
          : "border-ink/30 bg-paper text-ink/80 hover:border-ink",
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={active ? "check" : "icon"}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 600, damping: 20 }}
          className="flex"
        >
          {active ? (
            <Check aria-hidden className="size-4" strokeWidth={3} />
          ) : (
            <Icon aria-hidden className="size-4" />
          )}
        </motion.span>
      </AnimatePresence>
      {filter.label}
    </motion.button>
  );
}
