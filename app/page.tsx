import { EdAnswers } from "@/components/sections/EdAnswers";
import { EdCapabilities } from "@/components/sections/EdCapabilities";
import { EdFooter } from "@/components/sections/EdFooter";
import { EdHero } from "@/components/sections/EdHero";
import { EdManifesto } from "@/components/sections/EdManifesto";
import { EdNav } from "@/components/sections/EdNav";
import { EdPricing } from "@/components/sections/EdPricing";
import { EdProductPeek } from "@/components/sections/EdProductPeek";
import { EdRoi } from "@/components/sections/EdRoi";
import { EdScenarios } from "@/components/sections/EdScenarios";
import { Playground } from "@/components/sections/Playground";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-white text-ink">
      <EdNav overlay />
      <EdHero />
      <EdCapabilities />
      <EdProductPeek />
      <EdScenarios />
      <Playground />
      <EdAnswers />
      <EdManifesto />
      <EdRoi />
      <EdPricing />
      <EdFooter />
    </main>
  );
}
