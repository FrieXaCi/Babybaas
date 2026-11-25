import { describe, expect, it } from "vitest";
import {
  PASSWORD_MAX_LENGTH,
  normalizeEmail,
  readRegisterInput,
  safeCallbackUrl,
  validateRegisterInput,
  type RegisterInput,
} from "./auth-validation";

const valid: RegisterInput = {
  name: "Sanne",
  email: "sanne@example.nl",
  password: "geheim123",
  confirmPassword: "geheim123",
};

describe("normalizeEmail", () => {
  it("haalt spaties weg en maakt kleine letters", () => {
    expect(normalizeEmail("  Sanne@Example.NL ")).toBe("sanne@example.nl");
  });
});

describe("readRegisterInput", () => {
  it("leest en normaliseert de velden", () => {
    const formData = new FormData();
    formData.set("name", "  Sanne ");
    formData.set("email", " SANNE@example.nl");
    formData.set("password", " met spatie ");
    formData.set("confirmPassword", " met spatie ");

    expect(readRegisterInput(formData)).toEqual({
      name: "Sanne",
      email: "sanne@example.nl",
      password: " met spatie ",
      confirmPassword: " met spatie ",
    });
  });

  it("geeft lege strings voor ontbrekende velden", () => {
    expect(readRegisterInput(new FormData())).toEqual({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  });
});

describe("validateRegisterInput", () => {
  it("accepteert geldige invoer", () => {
    expect(validateRegisterInput(valid)).toEqual({});
  });

  it("vereist naam en e-mail", () => {
    const errors = validateRegisterInput({ ...valid, name: "", email: "" });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
  });

  it("weigert een ongeldig e-mailadres", () => {
    expect(validateRegisterInput({ ...valid, email: "sanne@" }).email).toBeDefined();
  });

  it("weigert een te kort wachtwoord", () => {
    const errors = validateRegisterInput({
      ...valid,
      password: "kort",
      confirmPassword: "kort",
    });
    expect(errors.password).toBeDefined();
  });

  it("weigert een wachtwoord langer dan 72 bytes", () => {
    const long = "é".repeat(PASSWORD_MAX_LENGTH / 2 + 1);
    const errors = validateRegisterInput({
      ...valid,
      password: long,
      confirmPassword: long,
    });
    expect(errors.password).toBeDefined();
  });

  it("weigert ongelijke wachtwoorden", () => {
    const errors = validateRegisterInput({
      ...valid,
      confirmPassword: "anders123",
    });
    expect(errors.confirmPassword).toBe("De wachtwoorden zijn niet gelijk.");
  });
});

describe("safeCallbackUrl", () => {
  it("laat interne paden door", () => {
    expect(safeCallbackUrl("/dashboard/album?x=1")).toBe("/dashboard/album?x=1");
  });

  it.each([
    "https://evil.example",
    "//evil.example",
    "/\\evil.example",
    "dashboard",
    undefined,
    ["/dashboard"],
  ])("valt terug op /dashboard bij %s", (value) => {
    expect(safeCallbackUrl(value)).toBe("/dashboard");
  });
});
