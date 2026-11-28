import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";

type AuthFieldProps = Omit<ComponentProps<"input">, "id" | "name"> & {
  name: string;
  label: string;
  error?: string;
  /** Korte uitleg onder het veld, bijv. de wachtwoordeis. */
  hint?: string;
};

export function AuthField({ name, label, error, hint, ...props }: AuthFieldProps) {
  const id = `auth-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint && !error ? hintId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold">
        {label}
      </label>
      <Input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="h-11 rounded-xl border-2 border-ink bg-cream px-3 text-base focus-visible:border-ink focus-visible:ring-ink/30"
        {...props}
      />
      {error ? (
        <p id={errorId} className="text-sm font-semibold text-destructive">
          {error}
        </p>
      ) : (
        hint && (
          <p id={hintId} className="text-xs text-muted-foreground">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
