import { Announcement } from "@/components/sections/Announcement";
import { AudienceCards } from "@/components/sections/AudienceCards";
import { Footer } from "@/components/sections/Footer";
import { ForestTour } from "@/components/sections/ForestTour";
import { Header } from "@/components/sections/Header";
import { HeroCard } from "@/components/sections/Hero";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { StatsBand } from "@/components/sections/StatsBand";
import { StorySpine } from "@/components/sections/StorySpine";
import { Playground } from "@/components/sections/Playground";
import { Statement } from "@/components/sections/Statement";
import { TrustRow } from "@/components/sections/TrustRow";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <Announcement />
      <Header />
      <HeroCard />
      <TrustRow />
      <Statement />
      <StorySpine />
      <StatsBand />
      <ForestTour />
      <AudienceCards />
      <Playground />
      <PricingTeaser />
      <FinalCtaBand />
      <Footer />
    </main>
  );
}
