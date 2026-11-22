"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAVIGATION, isActiveRoute } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Snelle acties"
      className="border-t-4 border-ink bg-teal pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-3 gap-2 px-3 py-2">
        {MAIN_NAVIGATION.map(({ id, label, href, icon: Icon }) => {
          const active = isActiveRoute(pathname, href);
          return (
            <li key={id}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-full border-2 py-1.5 text-sm font-bold text-ink transition-colors",
                  active
                    ? "border-ink bg-yellow shadow-retro-sm"
                    : "border-transparent hover:bg-paper/30",
                )}
              >
                <Icon aria-hidden className="size-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
