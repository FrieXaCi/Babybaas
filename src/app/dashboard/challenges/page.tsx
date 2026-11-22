import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";

export const metadata: Metadata = {
  title: "Challenges · BabyBaas",
};

export default function ChallengesPage() {
  return (
    <PlaceholderPage
      title="Challenges"
      description="Hier kiezen jullie straks een challenge en ronden die samen af."
    />
  );
}
