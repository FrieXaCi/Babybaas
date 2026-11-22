import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface CollectionItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  /** Tailwind-class voor de achtergrond van het icoon, bijv. `bg-orange`. */
  iconClassName: string;
}

export interface DashboardUser {
  name: string;
  familyName: string;
  avatarUrl?: string;
}
