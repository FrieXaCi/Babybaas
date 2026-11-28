import { describe, expect, it } from "vitest";
import {
  PASSWORD_MAX_LENGTH,
  normalizeEmail,
  parseRegisterJson,
  readLoginInput,
  readRegisterInput,
  safeCallbackUrl,
  validateLoginInput,
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

describe("parseRegisterJson", () => {
  it("leest en normaliseert een JSON-object", () => {
    expect(
      parseRegisterJson({
        name: " Test Gebruiker ",
        email: "Test@BabyBaas.nl ",
        password: "VeiligWachtwoord123",
        confirmPassword: "VeiligWachtwoord123",
      }),
    ).toEqual({
      name: "Test Gebruiker",
      email: "test@babybaas.nl",
      password: "VeiligWachtwoord123",
      confirmPassword: "VeiligWachtwoord123",
    });
  });

  it("maakt van niet-string velden lege strings", () => {
    expect(
      parseRegisterJson({ name: 42, email: null, password: ["x"], extra: "genegeerd" }),
    ).toEqual({ name: "", email: "", password: "", confirmPassword: "" });
  });

  it.each([null, "tekst", 12, true, [], [{ name: "Sanne" }]])(
    "geeft null voor een body die geen object is: %j",
    (body) => {
      expect(parseRegisterJson(body)).toBeNull();
    },
  );

  it("levert invoer die validateRegisterInput afkeurt bij ontbrekende velden", () => {
    const input = parseRegisterJson({});
    expect(input).not.toBeNull();
    expect(Object.keys(validateRegisterInput(input!))).toEqual([
      "name",
      "email",
      "password",
      "confirmPassword",
    ]);
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

describe("readLoginInput", () => {
  it("normaliseert het e-mailadres en laat het wachtwoord ongemoeid", () => {
    const formData = new FormData();
    formData.set("email", " Demo@BabyBaas.nl ");
    formData.set("password", " geheim ");
    expect(readLoginInput(formData)).toEqual({
      email: "demo@babybaas.nl",
      password: " geheim ",
    });
  });

  it("geeft lege strings voor ontbrekende velden", () => {
    expect(readLoginInput(new FormData())).toEqual({ email: "", password: "" });
  });
});

describe("validateLoginInput", () => {
  it("accepteert een ingevuld e-mailadres en wachtwoord", () => {
    expect(
      validateLoginInput({ email: "demo@babybaas.nl", password: "12345678" }),
    ).toEqual({});
  });

  it("vereist beide velden", () => {
    expect(validateLoginInput({ email: "", password: "" })).toEqual({
      email: "Vul je e-mailadres in.",
      password: "Vul je wachtwoord in.",
    });
  });

  it("weigert een ongeldig e-mailadres", () => {
    expect(
      validateLoginInput({ email: "demo@", password: "x" }).email,
    ).toBe("Dit e-mailadres klopt niet.");
  });

  it("stelt geen eisen aan de wachtwoordlengte (dat is de server)", () => {
    expect(validateLoginInput({ email: "a@b.nl", password: "x" })).toEqual({});
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
