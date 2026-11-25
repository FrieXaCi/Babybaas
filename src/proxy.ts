import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Next.js 16: `middleware.ts` heet nu `proxy.ts`. Alleen de lichte authConfig
// (zonder Prisma); de `authorized`-callback bepaalt de toegang.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
