"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/lib/auth";
import {
  EMAIL_TAKEN_MESSAGE,
  normalizeEmail,
  readRegisterInput,
  REGISTER_FAILED_MESSAGE,
  safeCallbackUrl,
  validateRegisterInput,
  type RegisterErrors,
} from "@/lib/auth-validation";
import { registerUser } from "@/lib/register-user";

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

  const result = await registerUser(input);
  if (!result.ok) {
    return result.reason === "email-taken"
      ? { errors: { email: EMAIL_TAKEN_MESSAGE }, values }
      : { formError: REGISTER_FAILED_MESSAGE, values };
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
