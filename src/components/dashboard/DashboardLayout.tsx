import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-dvh bg-teal-deep bg-dots-light md:p-6 lg:p-10">
      <div className="mx-auto flex h-dvh max-w-6xl flex-col overflow-hidden bg-cream md:h-[calc(100dvh-3rem)] md:rounded-[2rem] md:border-4 md:border-ink md:shadow-retro-lg lg:h-[calc(100dvh-5rem)]">
        <TopBar />

        <div className="flex min-h-0 flex-1 gap-5 bg-dots md:p-5">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-5 md:p-3">{children}</main>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
