import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const metadata: Metadata = {
  title: "Profiel · BabyBaas",
};

export default function ProfielPage() {
  return (
    <PlaceholderPage
      title="Profiel"
      description="Hier pas je straks je naam, profielfoto en wachtwoord aan."
    />
  );
}
