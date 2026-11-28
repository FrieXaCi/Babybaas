"use client";

import { useActionState } from "react";
import { registerAction, type RegisterState } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import {
  PASSWORD_MIN_LENGTH,
  readRegisterInput,
  validateRegisterInput,
  type RegisterErrors,
} from "@/lib/auth-validation";
import { AuthField } from "./AuthField";
import { FormAlert } from "./FormAlert";
import { useFormErrors } from "./use-form-errors";

const NO_ERRORS: RegisterErrors = {};

function validate(formData: FormData) {
  return validateRegisterInput(readRegisterInput(formData));
}

export function RegisterForm() {
  const [state, formAction, pending] = useActionState<RegisterState, FormData>(
    registerAction,
    {},
  );
  const { errors, hasErrors, onSubmit, onChange } = useFormErrors({
    serverState: state,
    serverErrors: state.errors ?? NO_ERRORS,
    validate,
  });
  // Bij elke nieuwe server-response de velden opnieuw vullen.
  const valuesKey = `${state.values?.name ?? ""}|${state.values?.email ?? ""}`;

  return (
    <form
      action={formAction}
      onSubmit={onSubmit}
      onChange={onChange}
      className="flex flex-col gap-4"
      noValidate
    >
      <FormAlert message={hasErrors ? undefined : state.formError} />

      <AuthField
        key={`name-${valuesKey}`}
        name="name"
        label="Naam"
        autoComplete="name"
        required
        defaultValue={state.values?.name}
        error={errors.name}
      />
      <AuthField
        key={`email-${valuesKey}`}
        name="email"
        label="E-mailadres"
        type="email"
        autoComplete="email"
        required
        defaultValue={state.values?.email}
        error={errors.email}
      />
      <AuthField
        name="password"
        label="Wachtwoord"
        type="password"
        autoComplete="new-password"
        minLength={PASSWORD_MIN_LENGTH}
        required
        error={errors.password}
        hint={`Minstens ${PASSWORD_MIN_LENGTH} tekens.`}
      />
      <AuthField
        name="confirmPassword"
        label="Bevestig wachtwoord"
        type="password"
        autoComplete="new-password"
        required
        error={errors.confirmPassword}
      />

      <Button
        type="submit"
        variant="retro"
        size="xl"
        disabled={pending}
        className="mt-2"
      >
        {pending ? "Account aanmaken…" : "Account aanmaken"}
      </Button>
    </form>
  );
}
