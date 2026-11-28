import "server-only";

import bcrypt from "bcryptjs";
import type { RegisterInput } from "./auth-validation";
import { prisma } from "./prisma";

const BCRYPT_ROUNDS = 12;

export type RegisteredUser = { id: string; name: string | null; email: string };

export type RegisterUserResult =
  | { ok: true; user: RegisteredUser }
  | { ok: false; reason: "email-taken" | "failed" };

function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

/**
 * Maakt een account aan voor invoer die al door `validateRegisterInput` is
 * goedgekeurd. Gedeeld door het registratieformulier en de registratie-API.
 */
export async function registerUser(
  input: RegisterInput,
): Promise<RegisterUserResult> {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
    select: { id: true },
  });
  if (existing) {
    return { ok: false, reason: "email-taken" };
  }

  const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);

  try {
    const user = await prisma.user.create({
      data: { name: input.name, email: input.email, password: passwordHash },
      select: { id: true, name: true, email: true },
    });
    return { ok: true, user };
  } catch (error) {
    // Een gelijktijdige registratie met hetzelfde e-mailadres botst op de
    // unieke index; dat is hetzelfde als "bestaat al".
    if (isUniqueConstraintError(error)) {
      return { ok: false, reason: "email-taken" };
    }
    return { ok: false, reason: "failed" };
  }
}
