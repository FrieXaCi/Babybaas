import { describe, expect, it } from "vitest";
import {
  CATEGORY_BY_ID,
  CATEGORY_FILTERS,
  CONTENT_ITEMS,
  FAVORITE_ITEMS,
  MAIN_NAVIGATION,
  RECENT_ITEMS,
  STATUS_LABELS,
} from "./mock-data";

// De UI gaat ervan uit dat de mock-data consistent is (unieke keys,
// bestaande categorieën, geldige datums, links naar bestaande routes).

const EXISTING_ROUTES = ["/dashboard/challenges", "/dashboard/logboek", "/dashboard/album"];

describe("CONTENT_ITEMS", () => {
  it("heeft genoeg items om filters en zoeken te testen", () => {
    expect(CONTENT_ITEMS.length).toBeGreaterThanOrEqual(12);
  });

  it("heeft unieke ids", () => {
    const ids = CONTENT_ITEMS.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gebruikt alleen bekende categorieën en statussen", () => {
    for (const item of CONTENT_ITEMS) {
      expect(CATEGORY_BY_ID[item.category], item.id).toBeDefined();
      expect(STATUS_LABELS[item.status], item.id).toBeDefined();
    }
  });

  it("heeft geldige ISO-datums (YYYY-MM-DD)", () => {
    for (const item of CONTENT_ITEMS) {
      expect(item.date, item.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(item.date).getTime()), item.id).toBe(false);
    }
  });

  it("heeft unieke tags per item", () => {
    for (const item of CONTENT_ITEMS) {
      expect(new Set(item.tags).size, item.id).toBe(item.tags.length);
    }
  });

  it("heeft minstens één item per filtercategorie", () => {
    for (const category of CATEGORY_FILTERS) {
      expect(
        CONTENT_ITEMS.some((item) => item.category === category.id),
        category.id,
      ).toBe(true);
    }
  });

  it("verwijst alleen naar lokale afbeeldingen", () => {
    for (const item of CONTENT_ITEMS.filter((i) => i.imageUrl)) {
      expect(item.imageUrl, item.id).toMatch(/^\/images\//);
    }
  });
});

describe("CATEGORY_BY_ID", () => {
  it("bevat elke filtercategorie precies één keer", () => {
    expect(Object.keys(CATEGORY_BY_ID)).toHaveLength(CATEGORY_FILTERS.length);
    for (const category of CATEGORY_FILTERS) {
      expect(CATEGORY_BY_ID[category.id]).toBe(category);
    }
  });
});

describe("navigatie-data", () => {
  it("linkt alleen naar bestaande dashboardroutes", () => {
    for (const item of [...MAIN_NAVIGATION, ...FAVORITE_ITEMS, ...RECENT_ITEMS]) {
      expect(EXISTING_ROUTES, item.id).toContain(item.href);
    }
  });

  it("heeft unieke ids per lijst", () => {
    for (const list of [MAIN_NAVIGATION, FAVORITE_ITEMS, RECENT_ITEMS]) {
      const ids = list.map((item) => item.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});
