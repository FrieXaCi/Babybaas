import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * Basisconfiguratie zonder Prisma of bcrypt, zodat `src/proxy.ts` licht blijft.
 * De echte wachtwoordcontrole staat in `auth.ts`.
 */
export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Wachtwoord", type: "password" },
      },
      authorize: () => null,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      const { pathname } = nextUrl;

      if (pathname.startsWith("/dashboard")) {
        // `false` stuurt door naar `pages.signIn` met een callbackUrl.
        return isLoggedIn;
      }

      if (pathname.startsWith("/auth") && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (typeof token.id === "string") {
        session.user.id = token.id;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
