import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Babybaas",
  description: "Babybaas",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
