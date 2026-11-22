import type { ContentCategory, ContentItem } from "@/types/dashboard";

/** Kleine letters en zonder accenten, zodat "creme" ook "crème" vindt. */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Filtert op zoekterm (titel en tags) en op categorieën.
 * Zonder geselecteerde categorieën tellen alle categorieën mee;
 * met meerdere categorieën is een item zichtbaar als het in één ervan valt.
 */
export function filterContentItems(
  items: ContentItem[],
  query: string,
  categories: ContentCategory[],
): ContentItem[] {
  const needle = normalizeText(query);

  return items.filter((item) => {
    if (categories.length > 0 && !categories.includes(item.category)) {
      return false;
    }
    if (!needle) return true;

    return (
      normalizeText(item.title).includes(needle) ||
      item.tags.some((tag) => normalizeText(tag).includes(needle))
    );
  });
}
