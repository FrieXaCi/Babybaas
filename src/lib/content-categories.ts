import { Camera, Moon, NotebookPen, Ruler, Star, Trophy } from "lucide-react";
import type {
  CategoryFilter,
  ContentCategory,
  ContentStatus,
} from "@/types/dashboard";

// Vaste UI-instellingen voor de soorten momenten en hun status.

export const CATEGORY_FILTERS: CategoryFilter[] = [
  { id: "challenge", label: "Challenges", icon: Trophy, activeClassName: "bg-orange" },
  { id: "photo", label: "Foto's", icon: Camera, activeClassName: "bg-yellow" },
  { id: "note", label: "Notities", icon: NotebookPen, activeClassName: "bg-teal" },
  { id: "milestone", label: "Mijlpalen", icon: Star, activeClassName: "bg-yellow" },
  { id: "sleep", label: "Slaap", icon: Moon, activeClassName: "bg-teal" },
  { id: "growth", label: "Groei", icon: Ruler, activeClassName: "bg-orange" },
];

export const CATEGORY_BY_ID = Object.fromEntries(
  CATEGORY_FILTERS.map((category) => [category.id, category]),
) as Record<ContentCategory, CategoryFilter>;

export const STATUS_LABELS: Record<ContentStatus, string> = {
  new: "Nieuw",
  in_progress: "Bezig",
  done: "Voltooid",
};
