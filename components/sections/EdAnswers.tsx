import { Ed } from "@/components/ed/Ed";
import { TwoTone } from "@/components/ed/TwoTone";

const answers = [
  {
    q: "Another app to force on drivers?",
    a: "No app. If they can WhatsApp, they're onboarded."
  },
  {
    q: "How long is rollout?",
    a: "Your number is live the same day — onboarding is included. Drivers are ready the minute you text them the contact."
  },
  {
    q: "What about coverage blackspots?",
    a: "SMS fallback. Same number, same thread, same record."
  },
  {
    q: "What if nobody answers?",
    a: "That's the point — silence climbs the ladder until someone owns it."
  },
  {
    q: "Are you tracking my drivers?",
    a: "Never. Location is a one-time check-in the driver approves."
  },
  {
    q: "Am I locked in?",
    a: "Month-to-month, no lock-in. Your number is contractually yours — it ports out with you if you ever leave, audit trail included."
  }
];

export function EdAnswers() {
  return (
    <section className="border-t border-line py-24 lg:py-36">
      <Ed>
        <TwoTone lead="Straight answers." rest="The questions every ops manager asks first." />
        <div className="mt-12 grid gap-x-12 gap-y-9 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {answers.map((item) => (
            <div key={item.q}>
              <h3 className="text-[15px] font-medium text-ink">{item.q}</h3>
              <p className="mt-2 max-w-[36ch] text-[15px] leading-6 text-ink-soft">{item.a}</p>
            </div>
          ))}
        </div>
      </Ed>
    </section>
  );
}
