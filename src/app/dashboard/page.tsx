import type { Metadata } from "next";
import { ContentGrid } from "@/components/dashboard/ContentGrid";
import { FilterChips } from "@/components/dashboard/FilterChips";
import { SearchInput } from "@/components/dashboard/SearchInput";

export const metadata: Metadata = {
  title: "Dashboard · BabyBaas",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-3xl">Overzicht</h2>
        <p className="text-muted-foreground">
          Alle challenges en momenten van jullie gezin.
        </p>
      </div>

      <SearchInput className="sm:hidden" />
      <FilterChips />
      <ContentGrid />
    </div>
  );
}
