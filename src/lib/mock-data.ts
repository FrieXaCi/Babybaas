import {
  Baby,
  Camera,
  Heart,
  Images,
  Moon,
  NotebookPen,
  Ruler,
  Smile,
} from "lucide-react";
import type {
  CollectionItem,
  DashboardUser,
  NavigationItem,
} from "@/types/dashboard";

// Tijdelijke mock-data tot authenticatie en echte data zijn aangesloten.

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

export const FAVORITE_ITEMS: CollectionItem[] = [
  {
    id: "fav-luierkampioen",
    label: "Luierkampioen",
    href: "/dashboard/challenges",
    icon: Baby,
    iconClassName: "bg-orange",
  },
  {
    id: "fav-eerste-glimlach",
    label: "Eerste glimlach",
    href: "/dashboard/album",
    icon: Smile,
    iconClassName: "bg-yellow",
  },
  {
    id: "fav-slaaplogboek",
    label: "Slaaplogboek",
    href: "/dashboard/logboek",
    icon: Moon,
    iconClassName: "bg-teal",
  },
];

export const RECENT_ITEMS: CollectionItem[] = [
  {
    id: "recent-fotoprompt",
    label: "Fotoprompt van de week",
    href: "/dashboard/challenges",
    icon: Camera,
    iconClassName: "bg-orange",
  },
  {
    id: "recent-groei",
    label: "Groeilogboek",
    href: "/dashboard/logboek",
    icon: Ruler,
    iconClassName: "bg-teal",
  },
  {
    id: "recent-opa-oma",
    label: "Bij opa en oma",
    href: "/dashboard/album",
    icon: Images,
    iconClassName: "bg-yellow",
  },
];

export const MOCK_USER: DashboardUser = {
  name: "Demo Gebruiker",
  familyName: "Familie Demo",
};
