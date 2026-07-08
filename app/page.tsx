import { Announcement } from "@/components/sections/Announcement";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";
import { Footer } from "@/components/sections/Footer";
import { ForestTour } from "@/components/sections/ForestTour";
import { Header } from "@/components/sections/Header";
import { HeroCard } from "@/components/sections/Hero";
import { OutcomesChapter } from "@/components/sections/OutcomesChapter";
import { PainChapter } from "@/components/sections/PainChapter";
import { PricingTeaser } from "@/components/sections/PricingTeaser";
import { StatsBand } from "@/components/sections/StatsBand";
import { StorySpine } from "@/components/sections/StorySpine";
import { Playground } from "@/components/sections/Playground";
import { TrustRow } from "@/components/sections/TrustRow";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-white text-ink">
      <Announcement />
      <Header />
      <HeroCard />
      <TrustRow />
      <PainChapter />
      <StorySpine />
      <StatsBand />
      <ForestTour />
      <OutcomesChapter />
      <Playground />
      <PricingTeaser />
      <FinalCtaBand />
      <Footer />
    </main>
  );
}
