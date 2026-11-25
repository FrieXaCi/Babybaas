"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/lib/auth";
import {
  normalizeEmail,
  readRegisterInput,
  safeCallbackUrl,
  validateRegisterInput,
  type RegisterErrors,
} from "@/lib/auth-validation";
import { prisma } from "@/lib/prisma";

const BCRYPT_ROUNDS = 12;

export type LoginState = { error?: string; email?: string };

export type RegisterState = {
  errors?: RegisterErrors;
  formError?: string;
  values?: { name: string; email: string };
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const rawEmail = formData.get("email");
  const email = typeof rawEmail === "string" ? normalizeEmail(rawEmail) : "";
  const password = formData.get("password");

  if (!email || typeof password !== "string" || !password) {
    return { error: "Vul je e-mailadres en wachtwoord in.", email };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: safeCallbackUrl(formData.get("callbackUrl")),
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error:
          error.type === "CredentialsSignin"
            ? "E-mailadres of wachtwoord klopt niet."
            : "Inloggen lukt nu niet. Probeer het later opnieuw.",
        email,
      };
    }
    // Een geslaagde login gooit een redirect; die moet doorlopen.
    throw error;
  }

  return {};
}

export async function registerAction(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const input = readRegisterInput(formData);
  const values = { name: input.name, email: input.email };

  const errors = validateRegisterInput(input);
  if (Object.keys(errors).length > 0) {
    return { errors, values };
  }

  const existing = await prisma.user.findUnique({
    where: { email: input.email },
    select: { id: true },
  });
  if (existing) {
    return {
      errors: { email: "Er bestaat al een account met dit e-mailadres." },
      values,
    };
  }

  const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);

  try {
    await prisma.user.create({
      data: { name: input.name, email: input.email, password: passwordHash },
    });
  } catch {
    // Bijv. een gelijktijdige registratie met hetzelfde e-mailadres.
    return {
      formError: "Account aanmaken lukt nu niet. Probeer het opnieuw.",
      values,
    };
  }

  try {
    await signIn("credentials", {
      email: input.email,
      password: input.password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        formError: "Je account is aangemaakt. Log nu in.",
        values,
      };
    }
    throw error;
  }

  return {};
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
