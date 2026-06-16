"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CalendarClock,
  Check,
  ChevronDown,
  ClipboardList,
  Clock3,
  Database,
  FileText,
  Gauge,
  History,
  KeyRound,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  Moon,
  Phone,
  Plus,
  RadioTower,
  Route,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Snowflake,
  Sun,
  Truck,
  Users,
  Zap
} from "lucide-react";
import { XiaroLogo } from "@/components/XiaroLogo";

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  group: string;
};

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Operate" },
  { id: "setup", label: "Company setup", icon: Building2, group: "Setup" },
  { id: "channels", label: "Numbers & channels", icon: RadioTower, group: "Setup" },
  { id: "users", label: "Users & roles", icon: Users, group: "People" },
  { id: "supervisors", label: "Supervisors", icon: Phone, group: "People" },
  { id: "drivers", label: "Drivers / contacts", icon: Truck, group: "People" },
  { id: "teams", label: "Teams & depots", icon: MapPin, group: "Routing" },
  { id: "rosters", label: "Rosters & shifts", icon: CalendarClock, group: "Routing" },
  { id: "rules", label: "Routing rules", icon: Route, group: "Routing" },
  { id: "conversations", label: "Conversations", icon: MessageCircle, group: "Comms" },
  { id: "coldchain", label: "Cold chain alerts", icon: Snowflake, group: "Comms" },
  { id: "audit", label: "Audit log", icon: History, group: "Compliance" },
  { id: "reports", label: "Reports", icon: BarChart3, group: "Compliance" },
  { id: "settings", label: "Settings", icon: Settings, group: "Admin" }
];

const setupSteps = [
  ["Company profile", "Complete"],
  ["Provider numbers", "In review"],
  ["Supervisors", "Complete"],
  ["Roster rules", "Needs attention"],
  ["Cold chain gateway", "Optional"],
  ["Billing", "Complete"]
];

const recentEvents = [
  ["09:42", "WhatsApp from Driver 412 routed to Sarah K.", "Delivered"],
  ["09:37", "1300 call matched Afternoon Shift rule", "Connected"],
  ["09:19", "Tive alert ING-8821 acknowledged by Tom R.", "Acknowledged"],
  ["08:58", "Night escalation rule changed by Nick A.", "Audit logged"]
];

const supervisors = [
  ["Sarah K.", "Day supervisor", "0411 222 222", "Melbourne Depot", "On shift"],
  ["James M.", "Night supervisor", "0412 100 331", "Melbourne Depot", "Standby"],
  ["Tom R.", "Weekend manager", "0419 882 105", "Sydney Depot", "Off shift"],
  ["Priya S.", "Operations manager", "0422 219 110", "All sites", "Escalation"]
];

const drivers = [
  ["DRV-412", "Michael Tran", "0400 612 412", "Melbourne", "Linehaul", "WhatsApp + SMS"],
  ["DRV-155", "Jo Bennett", "0401 882 155", "Sydney", "Metro", "WhatsApp"],
  ["DRV-089", "Ari Singh", "0402 104 089", "Brisbane", "Cold chain", "SMS fallback"],
  ["DRV-621", "Chris Vale", "0403 771 621", "Melbourne", "Local", "WhatsApp + SMS"]
];

const conversations = [
  ["WhatsApp", "Truck 412", "Breakdown on M7, need assistance.", "Sarah K.", "2m ago", "Open"],
  ["Voice", "1300 123 456", "Inbound customer call", "James M.", "6m ago", "Connected"],
  ["SMS", "Driver 089", "Arrived at depot, awaiting bay.", "Priya S.", "14m ago", "Logged"],
  ["WhatsApp", "Warehouse team", "Inbound dock blocked.", "Tom R.", "21m ago", "Resolved"]
];

const coldChainAlerts = [
  ["ING-8821", "Shipment CC-1045", "8.2°C above threshold", "Sarah K.", "Acknowledged", "Hash verified"],
  ["ING-8816", "Shipment CC-1038", "Door opened 18 min", "James M.", "Escalated", "Hash verified"],
  ["ING-8802", "Shipment CC-1029", "Returned to range", "Tom R.", "Resolved", "Hash verified"]
];

