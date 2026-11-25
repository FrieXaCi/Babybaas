import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";

type AuthFieldProps = Omit<ComponentProps<"input">, "id" | "name"> & {
  name: string;
  label: string;
  error?: string;
};

export function AuthField({ name, label, error, ...props }: AuthFieldProps) {
  const id = `auth-${name}`;
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold">
        {label}
      </label>
      <Input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="h-11 rounded-xl border-2 border-ink bg-cream px-3 text-base focus-visible:border-ink focus-visible:ring-ink/30"
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm font-semibold text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
