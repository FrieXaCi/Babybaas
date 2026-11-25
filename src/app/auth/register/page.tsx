import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Aanmelden | BabyBaas",
};

export default function RegisterPage() {
  return (
    <>
      <h1 className="font-heading text-3xl">Maak een account</h1>
      <p className="mt-1 mb-6 text-muted-foreground">
        Begin met het vastleggen van alle kleine momenten.
      </p>

      <RegisterForm />

      <p className="mt-6 text-center text-sm">
        Heb je al een account?{" "}
        <Link
          href="/auth/login"
          className="font-bold underline underline-offset-4"
        >
          Log in
        </Link>
      </p>
    </>
  );
}
