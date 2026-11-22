import { Heart, Images, NotebookPen } from "lucide-react";
import type { NavigationItem } from "@/types/dashboard";

/** Hoofdnavigatie van het dashboard (zijbalk, drawer en bottom navigation). */
export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    id: "challenges",
    label: "Challenges",
    href: "/dashboard/challenges",
    icon: Heart,
  },
  {
    id: "logboek",
    label: "Logboek",
    href: "/dashboard/logboek",
    icon: NotebookPen,
  },
  { id: "album", label: "Album", href: "/dashboard/album", icon: Images },
];

/** Een route is actief als het pad gelijk is aan `href` of eronder valt. */
export function isActiveRoute(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Maximaal twee initialen, bijv. "Demo Gebruiker" → "DG". */
export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
