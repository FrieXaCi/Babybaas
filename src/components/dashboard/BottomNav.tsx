import { Heart, Images, NotebookPen, type LucideIcon } from "lucide-react";

type BottomNavItem = {
  label: string;
  icon: LucideIcon;
};

const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { label: "Challenges", icon: Heart },
  { label: "Logboek", icon: NotebookPen },
  { label: "Album", icon: Images },
];

export function BottomNav() {
  return (
    <nav
      aria-label="Snelle acties"
      className="border-t-4 border-ink bg-teal pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-3">
        {BOTTOM_NAV_ITEMS.map(({ label, icon: Icon }) => (
          <li key={label}>
            <button
              type="button"
              className="flex w-full flex-col items-center gap-1 py-3 text-sm font-bold text-ink transition-colors hover:bg-paper/30"
            >
              <Icon aria-hidden className="size-6" />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
