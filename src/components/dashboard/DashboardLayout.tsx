import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { DashboardFiltersProvider } from "./DashboardFilters";
import { DashboardMain } from "./DashboardMain";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardFiltersProvider>
      <div className="min-h-dvh bg-teal-deep bg-dots-light md:p-6 lg:p-10">
        <div className="mx-auto flex h-dvh max-w-6xl flex-col overflow-hidden bg-cream md:h-[calc(100dvh-3rem)] md:rounded-[2rem] md:border-4 md:border-ink md:shadow-retro-lg lg:h-[calc(100dvh-5rem)]">
          <TopBar />

          <div className="flex min-h-0 flex-1 gap-5 bg-dots md:p-5">
            <Sidebar />
            <DashboardMain>{children}</DashboardMain>
          </div>

          <BottomNav />
        </div>
      </div>
    </DashboardFiltersProvider>
  );
}
