import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/dashboard/Logo";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { Hero } from "@/components/home/Hero";

export const metadata: Metadata = {
  title: "BabyBaas: alles over jouw kleintje op één veilige plek",
  description:
    "Leg elk kostbaar moment vast, houd slaap en groei bij, en deel de mijlpalen van je baby veilig met de mensen die je liefhebt.",
};

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-cream bg-dots">
      <header className="border-b-4 border-ink bg-yellow">
        <div className="mx-auto flex max-w-6xl items-center px-5 py-3 md:px-8">
          <Link href="/" aria-label="BabyBaas, naar de homepage">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <Hero />
        <FeatureGrid />
      </main>

      <footer className="mx-auto max-w-3xl px-5 py-8 text-center text-sm text-muted-foreground">
        BabyBaas geeft geen medisch advies. Twijfel je over de gezondheid van je
        baby? Neem contact op met je huisarts of het consultatiebureau.
      </footer>
    </div>
  );
}
