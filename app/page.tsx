import { CostAndScenarios } from "@/components/sections/CostAndScenarios";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Industries } from "@/components/sections/Industries";
import { PricingSummary } from "@/components/sections/PricingSummary";
import { Problem } from "@/components/sections/Problem";
import { ProductTour } from "@/components/sections/ProductTour";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <Header />
      <Hero />
      <Problem />
      <CostAndScenarios />
      <HowItWorks />
      <ProductTour />
      <Industries />
      <PricingSummary />
      <FinalCta />
      <Footer />
    </main>
  );
}
