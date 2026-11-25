"use client";

import { createContext, use, type ReactNode } from "react";
import type { DashboardUser } from "@/types/dashboard";

// De gebruiker komt als promise binnen (Cache Components): het frame van het
// dashboard rendert direct, alleen de onderdelen met gebruikersdata wachten.
const DashboardUserContext = createContext<Promise<DashboardUser> | null>(null);

export function DashboardUserProvider({
  user,
  children,
}: {
  user: Promise<DashboardUser>;
  children: ReactNode;
}) {
  return (
    <DashboardUserContext.Provider value={user}>
      {children}
    </DashboardUserContext.Provider>
  );
}

/** Gebruik binnen een `<Suspense>`-grens. */
export function useDashboardUser(): DashboardUser {
  const user = use(DashboardUserContext);
  if (!user) {
    throw new Error("useDashboardUser moet binnen DashboardUserProvider staan");
  }
  return use(user);
}
