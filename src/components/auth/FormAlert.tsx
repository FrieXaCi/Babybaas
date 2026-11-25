export function FormAlert({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className="rounded-xl border-2 border-ink bg-orange/20 px-3 py-2 text-sm font-semibold"
    >
      {message}
    </p>
  );
}
