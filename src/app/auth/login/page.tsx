import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { safeCallbackUrl } from "@/lib/auth-validation";

export const metadata: Metadata = {
  title: "Inloggen | BabyBaas",
};

export default function LoginPage({ searchParams }: PageProps<"/auth/login">) {
  return (
    <>
      <h1 className="font-heading text-3xl">Welkom terug</h1>
      <p className="mt-1 mb-6 text-muted-foreground">
        Log in om verder te gaan in jullie gezinsruimte.
      </p>

      {/* searchParams is runtime-data (Cache Components): lees die binnen Suspense. */}
      <Suspense fallback={<LoginForm callbackUrl="/dashboard" />}>
        <LoginFormWithCallback searchParams={searchParams} />
      </Suspense>

      <p className="mt-6 text-center text-sm">
        Nog geen account?{" "}
        <Link
          href="/auth/register"
          className="font-bold underline underline-offset-4"
        >
          Meld je aan
        </Link>
      </p>
    </>
  );
}

async function LoginFormWithCallback({
  searchParams,
}: Pick<PageProps<"/auth/login">, "searchParams">) {
  const { callbackUrl } = await searchParams;
  return <LoginForm callbackUrl={safeCallbackUrl(callbackUrl)} />;
}
