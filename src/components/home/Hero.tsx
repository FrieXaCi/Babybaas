import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroImage from "../../../public/images/hero-babybaas.png";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-8 pb-14 md:grid-cols-[1.1fr_1fr] md:gap-12 md:px-8 md:pt-14 md:pb-20"
    >
      <div className="flex flex-col items-start gap-6">
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-teal px-3 py-1 text-sm font-bold shadow-retro-sm">
          <Lock aria-hidden className="size-4" />
          Privé, geen openbare feed
        </span>

        <h1
          id="hero-title"
          className="text-4xl leading-[1.05] text-balance sm:text-5xl lg:text-6xl"
        >
          {/* Text-shadow als extra contrast naast de stroke (oranje op crème is ~2,6:1). */}
          <span className="text-orange [-webkit-text-stroke:1.5px_var(--ink)] [paint-order:stroke_fill] [text-shadow:2px_2px_0_var(--ink)]">
            BabyBaas:
          </span>{" "}
          Alles over jouw kleintje op één veilige plek.
        </h1>

        <p className="max-w-xl text-lg text-pretty text-muted-foreground">
          Leg elk kostbaar moment vast, houd slaap en groei bij, en deel de
          mijlpalen van je baby veilig met de mensen die je liefhebt.
        </p>

        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/auth/register"
            className={cn(buttonVariants({ variant: "retro", size: "xl" }), "w-full sm:w-auto")}
          >
            Aanmelden
            <ArrowRight aria-hidden />
          </Link>
          <Link
            href="/auth/login"
            className={cn(
              buttonVariants({ variant: "retro-outline", size: "xl" }),
              "w-full sm:w-auto",
            )}
          >
            Inloggen
          </Link>
        </div>
      </div>

      <HeroIllustration />
    </section>
  );
}

function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-md md:max-w-none">
      <span
        aria-hidden
        className="absolute -top-5 -right-3 z-10 flex size-16 rotate-12 items-center justify-center rounded-full border-[3px] border-ink bg-yellow font-heading text-sm leading-none shadow-retro md:-right-5 md:size-20 md:text-base"
      >
        100%
        <br />
        privé
      </span>
      <div className="overflow-hidden rounded-[2rem] border-4 border-ink bg-paper shadow-retro-lg md:rotate-1">
        <Image
          src={heroImage}
          alt="Illustratie van twee ouders die samen op een vloerkleed naar hun lachende baby kijken."
          placeholder="blur"
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1152px) 520px, (min-width: 768px) 45vw, min(100vw, 448px)"
          className="aspect-square h-auto w-full object-cover"
        />
      </div>
    </div>
  );
}
