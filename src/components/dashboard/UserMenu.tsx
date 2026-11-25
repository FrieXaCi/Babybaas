"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/auth/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDashboardUser } from "./DashboardUserProvider";
import { UserAvatar } from "./UserAvatar";

export function UserMenuSkeleton() {
  return (
    <div
      aria-hidden
      className="size-9 shrink-0 animate-pulse rounded-full border-2 border-ink bg-paper motion-reduce:animate-none md:w-32"
    />
  );
}

export function UserMenu() {
  const user = useDashboardUser();
  const [pending, startTransition] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Account van ${user.name}`}
        className="flex shrink-0 items-center gap-2 rounded-full border-2 border-ink bg-paper py-0.5 pr-0.5 pl-0.5 font-bold shadow-retro-sm outline-none focus-visible:ring-4 focus-visible:ring-ink md:pr-3"
      >
        <UserAvatar user={user} />
        <span className="hidden max-w-32 truncate text-sm md:inline">
          {user.name}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56 rounded-xl border-2 border-ink bg-paper p-1.5 shadow-retro ring-0"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 py-1.5">
            <p className="truncate text-sm font-bold text-ink">{user.name}</p>
            {user.email && (
              <p className="truncate text-xs font-normal">{user.email}</p>
            )}
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={pending}
          onClick={() => startTransition(() => logoutAction())}
          className="rounded-lg px-2 py-2 font-bold"
        >
          <LogOut aria-hidden />
          {pending ? "Bezig met uitloggen…" : "Uitloggen"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
