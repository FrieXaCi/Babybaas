import { describe, expect, it } from "vitest";
import { parseFavoriteOverrides } from "./use-favorites";

describe("parseFavoriteOverrides", () => {
  it("leest geldige opgeslagen favorieten", () => {
    expect(parseFavoriteOverrides('{"luier":true,"bad":false}')).toEqual({
      luier: true,
      bad: false,
    });
  });

  it("geeft een leeg object zonder opgeslagen waarde", () => {
    expect(parseFavoriteOverrides(null)).toEqual({});
    expect(parseFavoriteOverrides("")).toEqual({});
  });

  it("geeft een leeg object bij ongeldige JSON", () => {
    expect(parseFavoriteOverrides("{niet-json")).toEqual({});
  });

  it("negeert JSON die geen object is", () => {
    expect(parseFavoriteOverrides("null")).toEqual({});
    expect(parseFavoriteOverrides("42")).toEqual({});
    expect(parseFavoriteOverrides('"tekst"')).toEqual({});
    expect(parseFavoriteOverrides("[true,false]")).toEqual({});
  });

  it("negeert waarden die geen boolean zijn", () => {
    expect(
      parseFavoriteOverrides('{"luier":true,"bad":"ja","dutje":1,"x":null}'),
    ).toEqual({ luier: true });
  });
});
