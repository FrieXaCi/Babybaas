export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 72; // bcrypt gebruikt maximaal 72 bytes
export const NAME_MAX_LENGTH = 80;

export const EMAIL_TAKEN_MESSAGE = "Er bestaat al een account met dit e-mailadres.";
export const REGISTER_FAILED_MESSAGE =
  "Account aanmaken lukt nu niet. Probeer het opnieuw.";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type RegisterField = "name" | "email" | "password" | "confirmPassword";

export type RegisterInput = Record<RegisterField, string>;

export type RegisterErrors = Partial<Record<RegisterField, string>>;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Zet ruwe waarden om naar `RegisterInput`. Alles wat geen string is, wordt
 * een lege string, zodat `validateRegisterInput` het als ontbrekend meldt.
 */
function toRegisterInput(read: (key: RegisterField) => unknown): RegisterInput {
  const text = (key: RegisterField) => {
    const value = read(key);
    return typeof value === "string" ? value : "";
  };

  return {
    name: text("name").trim(),
    email: normalizeEmail(text("email")),
    password: text("password"),
    confirmPassword: text("confirmPassword"),
  };
}

export function readRegisterInput(formData: FormData): RegisterInput {
  return toRegisterInput((key) => formData.get(key));
}

/**
 * Leest de JSON-body van `POST /api/auth/register`. Geeft `null` als de body
 * geen gewoon object is (bijv. een array, string of `null`).
 */
export function parseRegisterJson(body: unknown): RegisterInput | null {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return null;
  }
  const record = body as Record<string, unknown>;
  return toRegisterInput((key) => record[key]);
}

export function validateRegisterInput(input: RegisterInput): RegisterErrors {
  const errors: RegisterErrors = {};

  if (!input.name) {
    errors.name = "Vul je naam in.";
  } else if (input.name.length > NAME_MAX_LENGTH) {
    errors.name = `Je naam mag maximaal ${NAME_MAX_LENGTH} tekens zijn.`;
  }

  if (!input.email) {
    errors.email = "Vul je e-mailadres in.";
  } else if (!EMAIL_PATTERN.test(input.email)) {
    errors.email = "Dit e-mailadres klopt niet.";
  }

  if (input.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `Je wachtwoord moet minstens ${PASSWORD_MIN_LENGTH} tekens zijn.`;
  } else if (new TextEncoder().encode(input.password).length > PASSWORD_MAX_LENGTH) {
    errors.password = `Je wachtwoord mag maximaal ${PASSWORD_MAX_LENGTH} tekens zijn.`;
  }

  if (!input.confirmPassword) {
    errors.confirmPassword = "Herhaal je wachtwoord.";
  } else if (input.confirmPassword !== input.password) {
    errors.confirmPassword = "De wachtwoorden zijn niet gelijk.";
  }

  return errors;
}

/**
 * Laat alleen interne paden toe als terugkeeradres (geen open redirect).
 */
export function safeCallbackUrl(
  value: unknown,
  fallback = "/dashboard",
): string {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return fallback;
  }
  return value;
}
