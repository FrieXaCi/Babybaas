"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type FieldErrors<F extends string> = Partial<Record<F, string>>;

type UseFormErrorsOptions<F extends string> = {
  /** Het laatste antwoord van de server action; bij een nieuw antwoord gelden diens fouten. */
  serverState: object;
  serverErrors: FieldErrors<F>;
  validate: (formData: FormData) => FieldErrors<F>;
};

/**
 * Foutmeldingen per veld voor een formulier met een server action.
 * - Bij versturen wordt eerst in de browser gecontroleerd; bij fouten gaat het
 *   formulier niet naar de server en krijgt het eerste foute veld de focus.
 * - De melding van een veld verdwijnt zodra dat veld wordt aangepast.
 * De server blijft altijd zelf valideren.
 */
export function useFormErrors<F extends string>({
  serverState,
  serverErrors,
  validate,
}: UseFormErrorsOptions<F>) {
  const [local, setLocal] = useState({ source: serverState, errors: serverErrors });

  // Nieuw serverantwoord: neem de serverfouten over (state bijwerken tijdens render).
  let current = local;
  if (local.source !== serverState) {
    current = { source: serverState, errors: serverErrors };
    setLocal(current);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const errors = validate(new FormData(form));
    const invalid = Object.keys(errors) as F[];
    if (invalid.length === 0) return;

    event.preventDefault();
    setLocal({ source: serverState, errors });

    const first = form.elements.namedItem(invalid[0]);
    if (first instanceof HTMLElement) first.focus();
  }

  function onChange(event: ChangeEvent<HTMLFormElement>) {
    const target = event.target as unknown as { name?: string };
    const name = target.name as F | undefined;
    if (!name || !current.errors[name]) return;

    const rest: FieldErrors<F> = { ...current.errors };
    delete rest[name];
    setLocal({ source: serverState, errors: rest });
  }

  return {
    errors: current.errors,
    hasErrors: Object.keys(current.errors).length > 0,
    onSubmit,
    onChange,
  };
}
