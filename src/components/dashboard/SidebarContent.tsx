"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FAVORITE_ITEMS, MOCK_USER, RECENT_ITEMS } from "@/lib/mock-data";
import {
  MAIN_NAVIGATION,
  getInitials,
  isActiveRoute,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { CollectionItem } from "@/types/dashboard";

type SidebarContentProps = {
  /** Wordt aangeroepen na een klik op een link, bijv. om de drawer te sluiten. */
  onNavigate?: () => void;
};

export function SidebarContent({ onNavigate }: SidebarContentProps) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <div className="-mx-1 flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-1 pb-1">
        <MainNavigation onNavigate={onNavigate} />
        <CollectionSection
          title="Favorieten"
          items={FAVORITE_ITEMS}
          onNavigate={onNavigate}
        />
        <CollectionSection
          title="Recent bekeken"
          items={RECENT_ITEMS}
          onNavigate={onNavigate}
        />
      </div>
      <UserProfile />
    </div>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 className="mb-2 px-3 font-sans text-xs font-extrabold tracking-widest text-muted-foreground uppercase">
      {children}
    </h3>
  );
}

function MainNavigation({ onNavigate }: SidebarContentProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Hoofdnavigatie">
      <SectionTitle>Navigatie</SectionTitle>
      <ul className="flex flex-col gap-1.5">
        {MAIN_NAVIGATION.map(({ id, label, href, icon: Icon }) => {
          const active = isActiveRoute(pathname, href);
          return (
            <li key={id}>
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-full border-2 px-3 py-2 font-bold transition-colors",
                  active
                    ? "border-ink bg-yellow shadow-retro-sm"
                    : "border-transparent hover:border-ink hover:bg-cream",
                )}
              >
                <Icon aria-hidden className="size-5" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

type CollectionSectionProps = SidebarContentProps & {
  title: string;
  items: CollectionItem[];
};

function CollectionSection({ title, items, onNavigate }: CollectionSectionProps) {
  return (
    <section aria-label={title}>
      <SectionTitle>{title}</SectionTitle>
      <ul className="flex flex-col gap-0.5">
        {items.map(({ id, label, href, icon: Icon, iconClassName }) => (
          <li key={id}>
            <Link
              href={href}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-xl px-3 py-1.5 text-sm font-semibold transition-colors hover:bg-cream"
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-ink",
                  iconClassName,
                )}
              >
                <Icon aria-hidden className="size-3.5" />
              </span>
              <span className="truncate">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function UserProfile() {
  return (
    <div className="shrink-0 rounded-[1.25rem] border-2 border-ink bg-cream p-3">
      <div className="flex items-center gap-3">
        <Avatar size="lg" className="border-2 border-ink after:hidden">
          {MOCK_USER.avatarUrl && (
            <AvatarImage src={MOCK_USER.avatarUrl} alt="" />
          )}
          <AvatarFallback className="bg-teal font-heading text-ink">
            {getInitials(MOCK_USER.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{MOCK_USER.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {MOCK_USER.familyName}
          </p>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1">
        <Button variant="ghost" size="sm" className="rounded-full">
          <Settings aria-hidden />
          Instellingen
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full">
          <LogOut aria-hidden />
          Uitloggen
        </Button>
      </div>
    </div>
  );
}
