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

export type ContentCategory =
  | "challenge"
  | "photo"
  | "note"
  | "milestone"
  | "sleep"
  | "growth";

export type ContentStatus = "new" | "in_progress" | "done";

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  category: ContentCategory;
  tags: string[];
  status: ContentStatus;
  /** ISO-datum (YYYY-MM-DD). */
  date: string;
  /** Standaardwaarde; de gebruiker kan dit lokaal aanpassen. */
  isFavorite: boolean;
  imageUrl?: string;
}

export interface CategoryFilter {
  id: ContentCategory;
  label: string;
  icon: LucideIcon;
  /** Tailwind-class voor de achtergrond als de chip actief is. */
  activeClassName: string;
}

export interface DashboardUser {
  name: string;
  email: string;
  /** Naam van de gezinsruimte; leeg als de gebruiker nog geen gezin heeft. */
  familyName?: string;
  avatarUrl?: string;
}
