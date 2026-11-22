import { SidebarContent } from "./SidebarContent";

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col overflow-hidden rounded-[1.5rem] border-[3px] border-ink bg-paper p-4 shadow-retro md:flex">
      <SidebarContent />
    </aside>
  );
}
