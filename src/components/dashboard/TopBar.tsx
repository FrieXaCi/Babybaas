import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { SearchInput } from "./SearchInput";

export function TopBar() {
  return (
    <header className="flex items-center gap-3 border-b-4 border-ink bg-yellow px-4 py-3 md:px-6">
      <MobileNav />

      <Link href="/dashboard" aria-label="Naar het overzicht">
        <Logo />
      </Link>

      <SearchInput className="hidden max-w-md flex-1 sm:block" />

      <div className="flex-1 sm:hidden" />

      <Button className="ml-auto h-10 rounded-full border-2 border-ink px-4 font-bold shadow-retro-sm hover:bg-orange/90 active:translate-y-0.5 active:shadow-none">
        <Plus aria-hidden className="size-5" />
        <span className="sr-only sm:not-sr-only">Nieuw item</span>
      </Button>
    </header>
  );
}
