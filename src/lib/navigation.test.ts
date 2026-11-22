import { describe, expect, it } from "vitest";
import { getInitials, isActiveRoute } from "./navigation";

describe("isActiveRoute", () => {
  it("is actief op exact dezelfde route", () => {
    expect(isActiveRoute("/dashboard/album", "/dashboard/album")).toBe(true);
  });

  it("is actief op een onderliggende route", () => {
    expect(isActiveRoute("/dashboard/album/123", "/dashboard/album")).toBe(true);
  });

  it("is niet actief op een route die alleen met dezelfde letters begint", () => {
    expect(isActiveRoute("/dashboard/albums", "/dashboard/album")).toBe(false);
  });

  it("is niet actief op een andere route", () => {
    expect(isActiveRoute("/dashboard/logboek", "/dashboard/album")).toBe(false);
    expect(isActiveRoute("/dashboard", "/dashboard/album")).toBe(false);
  });
});

describe("getInitials", () => {
  it("geeft de eerste letters van de eerste twee woorden", () => {
    expect(getInitials("Demo Gebruiker")).toBe("DG");
  });

  it("gebruikt hoofdletters en maximaal twee woorden", () => {
    expect(getInitials("anna van der berg")).toBe("AV");
  });

  it("werkt met één woord en extra spaties", () => {
    expect(getInitials("  Sam  ")).toBe("S");
  });

  it("geeft een lege string bij een lege naam", () => {
    expect(getInitials("")).toBe("");
  });
});
