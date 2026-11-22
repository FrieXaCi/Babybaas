import { describe, expect, it } from "vitest";
import type { ContentItem } from "@/types/dashboard";
import { filterContentItems, normalizeText } from "./content-filter";

function item(overrides: Partial<ContentItem> & Pick<ContentItem, "id">): ContentItem {
  return {
    title: "Titel",
    description: "Beschrijving",
    category: "note",
    tags: [],
    status: "new",
    date: "2026-11-01",
    isFavorite: false,
    ...overrides,
  };
}

const ITEMS: ContentItem[] = [
  item({ id: "bad", title: "Eerste keer in bad", category: "photo", tags: ["water", "badeend"] }),
  item({ id: "luier", title: "Luierkampioen", category: "challenge", tags: ["snelheid"] }),
  item({ id: "creme", title: "Crème brûlée-avond", category: "note", tags: ["ouders"] }),
  item({ id: "glimlach", title: "Eerste glimlach", category: "milestone", tags: ["eerste keer"] }),
  item({ id: "dutje", title: "Middagdutje", category: "sleep", tags: ["slapen", "onderweg"] }),
];

const ids = (items: ContentItem[]) => items.map((i) => i.id);

describe("normalizeText", () => {
  it("maakt tekst kleine letters, zonder accenten en witruimte rondom", () => {
    expect(normalizeText("  Crème BRÛLÉE ")).toBe("creme brulee");
  });

  it("laat een lege string leeg", () => {
    expect(normalizeText("")).toBe("");
  });
});

describe("filterContentItems", () => {
  it("geeft alles terug zonder zoekterm en zonder categorieën", () => {
    expect(filterContentItems(ITEMS, "", [])).toEqual(ITEMS);
  });

  it("negeert een zoekterm van alleen spaties", () => {
    expect(filterContentItems(ITEMS, "   ", [])).toHaveLength(ITEMS.length);
  });

  it("zoekt in de titel, ongeacht hoofdletters", () => {
    expect(ids(filterContentItems(ITEMS, "LUIER", []))).toEqual(["luier"]);
  });

  it("zoekt in tags, ook op een deel van een tag", () => {
    expect(ids(filterContentItems(ITEMS, "slap", []))).toEqual(["dutje"]);
  });

  it("vindt woorden met accenten via een zoekterm zonder accenten (en andersom)", () => {
    expect(ids(filterContentItems(ITEMS, "creme", []))).toEqual(["creme"]);
    expect(ids(filterContentItems(ITEMS, "glimlách", []))).toEqual(["glimlach"]);
  });

  it("zoekt niet in de beschrijving", () => {
    expect(filterContentItems(ITEMS, "beschrijving", [])).toEqual([]);
  });

  it("filtert op één categorie", () => {
    expect(ids(filterContentItems(ITEMS, "", ["photo"]))).toEqual(["bad"]);
  });

  it("combineert meerdere categorieën als OF", () => {
    expect(ids(filterContentItems(ITEMS, "", ["photo", "milestone"]))).toEqual([
      "bad",
      "glimlach",
    ]);
  });

  it("combineert zoekterm en categorie als EN", () => {
    expect(ids(filterContentItems(ITEMS, "eerste", ["milestone"]))).toEqual(["glimlach"]);
    expect(filterContentItems(ITEMS, "luier", ["photo"])).toEqual([]);
  });

  it("geeft een lege lijst als niets past", () => {
    expect(filterContentItems(ITEMS, "xyzzy", [])).toEqual([]);
  });

  it("past de invoer niet aan", () => {
    const copy = [...ITEMS];
    filterContentItems(ITEMS, "bad", ["photo"]);
    expect(ITEMS).toEqual(copy);
  });
});
