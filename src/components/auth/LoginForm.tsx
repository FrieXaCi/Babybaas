"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import {
  readLoginInput,
  validateLoginInput,
  type LoginErrors,
} from "@/lib/auth-validation";
import { AuthField } from "./AuthField";
import { FormAlert } from "./FormAlert";
import { useFormErrors } from "./use-form-errors";

const NO_ERRORS: LoginErrors = {};

function validate(formData: FormData) {
  return validateLoginInput(readLoginInput(formData));
}

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction,
    {},
  );
  const { errors, hasErrors, onSubmit, onChange } = useFormErrors({
    serverState: state,
    serverErrors: NO_ERRORS,
    validate,
  });

  return (
    <form
      action={formAction}
      onSubmit={onSubmit}
      onChange={onChange}
      className="flex flex-col gap-4"
      noValidate
    >
      {/* Veldfouten gaan voor; de serverfout hoort bij de vorige poging. */}
      <FormAlert message={hasErrors ? undefined : state.error} />
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <AuthField
        name="email"
        label="E-mailadres"
        type="email"
        autoComplete="email"
        required
        defaultValue={state.email}
        // Na een serverfout opnieuw vullen: key forceert een nieuwe defaultValue.
        key={`email-${state.email ?? ""}`}
        error={errors.email}
      />
      <AuthField
        name="password"
        label="Wachtwoord"
        type="password"
        autoComplete="current-password"
        required
        error={errors.password}
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
