import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Clock3,
  Check,
  EyeOff,
  FileText,
  MessageCircle,
  PhoneCall,
  Sparkles,
  Zap
} from "lucide-react";
import { CheckoutButton } from "@/components/CheckoutButton";
import { MotionCard, MotionSection } from "@/components/Motion";
import { RoiSection } from "@/components/RoiSection";
import { XiaroLogo } from "@/components/XiaroLogo";

type CheckoutPlan = string;

const draftSections = [
  {
    eyebrow: "One platform",
    title: "Every channel flows through one routing layer.",
    copy: "Voice, WhatsApp, SMS and future alerts all route through the same roster-aware decision engine, so the field never needs to know who is on shift.",
    image: "/draft/multi-channel.png",
    alt: "Xiaro multi-channel routing flow",
    icon: Sparkles,
    fit: "contain"
  },
  {
    eyebrow: "Voice routing",
    title: "Calls reach the supervisor actually on duty.",
    copy: "Connect 1300 and 1800 numbers through Xiaro. Calls are routed by roster, shift, business hours, overflow and escalation logic.",
    image: "/draft/voice-routing.png",
    alt: "Xiaro voice routing concept",
    icon: PhoneCall,
    badge: "Powered by Alltel Infrastructure",
    fit: "contain"
  },
  {
    eyebrow: "WhatsApp operations",
    title: "WhatsApp becomes an operational channel, not another inbox.",
    copy: "Drivers and field teams message one company number. Xiaro identifies the active supervisor and keeps the conversation history visible.",
    image: "/draft/whatsapp-routing.png",
    alt: "Xiaro WhatsApp routing concept",
    icon: MessageCircle,
    fit: "contain"
  },
  {
    eyebrow: "SMS fallback",
    title: "When data drops, routing keeps working.",
    copy: "SMS becomes the fallback path in low-coverage yards, warehouses and regional runs. Same number. Same routing. Same reporting.",
    image: "/draft/sms-fallback.png",
    alt: "Xiaro SMS fallback concept",
    icon: BellRing,
    fit: "contain"
  },
  {
    eyebrow: "Supervisor experience",
    title: "No app. No login. No friction.",
    copy: "Supervisors receive calls and messages on their existing mobile phones while Xiaro handles routing, logging and visibility in the background.",
    image: "/draft/supervisor-experience.png",
    alt: "Xiaro supervisor experience",
    icon: Zap,
    fit: "cover"
  },
  {
    eyebrow: "Dashboard & visibility",
    title: "Control the routing logic without chasing people.",
    copy: "Manage teams, rosters, rules, call logs, message history and reports from one operating dashboard.",
    image: "/draft/dashboard.png",
    alt: "Xiaro dashboard preview",
    icon: BarChart3,
    fit: "cover"
  }
];

const painPoints = [
  {
    title: "Drivers call the wrong person",
    copy: "Personal mobile numbers become the operating system, so off-shift supervisors still get dragged into live incidents.",
    icon: PhoneCall
  },
  {
    title: "Messages go unanswered",
    copy: "WhatsApp groups create noise, but no owner. Critical updates sit beside chatter with no clear accountability.",
    icon: MessageCircle
  },
  {
    title: "Supervisors change shifts",
    copy: "Day, afternoon, night and weekend rosters change faster than contact lists can be updated.",
    icon: Clock3
  },
  {
    title: "No visibility",
    copy: "Operations managers cannot see who received the call, who replied, or how long the response took.",
    icon: EyeOff
  },
  {
    title: "No audit trail",
    copy: "When something goes wrong, there is no clean history of calls, messages, routing and ownership.",
    icon: FileText
  },
  {
    title: "Delayed responses",
    copy: "Every minute spent finding the right person delays the load, the customer and the recovery plan.",
    icon: Zap
  }
];