const auditRows = [
  ["09:42:11 UTC", "routing_decision", "system", "Roster rule matched: Melbourne / Day Shift", "OK"],
  ["09:41:58 UTC", "alert_received", "system", "Payload hash stored for ING-8821", "OK"],
  ["08:58:02 UTC", "config_changed", "nick.admin", "Night escalation timeout 10m → 7m", "OK"],
  ["08:15:33 UTC", "message_dispatched", "system", "WhatsApp sent via customer 360dialog key", "OK"]
];

const groupedNav = navItems.reduce<Record<string, NavItem[]>>((acc, item) => {
  acc[item.group] ??= [];
  acc[item.group].push(item);
  return acc;
}, {});

export default function PlatformPrototypePage() {
  const [active, setActive] = useState("dashboard");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const current = useMemo(() => navItems.find((item) => item.id === active) ?? navItems[0], [active]);
  const CurrentIcon = current.icon;
  const isLight = theme === "light";

  return (
    <main
      className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text)] transition-colors"
      style={
        {
          "--app-bg": isLight ? "#eef6f8" : "#070a12",
          "--app-shell": isLight ? "#f7fbfc" : "#070a12",
          "--app-sidebar": isLight ? "#fbfdff" : "#0a0a0f",
          "--app-panel": isLight ? "#ffffff" : "#10131f",
          "--app-panel-strong": isLight ? "#f7fbfc" : "#0d111c",
          "--app-soft": isLight ? "rgba(15, 23, 42, 0.035)" : "rgba(255, 255, 255, 0.035)",
          "--app-input": isLight ? "#f3f8fa" : "rgba(0, 0, 0, 0.2)",
          "--app-border": isLight ? "rgba(15, 23, 42, 0.12)" : "rgba(255, 255, 255, 0.1)",
          "--app-border-strong": isLight ? "rgba(15, 23, 42, 0.18)" : "rgba(255, 255, 255, 0.16)",
          "--app-text": isLight ? "#0f172a" : "#ffffff",
          "--app-heading": isLight ? "#020617" : "#ffffff",
          "--app-muted": isLight ? "#475569" : "#94a3b8",
          "--app-muted-2": isLight ? "#64748b" : "#64748b",
          "--app-green": isLight ? "#047857" : "#39ff88"
        } as React.CSSProperties
      }
    >
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-[var(--app-border)] bg-[var(--app-sidebar)] p-5 transition-colors lg:block">
          <div className="mb-7 flex items-center justify-between">
            <XiaroLogo compact />
            <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cyan-200">
              Prototype
            </span>
          </div>
          <div className="mb-5 rounded-2xl border border-[var(--app-border)] bg-[var(--app-soft)] p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-[var(--app-heading)]">Northline Logistics</div>
                <div className="mt-1 text-xs text-[var(--app-muted-2)]">Operations workspace</div>
              </div>
              <ChevronDown className="h-4 w-4 text-[var(--app-muted-2)]" />
            </div>
          </div>
          <nav className="space-y-6">
            {Object.entries(groupedNav).map(([group, items]) => (
              <div key={group}>
                <div className="mb-2 px-2 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--app-green)]">{group}</div>
                <div className="space-y-1">
                  {items.map((item) => {
                    const Icon = item.icon;
                    const selected = item.id === active;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActive(item.id)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                          selected
                            ? "border border-cyan-300/30 bg-gradient-to-r from-cyan-400/15 to-emerald-400/10 text-[var(--app-heading)] shadow-sm"
                            : "text-[var(--app-muted)] hover:bg-[var(--app-soft)] hover:text-[var(--app-heading)]"
                        }`}
                      >
                        <Icon className={selected ? "h-4 w-4 text-cyan-300" : "h-4 w-4 text-[var(--app-muted-2)]"} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 border-b border-[var(--app-border)] bg-[var(--app-shell)] px-4 py-4 backdrop-blur-2xl sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-300">
                  <CurrentIcon className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold tracking-[-0.02em] text-[var(--app-heading)]">{current.label}</h1>
                  <p className="text-xs text-[var(--app-muted-2)]">Static UX prototype for xiaro.io platform flow</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="hidden items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-soft)] px-3 py-2 text-sm text-[var(--app-muted-2)] sm:flex">
                  <Search className="h-4 w-4" />
                  Search screens, contacts, rules...
                </div>
                <button
                  type="button"
                  onClick={() => setTheme(isLight ? "dark" : "light")}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-soft)] px-3 py-2 text-xs font-semibold text-[var(--app-heading)] transition hover:border-cyan-300/35"
                  aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
                >
                  {isLight ? <Moon className="h-4 w-4 text-cyan-600" /> : <Sun className="h-4 w-4 text-amber-200" />}
                  {isLight ? "Dark" : "Light"}
                </button>
                <button className="rounded-lg border border-[var(--app-border)] bg-[var(--app-soft)] p-2 text-[var(--app-muted)]">
                  <Bell className="h-4 w-4" />
                </button>
                <div className="rounded-lg border border-emerald-300/25 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-500">
                  All systems mock
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs ${active === item.id ? "border-cyan-300/30 bg-cyan-400/10 text-cyan-600" : "border-[var(--app-border)] text-[var(--app-muted)]"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6 lg:px-8">
            {active === "dashboard" && <DashboardScreen />}
            {active === "setup" && <SetupScreen />}
            {active === "channels" && <ChannelsScreen />}
            {active === "users" && <UsersScreen />}
            {active === "supervisors" && <SupervisorsScreen />}
            {active === "drivers" && <DriversScreen />}
            {active === "teams" && <TeamsScreen />}
            {active === "rosters" && <RostersScreen />}
            {active === "rules" && <RulesScreen />}
            {active === "conversations" && <ConversationsScreen />}
            {active === "coldchain" && <ColdChainScreen />}
            {active === "audit" && <AuditScreen />}
            {active === "reports" && <ReportsScreen />}
            {active === "settings" && <SettingsScreen />}
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardScreen() {
  return (
    <ScreenGrid>
      <HeroPanel
        eyebrow="Today at a glance"
        title="Every channel is routing through the active roster."
        copy="A dense command view for operations managers: active supervisors, recent routing events, open alerts and system health."
      />
      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="Messages today" value="247" detail="+18% vs yesterday" tone="cyan" />
        <Metric label="Voice calls" value="84" detail="99% connected" tone="blue" />
        <Metric label="Open alerts" value="3" detail="1 escalated" tone="amber" />
        <Metric label="Avg response" value="1m 28s" detail="Within target" tone="green" />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Live routing activity" action="View all">
          <div className="space-y-3">
            {recentEvents.map(([time, event, status]) => (
              <div key={event} className="grid gap-2 rounded-xl border border-white/10 bg-black/20 p-4 sm:grid-cols-[80px_1fr_130px] sm:items-center">
                <span className="text-xs text-slate-500">{time}</span>
                <span className="text-sm text-slate-300">{event}</span>
                <Status text={status} />
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Setup progress" action="Resume setup">
          <SetupChecklist />
        </Panel>
      </div>
    </ScreenGrid>
  );
}

function SetupScreen() {
  return (
    <ScreenGrid>
      <HeroPanel eyebrow="Tenant setup" title="Configure the operating shape before channels go live." copy="This screen captures the company profile, depots, timezone, billing identity and default operating assumptions." />
      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Company profile">
          <FormGrid
            fields={[
              ["Company name", "Northline Logistics Pty Ltd"],
              ["ABN", "12 345 678 901"],
              ["Primary domain", "northline.example"],
              ["Billing email", "accounts@northline.example"],
              ["Default timezone", "Australia/Melbourne"],
              ["Retention policy", "7 years"]
            ]}
          />
        </Panel>
        <Panel title="Depots and operating sites" action="Add site">
          <SimpleTable
            columns={["Depot", "Timezone", "Operating model", "Default team"]}
            rows={[
              ["Melbourne Depot", "AEST/AEDT", "24/7", "Linehaul"],
              ["Sydney Depot", "AEST/AEDT", "5am-11pm", "Metro"],
              ["Brisbane Cold Chain", "AEST", "24/7", "Cold chain"]
            ]}
          />
        </Panel>
      </div>
      <Panel title="First-time setup sequence">
        <SetupChecklist horizontal />
      </Panel>
    </ScreenGrid>
  );
}

function ChannelsScreen() {
  return (
    <ScreenGrid>
      <HeroPanel eyebrow="Numbers & channels" title="Connect customer-owned infrastructure." copy="Xiaro stores provider references and API credentials, then routes through the customer's Alltel, 360dialog, VoIPline, Notifyre and Tive accounts." />
      <div className="grid gap-4 xl:grid-cols-3">
        <ChannelCard title="Voice via Alltel" icon={Phone} status="Connected" fields={[["1300 number", "1300 123 456"], ["Alltel account", "NTH-99821"], ["Answer point", "Shift roster mirror"], ["Overflow", "Operations manager"]]} />
        <ChannelCard title="WhatsApp via 360dialog" icon={MessageCircle} status="In review" fields={[["Business number", "+61 400 000 111"], ["WABA ID", "waba_9012"], ["Webhook", "/api/webhooks/whatsapp"], ["Template status", "Approved"]]} />
        <ChannelCard title="SMS via Notifyre" icon={Phone} status="Ready" fields={[["SMS sender", "Xiaro relay"], ["Fallback number", "+61 488 800 222"], ["Webhook", "/api/webhooks/sms"], ["Delivery callbacks", "Enabled"]]} />
      </div>
      <Panel title="Provider credential fields">
        <FormGrid
          fields={[
            ["Alltel API key", "••••••••••••••••"],
            ["360dialog API key", "••••••••••••••••"],
            ["VoIPline token", "••••••••••••••••"],
            ["Notifyre API key", "••••••••••••••••"],
            ["Tive alert mailbox", "alerts@xiaro.com.au"],
            ["Webhook signing secret", "••••••••••••••••"]
          ]}
        />
      </Panel>
    </ScreenGrid>
  );
}

function UsersScreen() {
  return (
    <ScreenGrid>
      <HeroPanel eyebrow="Users & roles" title="Invite admins and control who can change routing." copy="The real app will enforce tenant roles, MFA, and audit every permission/configuration change." />
      <div className="grid gap-4 xl:grid-cols-[1fr_0.8fr]">
        <Panel title="Platform users" action="Invite user">
          <SimpleTable
            columns={["Name", "Role", "Access", "MFA"]}
            rows={[
              ["Nick Adams", "Owner", "All sites", "Enabled"],
              ["Priya Singh", "Operations manager", "All sites", "Enabled"],
              ["Sarah King", "Supervisor", "Melbourne Depot", "Not required"],
              ["Tom Reeves", "Supervisor", "Sydney Depot", "Not required"]
            ]}
          />
        </Panel>
        <Panel title="Role permissions">
          <ToggleList items={["Manage billing", "Invite users", "Change routing rules", "View audit log", "Export reports", "Manual override"]} />
        </Panel>
      </div>
    </ScreenGrid>
  );
}

function SupervisorsScreen() {
  return (
    <ScreenGrid>
      <HeroPanel eyebrow="Supervisor directory" title="Capture the people Xiaro routes to." copy="Supervisors can receive messages on their existing phone without logging into the platform." />
      <Panel title="Supervisor contacts" action="Add supervisor">
        <SimpleTable columns={["Name", "Role", "Mobile", "Assigned site", "State"]} rows={supervisors} />
      </Panel>
      <Panel title="Supervisor detail fields">
        <FormGrid
          fields={[
            ["Full name", "Sarah King"],
            ["Mobile number", "+61 411 222 222"],
            ["WhatsApp enabled", "Yes"],
            ["SMS fallback", "Yes"],
            ["Voice answer point", "Personal mobile"],
            ["Escalation priority", "Primary"],
            ["Assigned teams", "Linehaul, Cold chain"],
            ["Quiet hours", "Outside roster only"]
          ]}
        />
      </Panel>
    </ScreenGrid>
  );
}

function DriversScreen() {
  return (
    <ScreenGrid>
      <HeroPanel eyebrow="Drivers / contacts" title="Maintain the contact universe that messages Xiaro." copy="Drivers do not need logins. They use the company number, and Xiaro uses metadata to route messages correctly." />
      <Panel title="Driver contacts" action="Import CSV">
        <SimpleTable columns={["ID", "Name", "Mobile", "Depot", "Team", "Channels"]} rows={drivers} />
      </Panel>
      <Panel title="Driver fields captured">
        <FormGrid fields={[["External ID", "DRV-412"], ["Name", "Michael Tran"], ["Mobile", "+61 400 612 412"], ["Home depot", "Melbourne"], ["Team", "Linehaul"], ["Preferred channel", "WhatsApp"], ["Fallback channel", "SMS"], ["Notes", "B-double certified"]]} />
      </Panel>
    </ScreenGrid>
  );
}

function TeamsScreen() {
  return (
    <ScreenGrid>
      <HeroPanel eyebrow="Teams & depots" title="Group people, rosters and rules by operating unit." copy="Teams and depots become the matching layer between an inbound message and the right supervisor." />
      <div className="grid gap-4 xl:grid-cols-3">
        <TeamCard title="Melbourne Linehaul" people="42 drivers" supervisor="Sarah K." hours="24/7" />
        <TeamCard title="Sydney Metro" people="28 drivers" supervisor="Tom R." hours="5am-11pm" />
        <TeamCard title="Cold Chain" people="18 drivers" supervisor="Priya S." hours="24/7 + escalation" />
      </div>
      <Panel title="Team setup fields">
        <FormGrid fields={[["Team name", "Melbourne Linehaul"], ["Depot", "Melbourne"], ["Default supervisor", "Sarah K."], ["Business hours", "24/7"], ["Public holiday rule", "Weekend manager"], ["Default escalation", "Operations manager after 7m"]]} />
      </Panel>
    </ScreenGrid>
  );
}

function RostersScreen() {
  return (
    <ScreenGrid>
      <HeroPanel eyebrow="Rosters & shifts" title="The routing engine follows the roster." copy="Recurring schedules, ad-hoc overrides and public holiday coverage are where most operational routing value lives." />
      <div className="grid gap-4 xl:grid-cols-4">
        <ShiftCard title="Day" time="6am-2pm" supervisor="Sarah K." tone="amber" />
        <ShiftCard title="Afternoon" time="2pm-10pm" supervisor="Priya S." tone="blue" />
        <ShiftCard title="Night" time="10pm-6am" supervisor="James M." tone="violet" />
        <ShiftCard title="Weekend" time="Sat-Sun" supervisor="Tom R." tone="cyan" />
      </div>
      <Panel title="Roster override form">
        <FormGrid fields={[["Override date", "2026-06-15"], ["Site", "Melbourne Depot"], ["Shift", "Night"], ["Temporary supervisor", "Priya S."], ["Reason", "James unavailable"], ["Audit note", "Required before save"]]} />
      </Panel>
    </ScreenGrid>
  );
}

function RulesScreen() {
  return (
    <ScreenGrid>
      <HeroPanel eyebrow="Routing rules" title="Define what happens for every channel, team and exception." copy="Rules are evaluated in order and every match is written to the audit trail." />
      <Panel title="Rules list" action="New rule">
        <SimpleTable
          columns={["Priority", "When", "Route to", "Escalation"]}
          rows={[
            ["1", "Cold chain alert + Melbourne", "Cold Chain Supervisor", "Ops manager after 5m"],
            ["2", "Voice call + after hours", "Night Supervisor", "Weekend manager after 7m"],
            ["3", "WhatsApp + Linehaul keyword", "Linehaul Supervisor", "Ops manager after 10m"],
            ["4", "SMS fallback + unknown driver", "Duty Manager", "Owner after 15m"]
          ]}
        />
      </Panel>
      <Panel title="Rule builder fields">
        <FormGrid fields={[["Channel", "Voice / WhatsApp / SMS"], ["Match site", "Melbourne Depot"], ["Match team", "Linehaul"], ["Keyword / intent", "Breakdown, delay, incident"], ["Active schedule", "24/7"], ["Primary recipient", "On-shift supervisor"], ["Escalate after", "7 minutes"], ["Fallback channel", "SMS + voice"]]} />
      </Panel>
    </ScreenGrid>
  );
}

function ConversationsScreen() {
  return (
    <ScreenGrid>
      <HeroPanel eyebrow="Conversations & calls" title="One searchable history across every operational channel." copy="Calls, WhatsApp, SMS and routing events appear as a single timeline for accountability." />
      <Panel title="Recent communications">
        <SimpleTable columns={["Channel", "From", "Message / event", "Routed to", "Time", "Status"]} rows={conversations} />
      </Panel>
      <Panel title="Conversation timeline">
        <Timeline
          items={[
            ["2:15 PM", "Driver 412", "Truck breakdown on M7, need assistance."],
            ["2:15 PM", "Xiaro", "Matched Melbourne Linehaul / Afternoon Shift rule."],
            ["2:16 PM", "Sarah K.", "On my way. Where are you now?"],
            ["2:16 PM", "Xiaro", "Response logged. SLA target met."]
          ]}
        />
      </Panel>
    </ScreenGrid>
  );
}

function ColdChainScreen() {
  return (
    <ScreenGrid>
      <HeroPanel eyebrow="Cold chain alerts" title="Tive excursions route through the same roster-aware engine." copy="The prototype shows alert intake fields, immutable ingestion IDs, acknowledgement status and report-ready timelines." />
      <Panel title="Alert feed">
        <SimpleTable columns={["Ingestion ID", "Shipment", "Alert", "Routed to", "State", "Audit"]} rows={coldChainAlerts} />
      </Panel>
      <Panel title="Alert ingestion fields">
        <FormGrid fields={[["Ingestion ID", "ING-8821"], ["Source", "Tive email"], ["Received at UTC", "2026-06-10T23:41:58Z"], ["Local display time", "09:41 AEST"], ["Payload hash", "8f1a...d19c"], ["Raw payload", "Stored immutably"], ["Shipment ID", "CC-1045"], ["Threshold", "7°C max"]]} />
      </Panel>
    </ScreenGrid>
  );
}

function AuditScreen() {
  return (
    <ScreenGrid>
      <HeroPanel eyebrow="Audit core" title="Append-only, hash-chained activity record." copy="This screen visualises the validation-ready audit model: who, what, when, payload references and hash verification." />
      <Panel title="Audit log">
        <SimpleTable columns={["Timestamp", "Event type", "Actor", "Event data", "Hash"]} rows={auditRows} />
      </Panel>
      <div className="grid gap-4 xl:grid-cols-3">
        <Metric label="Chain status" value="Verified" detail="No breaks detected" tone="green" />
        <Metric label="Rows today" value="1,284" detail="Append-only inserts" tone="cyan" />
        <Metric label="Retention" value="7 years" detail="S3/Glacier ready" tone="blue" />
      </div>
    </ScreenGrid>
  );
}

function ReportsScreen() {
  return (
    <ScreenGrid>
      <HeroPanel eyebrow="Reports & analytics" title="Turn routing history into operational evidence." copy="Reports cover response time, missed messages, channel volume, cold-chain excursions and exportable compliance packs." />
      <div className="grid gap-4 md:grid-cols-3">
        <ReportCard title="Response performance" icon={Gauge} stats={["Avg response 1m 28s", "94% within target", "3 escalations today"]} />
        <ReportCard title="Channel volume" icon={BarChart3} stats={["WhatsApp 63%", "Voice 24%", "SMS 13%"]} />
        <ReportCard title="Excursion report" icon={FileText} stats={["3 active alerts", "12 resolved this month", "PDF export ready"]} />
      </div>
      <Panel title="Export options">
        <ToggleList items={["PDF excursion report", "CSV communication log", "JSON audit export", "Monthly operations pack", "Supervisor response report", "SLA breach report"]} />
      </Panel>
    </ScreenGrid>
  );
}

function SettingsScreen() {
  return (
    <ScreenGrid>
      <HeroPanel eyebrow="Settings & integrations" title="Control billing, security, credentials and retention." copy="Settings are where provider credentials, data retention and future SOC/GxP controls are surfaced." />
      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="Security & data retention">
          <FormGrid fields={[["MFA policy", "Required for admins"], ["SSO", "Future-ready"], ["Audit log mode", "Append-only"], ["Hash chain", "Enabled"], ["Retention", "7 years"], ["Archive", "S3 Glacier"]]} />
        </Panel>
        <Panel title="Billing & subscription">
          <FormGrid fields={[["Plan", "Operations"], ["Monthly subscription", "$349/mo"], ["Stripe customer", "cus_9A12"], ["Onboarding package", "$399 once-off"], ["Usage charges", "Provider-owned"], ["Billing contact", "accounts@northline.example"]]} />
        </Panel>
      </div>
      <Panel title="Integration health">
        <SimpleTable columns={["Integration", "Owner", "Status", "Last check"]} rows={[["Alltel", "Customer", "Connected", "2 min ago"], ["360dialog", "Customer", "In review", "15 min ago"], ["Notifyre", "Customer", "Connected", "4 min ago"], ["Tive", "Customer + Xiaro", "Mailbox ready", "1 min ago"]]} />
      </Panel>
    </ScreenGrid>
  );
}

function ScreenGrid({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto grid max-w-7xl gap-5">{children}</div>;
}

function HeroPanel({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-[var(--app-border)] bg-[radial-gradient(ellipse_at_20%_0%,rgba(6,182,212,0.16),transparent_45%),radial-gradient(ellipse_at_90%_20%,rgba(57,255,136,0.12),transparent_36%),var(--app-panel-strong)] p-6 shadow-2xl sm:p-8">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--app-green)]">{eyebrow}</div>
      <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--app-heading)] sm:text-4xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--app-muted)]">{copy}</p>
    </section>
  );
}

function Panel({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel)] p-5 shadow-xl">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500" />
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-[var(--app-heading)]">{title}</h3>
        {action ? (
          <button className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-200">
            {action}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Metric({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: "cyan" | "blue" | "amber" | "green" }) {
  const tones = {
    cyan: "text-cyan-500 bg-cyan-400/10 border-cyan-300/25",
    blue: "text-blue-500 bg-blue-500/10 border-blue-300/25",
    amber: "text-amber-500 bg-amber-300/12 border-amber-300/25",
    green: "text-emerald-500 bg-emerald-400/10 border-emerald-300/25"
  };
  return (
    <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel)] p-5 shadow-sm">
      <div className={`mb-4 inline-flex rounded-full border px-3 py-1 text-xs ${tones[tone]}`}>{label}</div>
      <div className="text-3xl font-semibold tracking-[-0.04em] text-[var(--app-heading)]">{value}</div>
      <div className="mt-2 text-sm text-[var(--app-muted-2)]">{detail}</div>
    </div>
  );
}

function Status({ text }: { text: string }) {
  return <span className="rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-center text-xs font-semibold text-emerald-500">{text}</span>;
}

function SetupChecklist({ horizontal }: { horizontal?: boolean }) {
  return (
    <div className={horizontal ? "grid gap-3 md:grid-cols-3" : "space-y-3"}>
      {setupSteps.map(([label, state]) => (
        <div key={label} className="flex items-center justify-between gap-4 rounded-xl border border-[var(--app-border)] bg-[var(--app-input)] p-3">
          <span className="text-sm text-[var(--app-muted)]">{label}</span>
          <span className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold ${state === "Complete" ? "bg-emerald-400/10 text-emerald-300" : state === "Needs attention" ? "bg-red-500/10 text-red-300" : "bg-cyan-400/10 text-cyan-200"}`}>{state}</span>
        </div>
      ))}
    </div>
  );
}

