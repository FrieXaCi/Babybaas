import { Wrench } from "lucide-react";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl">{title}</h2>
      <div className="flex max-w-xl items-start gap-4 rounded-[1.5rem] border-2 border-dashed border-ink bg-paper p-5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-yellow">
          <Wrench aria-hidden className="size-5" />
        </span>
        <div>
          <p className="font-bold">Komt binnenkort</p>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}
