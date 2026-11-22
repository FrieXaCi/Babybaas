import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const metadata: Metadata = {
  title: "Logboek · BabyBaas",
};

export default function LogboekPage() {
  return (
    <PlaceholderPage
      title="Logboek"
      description="Hier houden jullie straks slaap- en groeimomenten bij."
    />
  );
}
