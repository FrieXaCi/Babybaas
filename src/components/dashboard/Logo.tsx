import { Heart } from "lucide-react";

export function Logo() {
  return (
    <div className="inline-flex shrink-0 -rotate-2 items-center gap-1.5 rounded-full border-[3px] border-ink bg-orange px-3 py-1 shadow-retro">
      <Heart aria-hidden className="size-5 fill-paper text-paper" />
      <span className="font-heading text-xl tracking-wide text-paper">
        BabyBaas!
      </span>
    </div>
  );
}
