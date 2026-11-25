import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { DashboardUser } from "@/types/dashboard";

/**
 * Haalt de ingelogde gebruiker op voor het dashboard. De proxy beschermt de
 * routes al; dit is een tweede controle vlak bij de data.
 */
export async function getDashboardUser(): Promise<DashboardUser> {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const membership = await prisma.familyMember.findFirst({
    where: { userId: session.user.id },
    orderBy: { joinedAt: "asc" },
    select: { family: { select: { name: true } } },
  });

  return {
    name: session.user.name || session.user.email || "Gebruiker",
    email: session.user.email ?? "",
    familyName: membership?.family.name ?? undefined,
    avatarUrl: session.user.image ?? undefined,
  };
}
