import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "./Logo";

export function TopBar() {
  return (
    <header className="flex items-center gap-3 border-b-4 border-ink bg-yellow px-4 py-3 md:px-6">
      <Logo />

      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Zoek in jullie momenten..."
          aria-label="Zoeken"
          className="h-10 rounded-full border-2 bg-paper pl-9 shadow-retro-sm"
        />
      </div>

      <div className="flex-1 sm:hidden" />

      <Button className="ml-auto h-10 rounded-full border-2 border-ink px-4 font-bold shadow-retro-sm hover:bg-orange/90 active:translate-y-0.5 active:shadow-none">
        <Plus aria-hidden className="size-5" />
        <span className="sr-only sm:not-sr-only">Nieuw item</span>
      </Button>
    </header>
  );
}
