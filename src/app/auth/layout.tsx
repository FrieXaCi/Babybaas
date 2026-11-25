import Link from "next/link";
import { Logo } from "@/components/dashboard/Logo";

export default function AuthLayout({ children }: LayoutProps<"/auth">) {
  return (
    <div className="flex min-h-dvh flex-col bg-cream bg-dots">
      <header className="border-b-4 border-ink bg-yellow">
        <div className="mx-auto flex max-w-6xl items-center px-5 py-3 md:px-8">
          <Link href="/" aria-label="BabyBaas, naar de homepage">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-10 md:items-center">
        <div className="w-full max-w-md rounded-[2rem] border-4 border-ink bg-paper p-6 shadow-retro-lg md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
