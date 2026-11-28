"use client";

import { useTransition } from "react";
import Link from "next/link";
import { LogOut, UserRound } from "lucide-react";
import { logoutAction } from "@/app/auth/actions";
import {
  DropdownMenuItem,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const PROFILE_HREF = "/dashboard/profiel";

const ITEM_CLASS = "rounded-lg px-2 py-2 font-bold";

type AccountMenuItemsProps = {
  /** Wordt aangeroepen na een klik op "Profiel", bijv. om de drawer te sluiten. */
  onNavigate?: () => void;
};

/**
 * De vaste items van het accountmenu ("Profiel", "Uitloggen"), gedeeld door
 * het menu in de top bar en dat in de sidebar.
 */
export function AccountMenuItems({ onNavigate }: AccountMenuItemsProps) {
  const [pending, startTransition] = useTransition();

  return (
    <>
      <DropdownMenuLinkItem
        closeOnClick
        render={<Link href={PROFILE_HREF} />}
        onClick={onNavigate}
        className={ITEM_CLASS}
      >
        <UserRound aria-hidden />
        Profiel
      </DropdownMenuLinkItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        disabled={pending}
        onClick={() => startTransition(() => logoutAction())}
        className={ITEM_CLASS}
      >
        <LogOut aria-hidden />
        {pending ? "Bezig met uitloggen…" : "Uitloggen"}
      </DropdownMenuItem>
    </>
  );
}
