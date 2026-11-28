import {
  EMAIL_TAKEN_MESSAGE,
  parseRegisterJson,
  REGISTER_FAILED_MESSAGE,
  validateRegisterInput,
} from "@/lib/auth-validation";
import { registerUser } from "@/lib/register-user";

/**
 * POST /api/auth/register — maakt een account aan met e-mail en wachtwoord.
 * Body (JSON): { name, email, password, confirmPassword }.
 * Statische route; gaat in Next.js voor op `api/auth/[...nextauth]`.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "De body moet geldige JSON zijn." },
      { status: 400 },
    );
  }

  const input = parseRegisterJson(body);
  if (!input) {
    return Response.json(
      { error: "Stuur een JSON-object met name, email, password en confirmPassword." },
      { status: 400 },
    );
  }

  const errors = validateRegisterInput(input);
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "Ongeldige invoer.", errors }, { status: 400 });
  }

  const result = await registerUser(input);
  if (!result.ok) {
    return result.reason === "email-taken"
      ? Response.json(
          { error: EMAIL_TAKEN_MESSAGE, errors: { email: EMAIL_TAKEN_MESSAGE } },
          { status: 409 },
        )
      : Response.json({ error: REGISTER_FAILED_MESSAGE }, { status: 500 });
  }

  return Response.json(
    { message: "Account aangemaakt.", user: result.user },
    { status: 201 },
  );
}
