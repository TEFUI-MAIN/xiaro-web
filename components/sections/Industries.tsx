import { MotionSection } from "@/components/Motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const industries = [
  "Transport",
  "Warehousing",
  "Field Services",
  "Manufacturing",
  "Security",
  "Facilities",
  "Local Government"
];

export function Industries() {
  return (
    <MotionSection id="industries" className="border-b border-hairline px-5 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          number="06"
          eyebrow="Industries"
          title="Built for shift-based operations."
          copy="Wherever the right contact depends on site, shift, roster and escalation rules."
          center
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {industries.map((industry) => (
            <span
              key={industry}
              className="rounded-md border border-hairline bg-card px-4 py-2.5 text-sm text-ink"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
