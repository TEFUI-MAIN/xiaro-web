import { Chip } from "@/components/ui/Chip";

/**
 * Coded illustration of a WhatsApp conversation through the company number.
 * Deliberately a component, not a screenshot: the driver side of Xiaro is
 * literally WhatsApp, so we illustrate it honestly in code. Names fictional.
 */
export function ChatMock() {
  return (
    <div className="flex h-[560px] flex-col bg-[#EFEAE2] text-[13px]">
      <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-xs font-semibold">
          AF
        </div>
        <div>
          <div className="text-sm font-semibold leading-4">Acme Freight</div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#84F27A]" />
            one number for everything
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden p-3">
        <div className="self-center rounded bg-[#FFF5C4] px-2 py-1 text-[10px] text-[#5B6472]">
          Today
        </div>
        <div className="max-w-[85%] self-start rounded-lg rounded-tl-none bg-white p-2.5 shadow-sm">
          <p className="leading-5 text-[#14181F]">
            Truck 41 — flat tyre on the M7, need a tow
          </p>
          <div className="mt-1 text-right font-mono text-[10px] text-[#5B6472]">02:47</div>
        </div>
        <div className="max-w-[85%] self-end rounded-lg rounded-tr-none bg-[#D9FDD3] p-2.5 shadow-sm">
          <p className="text-[11px] font-semibold text-[#17834A]">Marco · on shift</p>
          <p className="mt-0.5 leading-5 text-[#14181F]">
            Tow booked, ETA 40 min. Sit tight.
          </p>
          <div className="mt-1 text-right font-mono text-[10px] text-[#5B6472]">
            02:49 <span className="text-[#53BDEB]">✓✓</span>
          </div>
        </div>
        <div className="mt-auto flex flex-col items-center gap-2 pb-1">
          <Chip tone="green">Reply logged 02:49</Chip>
          <Chip tone="amber">Escalation armed · 5:00</Chip>
        </div>
      </div>
    </div>
  );
}
