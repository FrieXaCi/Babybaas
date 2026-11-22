import type { Metadata } from "next";
import { Lilita_One, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

const lilitaOne = Lilita_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lilita",
});

export const metadata: Metadata = {
  title: "BabyBaas",
  description: "Samen spelen, momenten bewaren.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={cn(nunito.variable, lilitaOne.variable)}>
      <body>{children}</body>
    </html>
  );
}
