"use client";

import Image from "next/image";
import { MotionCard } from "@/components/Motion";
import { Ed } from "@/components/ed/Ed";
import { TwoTone } from "@/components/ed/TwoTone";

const scenarios = [
  {
    sim: { idx: 0, answers: true },
    category: "Night shift",
    title: "The 2:47 am flat tyre nobody used to answer",
    src: "/photos/driver-cab-night.jpg",
    alt: "Driver in a truck cab at night"
  },
  {
    sim: { idx: 2, answers: false },
    category: "Changeover",
    title: "The 2 pm handover where messages used to vanish",
    src: "/photos/hero-truck-dusk.jpg",
    alt: "Truck crossing a bridge at dusk"
  },
  {
    sim: { idx: 1, answers: false },
    category: "Dispute",
    title: "The withheld invoice, answered with an audit export",
    src: "/photos/ops-supervisor.jpg",
    alt: "Operations supervisor reviewing a tablet in a warehouse"
  }
];

export function EdScenarios() {
  return (
    <section id="scenarios" className="py-24 lg:py-36">
      <Ed>
        <TwoTone
          lead="The days I'm built for."
          rest="Run any of them in the simulator and watch me work."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {scenarios.map((scenario, index) => (
            <MotionCard key={scenario.title} delay={index * 0.06}>
              <a
                href="/#try-it"
                className="group block"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("xiaro:scenario", { detail: scenario.sim })
                  );
                }}
              >
                <div className="relative h-[300px] overflow-hidden lg:h-[360px]">
                  <Image
                    src={scenario.src}
                    alt={scenario.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-5 text-[13px] text-gray">{scenario.category}</p>
                <h3 className="mt-1.5 max-w-[30ch] text-[19px] leading-6 text-ink">
                  {scenario.title}
                </h3>
                <p className="mt-2.5 text-[14px] text-[#0D5BD6]">
                  Run this scenario <span aria-hidden>→</span>
                </p>
              </a>
            </MotionCard>
          ))}
        </div>
      </Ed>
    </section>
  );
}