type PricingPlan =
  | {
      name: string;
      price: string;
      suffix: string;
      description: string;
      plan: CheckoutPlan;
      cta: string;
      featured?: boolean;
      features: string[];
    }
  | {
      name: string;
      price: string;
      description: string;
      features: string[];
      plan?: never;
      suffix?: never;
      cta?: never;
      featured?: never;
    };

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$149",
    suffix: "/mo",
    description: "1 depot · up to 20 drivers",
    plan: "starter",
    cta: "Get started",
    features: ["SMS routing", "WhatsApp routing", "3 supervisors", "4 shift windows", "Manual override", "30-day message history", "Email support"]
  },
  {
    name: "Operations",
    price: "$349",
    suffix: "/mo",
    description: "1-2 depots · up to 150 drivers",
    plan: "operations",
    cta: "Get started",
    featured: true,
    features: ["Everything in Starter", "Voice routing (1300/1800)", "8 supervisors", "Unlimited shift windows", "Escalation rules", "90-day message history", "Reporting & analytics", "Priority support"]
  },
  {
    name: "Business",
    price: "$699",
    suffix: "/mo",
    description: "3-5 depots · up to 500 drivers",
    plan: "business",
    cta: "Get started",
    features: ["Everything in Operations", "20 supervisors", "Multi-site routing logic", "API access & webhooks", "Custom escalation flows", "Unlimited message history", "Dedicated account manager"]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "500+ drivers · national operators",
    features: ["Everything in Business", "Unlimited supervisors & sites", "Custom TMS/WMS integrations", "SSO & advanced security", "SLA & compliance reporting", "24/7 enterprise support"]
  }
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0a0a0f] text-white">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[760px] bg-[radial-gradient(ellipse_at_30%_0%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(ellipse_at_70%_10%,rgba(6,182,212,0.12),transparent_45%)]" />
      <Header />
      <Hero />
      <Problem />
      <RoiSection />
      <HowItWorks />
      <ImageStory />
      <Industries />
      <Pricing />
      <FinalCta />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/85 px-5 py-4 backdrop-blur-2xl lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#" aria-label="Xiaro home">
          <XiaroLogo compact />
        </a>
        <div className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
          <a href="#how-it-works" className="transition hover:text-white">How it works</a>
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#industries" className="transition hover:text-white">Industries</a>
          <a href="#pricing" className="transition hover:text-white">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="#demo" className="hidden rounded-md border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/5 sm:inline-flex">
            Book demo
          </a>
          <a href="#pricing" className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600">
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-73px)] overflow-hidden">
      <Image
        src="/hero/hero1.png"
        alt="Xiaro routing voice, WhatsApp and SMS communications for transport teams"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-black/20" />
      <div className="relative mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-5 py-16 lg:px-12">
        <MotionCard className="max-w-2xl">
          <XiaroLogo />
          <h1 className="mt-8 text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
            One Number.
            <br />
            Every Channel.
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Right Person.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200/90">
            Intelligent communication routing for shift-based transport, logistics
            and field operations.
          </p>
          <div className="mt-8 grid max-w-md gap-3">
            {[
              { label: "Voice Calls", detail: "1300 / 1800 via Alltel", icon: PhoneCall, tone: "bg-blue-500" },
              { label: "WhatsApp", detail: "Primary channel", icon: MessageCircle, tone: "bg-emerald-500" },
              { label: "SMS", detail: "Fallback channel", icon: BellRing, tone: "bg-violet-500" }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={`grid h-12 w-12 place-items-center rounded-full ${item.tone} shadow-[0_0_28px_rgba(59,130,246,0.45)]`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{item.label}</div>
                    <div className="text-sm text-slate-300/80">{item.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#pricing" className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#demo" className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15">
              Book Demo
            </a>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/15 pt-6">
            {[
              ["1", "number for everything"],
              ["3", "channels supported"],
              ["0", "apps for supervisors"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-black/25 p-4 backdrop-blur">
                <div className="text-2xl font-semibold tracking-[-0.04em] text-white">{value}</div>
                <div className="mt-1 text-xs leading-5 text-slate-300/80">{label}</div>
              </div>
            ))}
          </div>
        </MotionCard>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <MotionSection className="relative overflow-hidden border-y border-white/10 bg-[#0f0f1a] px-5 py-24 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(239,68,68,0.12),transparent_38%),radial-gradient(ellipse_at_80%_20%,rgba(59,130,246,0.12),transparent_42%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="relative grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="The problem"
              title="A shift changes. The responsibility trail disappears."
              copy="Transport teams rarely fail because nobody cares. They fail because the right person is hard to find when rosters, sites and escalation paths keep moving."
            />
            <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-500/10 p-5">
              <div className="text-sm font-semibold text-red-200">Before Xiaro</div>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-red-300" /> Driver calls old mobile number</div>
                <div className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-amber-300" /> Message lands in a noisy group</div>
                <div className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-slate-500" /> Operations has no clean record</div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
          {painPoints.map((point, index) => (
            <MotionCard key={point.title} delay={index * 0.04} className="group rounded-2xl border border-white/10 bg-[#13131f]/86 p-6 shadow-2xl transition hover:border-red-300/30 hover:bg-white/[0.055]">
              <div className="mb-5 flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-red-400/25 bg-red-500/12 text-red-300">
                  <point.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-slate-600">0{index + 1}</span>
              </div>
              <h3 className="font-semibold text-white">{point.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{point.copy}</p>
            </MotionCard>
          ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function HowItWorks() {
  const columns = [
    {
      title: "Inbound",
      icon: PhoneCall,
      items: ["Customer dials 1300 / 1800", "Driver sends WhatsApp", "SMS arrives as fallback"],
      tone: "from-blue-500/20 to-cyan-500/10"
    },
    {
      title: "Routing engine",
      icon: Sparkles,
      items: ["Check current time", "Match roster and site", "Apply escalation rules"],
      tone: "from-cyan-500/20 to-blue-500/10"
    },
    {
      title: "Delivered",
      icon: Check,
      items: ["Connect active supervisor", "Log call and message history", "Keep operations visible"],
      tone: "from-emerald-500/20 to-cyan-500/10"
    }
  ];

  return (
    <MotionSection id="how-it-works" className="relative px-5 py-24 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(6,182,212,0.13),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="How it works"
              title="One operating layer between every channel and every shift."
              copy="Xiaro turns messy inbound communication into a clean routing decision: who is responsible right now, and what should happen if they do not answer."
            />
            <div className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              {[
                ["Voice", "1300 number", "Alltel infrastructure"],
                ["WhatsApp", "Company number", "Primary messaging"],
                ["SMS", "Fallback path", "Low data coverage"]
              ].map(([channel, source, detail]) => (
                <div key={channel} className="grid grid-cols-[0.8fr_1fr_1fr] items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm">
                  <span className="font-semibold text-white">{channel}</span>
                  <span className="text-slate-400">{source}</span>
                  <span className="text-right text-cyan-200/80">{detail}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {columns.map((column, index) => {
              const Icon = column.icon;
              return (
                <MotionCard key={column.title} delay={index * 0.06} className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b ${column.tone} p-6 shadow-2xl`}>
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
                  <div className="mb-5 flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/25 bg-cyan-400/10 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-500">0{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">{column.title}</h3>
                  <div className="mt-5 space-y-3">
                    {column.items.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        {item}
                      </div>
                    ))}
                  </div>
                </MotionCard>
              );
            })}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function ImageStory() {
  return (
    <section id="features" className="px-5 py-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {draftSections.map((section, index) => (
          <ImageFeature key={section.title} section={section} index={index} />
        ))}
      </div>
    </section>
  );
}

function ImageFeature({ section, index }: { section: (typeof draftSections)[number]; index: number }) {
  const Icon = section.icon;
  const imageFirst = index % 2 === 0;
  return (
    <div className="grid gap-10 border-b border-white/10 py-16 last:border-b-0 lg:grid-cols-2 lg:items-center">
      <MotionCard delay={0.04} className={imageFirst ? "" : "lg:order-2"}>
        <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#080d19] p-3 shadow-2xl">
          <div className="absolute -inset-8 bg-cyan-400/10 blur-3xl" />
          <Image
            src={section.image}
            alt={section.alt}
            width={1672}
            height={941}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`relative aspect-[16/10] w-full rounded-xl ${section.fit === "cover" ? "object-cover" : "object-contain"}`}
          />
        </div>
      </MotionCard>
      <MotionCard delay={0.1} className={imageFirst ? "" : "lg:order-1"}>
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
          <Icon className="h-4 w-4" />
          {section.eyebrow}
        </div>
        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">{section.title}</h2>
        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">{section.copy}</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {["Roster aware", "Shift based", "Escalation ready", "History captured"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-slate-400">
              <Check className="h-4 w-4 text-cyan-300" />
              {item}
            </div>
          ))}
        </div>
        <FeatureProof eyebrow={section.eyebrow} />
        {section.badge ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-4 py-2 text-xs text-slate-400">
            <Zap className="h-3.5 w-3.5 text-cyan-300" />
            {section.badge}
          </div>
        ) : null}
      </MotionCard>
    </div>
  );
}

function FeatureProof({ eyebrow }: { eyebrow: string }) {
  const proof =
    eyebrow === "Voice routing"
      ? {
          label: "Live call decision",
          rows: [
            ["Incoming", "1300 XXX XXX at 2:47 PM"],
            ["Active shift", "Afternoon supervisor"],
            ["Outcome", "Connected, logged, visible"]
          ]
        }
      : eyebrow === "WhatsApp operations"
        ? {
            label: "Message path",
            rows: [
              ["Driver", "Truck 23 needs assistance"],
              ["Xiaro", "Matched to night shift"],
              ["Outcome", "Forwarded with history"]
            ]
          }
        : eyebrow === "SMS fallback"
          ? {
              label: "Fallback logic",
              rows: [
                ["Coverage", "No data available"],
                ["Fallback", "SMS remains active"],
                ["Outcome", "Same routing rules"]
              ]
            }
          : eyebrow === "Supervisor experience"
            ? {
                label: "Supervisor handoff",
                rows: [
                  ["Install", "No app required"],
                  ["Access", "No login or training"],
                  ["Reply", "Use existing phone"]
                ]
              }
            : eyebrow === "Dashboard & visibility"
              ? {
                  label: "Operations view",
                  rows: [
                    ["Today", "247 messages routed"],
                    ["Accuracy", "100% matched to rules"],
                    ["Records", "Calls and messages stored"]
                  ]
                }
              : {
                  label: "Routing decision",
                  rows: [
                    ["Input", "Voice, WhatsApp, SMS"],
                    ["Rules", "Roster, shift, site"],
                    ["Output", "Right person first time"]
                  ]
                };

  return (
    <div className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-black/25">
      <div className="border-b border-white/10 bg-white/[0.035] px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
        {proof.label}
      </div>
      <div className="divide-y divide-white/10">
        {proof.rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[0.8fr_1.2fr] gap-4 px-4 py-3 text-sm">
            <span className="text-slate-500">{label}</span>
            <span className="text-right text-slate-200">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Industries() {
  return (
    <MotionSection className="border-y border-white/10 bg-[#0f0f1a] px-5 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Industries"
          title="Built for shift-based operations."
          copy="Transport, warehouse, field and service teams use Xiaro when the right contact depends on site, shift, roster and escalation rules."
          center
        />
        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-white/12 bg-white/[0.035] p-2">
          <Image
            src="/draft/industries.png"
            alt="Industries served by Xiaro"
            width={1672}
            height={941}
            sizes="100vw"
            className="aspect-[16/8] w-full rounded-xl object-contain"
          />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Transport", "Warehousing", "Field Services", "Manufacturing", "Security", "Facilities", "Local Government"].map((industry) => (
            <span key={industry} className="rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">
              {industry}
            </span>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function Pricing() {
  return (
    <MotionSection id="pricing" className="px-5 py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, transparent pricing."
          copy="Start with one communication layer, then expand routing rules, teams and reporting as your operation grows."
          center
        />
        <div className="mt-12 grid items-stretch gap-x-5 gap-y-12 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex h-full flex-col rounded-2xl p-6 ${plan.featured ? "border border-blue-400/70 bg-[#0d111c] pt-12 shadow-[0_0_80px_rgba(59,130,246,0.18)]" : "border border-white/10 bg-[#13131f]"}`}
            >
              {plan.featured ? (
                <div className="absolute left-1/2 top-0 z-10 min-w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(135deg,#3b82f6,#06b6d4)] px-7 py-3 text-center text-sm font-semibold text-white shadow-[0_18px_44px_rgba(6,182,212,0.34)]">
                  Most popular
                </div>
              ) : null}
              <div className="flex items-start justify-between gap-3">
                <div className={`text-xs font-semibold uppercase tracking-[0.16em] ${plan.featured ? "text-cyan-300" : "text-slate-300"}`}>{plan.name}</div>
              </div>
              <div className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white">
                {plan.price}
                {"suffix" in plan ? <span className="text-base font-normal text-slate-500">{plan.suffix}</span> : null}
              </div>
              <p className="mt-3 min-h-14 border-b border-white/10 pb-6 text-sm leading-6 text-slate-500">{plan.description}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-400">
                    <Check className="h-4 w-4 shrink-0 text-cyan-300" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {plan.plan ? (
                  <CheckoutButton plan={plan.plan} featured={plan.featured}>{plan.cta}</CheckoutButton>
                ) : (
                  <a href="#demo" className="inline-flex w-full items-center justify-center rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5">
                    Contact sales
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-500">
          Usage charges for 1300/1800 numbers, voice minutes, SMS and WhatsApp messages may apply separately.
        </p>
        <div className="mx-auto mt-12 max-w-5xl rounded-2xl border border-amber-300/20 bg-amber-300/[0.07] p-6 shadow-[0_0_60px_rgba(251,191,36,0.08)] sm:flex sm:items-start sm:gap-5">
          <div className="mb-4 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-amber-300/25 bg-amber-300/10 text-amber-200 sm:mb-0">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Optional onboarding package — $399 once-off</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Xiaro handles full third-party setup on behalf of the customer: Alltel 1300 number, VoIPline/Notifyre SMS, and 360dialog WhatsApp Business API configuration. Most operators take this to make it work from day one.
            </p>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function FinalCta() {
  return (
    <MotionSection id="demo" className="relative overflow-hidden px-5 py-28 text-center lg:px-12">
      <div className="absolute left-1/2 top-1/2 h-80 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/12 blur-3xl" />
      <div className="relative mx-auto max-w-3xl">
        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Get started today</div>
        <h2 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">Stop Chasing Who&apos;s On Shift</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-400">Route every voice call, WhatsApp message and SMS to the right person, first time.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#pricing" className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-7 py-3 text-sm font-semibold text-white transition hover:brightness-110">Start Free Trial</a>
          <a href="mailto:hello@xiaro.com.au" className="rounded-lg border border-white/15 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/5">Book Demo</a>
        </div>
      </div>
    </MotionSection>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-12 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <XiaroLogo />
          <p className="mt-4 text-sm text-slate-400">Right Person. First Time.</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">Workforce Communications Platform built for shift-based operations in Australia.</p>
        </div>
        <FooterColumn title="Product" links={["How it works", "Features", "Pricing", "Integrations"]} />
        <FooterColumn title="Industries" links={["Transport & Logistics", "Warehousing", "Field Services", "Manufacturing"]} />
        <FooterColumn title="Company" links={["Contact", "Privacy Policy", "Terms of Service", "Support"]} />
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-600">
        <span>© 2026 Xiaro Pty Ltd. All rights reserved.</span>
        <span>xiaro.com.au</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">{title}</h3>
      <div className="grid gap-2 text-sm text-slate-400">
        {links.map((link) => (
          <a key={link} href="#" className="transition hover:text-white">{link}</a>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, copy, center }: { eyebrow: string; title: string; copy: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">{eyebrow}</div>
      <h2 className="text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-slate-400">{copy}</p>
    </div>
  );
}
