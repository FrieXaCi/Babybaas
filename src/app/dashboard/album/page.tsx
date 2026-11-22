import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const metadata: Metadata = {
  title: "Album · BabyBaas",
};

export default function AlbumPage() {
  return (
    <PlaceholderPage
      title="Album"
      description="Hier zien jullie straks alle bewaarde momenten op een tijdlijn."
    />
  );
}
