import { Announcement } from "@/components/sections/Announcement";
import { CostAndScenarios } from "@/components/sections/CostAndScenarios";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { HeroCard } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { StatsBand } from "@/components/sections/StatsBand";
import { StorySpine } from "@/components/sections/StorySpine";
import { Playground } from "@/components/sections/Playground";
import { PricingSummary } from "@/components/sections/PricingSummary";
import { ProductTour } from "@/components/sections/ProductTour";
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
      {/* Sections below are progressively replaced by the zd rebuild (Tasks 5–6). */}
      <Playground />
      <ProductTour />
      <CostAndScenarios />
      <Industries />
      <PricingSummary />
      <FinalCta />
      <Footer />
    </main>
  );
}
