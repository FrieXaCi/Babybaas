"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AccountMenuItems } from "@/components/user/AccountMenuItems";
import { UserAvatar } from "@/components/user/UserAvatar";
import { FAVORITE_ITEMS, RECENT_ITEMS } from "@/lib/mock-data";
import { MAIN_NAVIGATION, isActiveRoute } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { CollectionItem } from "@/types/dashboard";
import { useDashboardUser } from "./DashboardUserProvider";

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
      <Suspense fallback={<UserProfileSkeleton />}>
        <UserProfile onNavigate={onNavigate} />
      </Suspense>
    </div>
  );
}

function UserProfileSkeleton() {
  return (
    <div
      aria-hidden
      className="h-[4.75rem] shrink-0 animate-pulse rounded-[1.25rem] border-2 border-ink bg-cream motion-reduce:animate-none"
    />
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

function UserProfile({ onNavigate }: SidebarContentProps) {
  const user = useDashboardUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Accountmenu van ${user.name}`}
        className="group flex w-full shrink-0 items-center gap-3 rounded-[1.25rem] border-2 border-ink bg-cream p-3 text-left transition-colors outline-none hover:bg-yellow/40 focus-visible:ring-4 focus-visible:ring-ink/40 data-popup-open:bg-yellow/40"
      >
        <UserAvatar name={user.name} image={user.avatarUrl} size="lg" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold">{user.name}</span>
          <span className="block truncate text-xs text-muted-foreground">
            {user.familyName ?? user.email}
          </span>
        </span>
        <ChevronUp
          aria-hidden
          className="size-4 shrink-0 transition-transform group-data-popup-open:rotate-180 motion-reduce:transition-none"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="start"
        sideOffset={8}
        className="rounded-xl border-2 border-ink bg-paper p-1.5 shadow-retro ring-0"
      >
        <AccountMenuItems onNavigate={onNavigate} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
