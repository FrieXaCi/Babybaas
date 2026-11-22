import { BottomNav } from "@/components/dashboard/BottomNav";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";

export default function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  return (
    <div className="min-h-dvh bg-teal-deep bg-dots-light md:p-6 lg:p-10">
      <div className="mx-auto flex h-dvh max-w-6xl flex-col overflow-hidden bg-cream md:h-[calc(100dvh-3rem)] md:rounded-[2rem] md:border-4 md:border-ink md:shadow-retro-lg lg:h-[calc(100dvh-5rem)]">
        <TopBar />

        <div className="flex min-h-0 flex-1">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-dots p-5 md:p-8">
            {children}
          </main>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