function FormGrid({ fields }: { fields: string[][] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {fields.map(([label, value]) => (
        <label key={label} className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[var(--app-green)]">{label}</span>
          <div className="min-h-11 rounded-xl border border-[var(--app-border)] bg-[var(--app-input)] px-3 py-3 text-sm text-[var(--app-heading)]">{value}</div>
        </label>
      ))}
    </div>
  );
}

function SimpleTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--app-border)]">
      <div className="hidden grid-cols-[repeat(var(--cols),minmax(0,1fr))] border-b border-[var(--app-border)] bg-emerald-400/10 md:grid" style={{ "--cols": columns.length } as React.CSSProperties}>
        {columns.map((column) => (
          <div key={column} className="px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--app-green)]">{column}</div>
        ))}
      </div>
      <div className="divide-y divide-[var(--app-border)]">
        {rows.map((row) => (
          <div key={row.join("-")} className="grid gap-2 p-4 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))] md:gap-0 md:p-0" style={{ "--cols": columns.length } as React.CSSProperties}>
            {row.map((cell, index) => (
              <div key={`${cell}-${index}`} className="text-sm text-[var(--app-muted)] md:px-4 md:py-3">
                <span className="mr-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--app-green)] md:hidden">{columns[index]}:</span>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ToggleList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item} className="flex items-center justify-between rounded-xl border border-[var(--app-border)] bg-[var(--app-input)] p-3">
          <span className="text-sm text-[var(--app-muted)]">{item}</span>
          <span className="relative h-6 w-11 rounded-full bg-cyan-400/20">
            <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-cyan-300" />
          </span>
        </div>
      ))}
    </div>
  );
}

