"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { AuthField } from "./AuthField";
import { FormAlert } from "./FormAlert";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction,
    {},
  );

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <FormAlert message={state.error} />
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <AuthField
        name="email"
        label="E-mailadres"
        type="email"
        autoComplete="email"
        required
        defaultValue={state.email}
        // Na een fout opnieuw vullen: key forceert een nieuwe defaultValue.
        key={`email-${state.email ?? ""}`}
      />
      <AuthField
        name="password"
        label="Wachtwoord"
        type="password"
        autoComplete="current-password"
        required
      />

      <Button
        type="submit"
        variant="retro"
        size="xl"
        disabled={pending}
        className="mt-2"
      >
        {pending ? "Bezig met inloggen…" : "Inloggen"}
      </Button>
    </form>
  );
}
