"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { SidebarContent } from "./SidebarContent";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon-lg"
            aria-label="Menu openen"
            className="rounded-full border-2 border-ink bg-paper shadow-retro-sm md:hidden"
          />
        }
      >
        <Menu aria-hidden className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[85%] max-w-xs gap-0 duration-300 rounded-r-[1.5rem] border-r-4 border-ink bg-paper data-[side=left]:border-r-4 data-[side=left]:data-ending-style:-translate-x-full data-[side=left]:data-starting-style:-translate-x-full"
      >
        <SheetHeader className="items-start border-b-2 border-dashed border-ink/30 pr-12 pb-4">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigatie, favorieten en je profiel
          </SheetDescription>
          <Logo />
        </SheetHeader>
        <div className="min-h-0 flex-1 p-4">
          <SidebarContent onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