function ChannelCard({ title, icon: Icon, status, fields }: { title: string; icon: LucideIcon; status: string; fields: string[][] }) {
  return (
    <Panel title={title}>
      <div className="mb-5 flex items-center justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-300">
          <Icon className="h-5 w-5" />
        </div>
        <Status text={status} />
      </div>
      <div className="space-y-3">
        {fields.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3 rounded-lg bg-[var(--app-input)] px-3 py-2 text-sm">
            <span className="text-[var(--app-muted-2)]">{label}</span>
            <span className="text-right text-[var(--app-heading)]">{value}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function TeamCard({ title, people, supervisor, hours }: { title: string; people: string; supervisor: string; hours: string }) {
  return (
    <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel)] p-5 shadow-sm">
      <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-300">
        <MapPin className="h-5 w-5" />
      </div>
      <h3 className="font-semibold text-[var(--app-heading)]">{title}</h3>
      <div className="mt-4 space-y-2 text-sm text-[var(--app-muted)]">
        <div>{people}</div>
        <div>Supervisor: {supervisor}</div>
        <div>Hours: {hours}</div>
      </div>
    </div>
  );
}

function ShiftCard({ title, time, supervisor, tone }: { title: string; time: string; supervisor: string; tone: "amber" | "blue" | "violet" | "cyan" }) {
  const tones = {
    amber: "border-amber-300/20 bg-amber-300/10 text-amber-200",
    blue: "border-blue-300/20 bg-blue-500/10 text-blue-200",
    violet: "border-violet-300/20 bg-violet-500/10 text-violet-200",
    cyan: "border-cyan-300/20 bg-cyan-400/10 text-cyan-200"
  };
  return (
    <div className={`rounded-2xl border p-5 ${tones[tone]}`}>
      <Clock3 className="mb-5 h-5 w-5" />
      <h3 className="font-semibold text-[var(--app-heading)]">{title}</h3>
      <div className="mt-2 text-sm">{time}</div>
      <div className="mt-4 text-sm text-[var(--app-muted)]">{supervisor}</div>
    </div>
  );
}

function Timeline({ items }: { items: string[][] }) {
  return (
    <div className="space-y-4">
      {items.map(([time, actor, event]) => (
        <div key={`${time}-${actor}`} className="grid gap-3 rounded-xl border border-[var(--app-border)] bg-[var(--app-input)] p-4 sm:grid-cols-[90px_140px_1fr]">
          <span className="text-xs text-[var(--app-muted-2)]">{time}</span>
          <span className="text-sm font-semibold text-cyan-200">{actor}</span>
          <span className="text-sm text-[var(--app-muted)]">{event}</span>
        </div>
      ))}
    </div>
  );
}

function ReportCard({ title, icon: Icon, stats }: { title: string; icon: LucideIcon; stats: string[] }) {
  return (
    <div className="rounded-2xl border border-[var(--app-border)] bg-[var(--app-panel)] p-5 shadow-sm">
      <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-300">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-semibold text-[var(--app-heading)]">{title}</h3>
      <div className="mt-4 space-y-2">
        {stats.map((stat) => (
          <div key={stat} className="flex items-center gap-2 text-sm text-[var(--app-muted)]">
            <Check className="h-4 w-4 text-cyan-300" />
            {stat}
          </div>
        ))}
      </div>
    </div>
  );
}
