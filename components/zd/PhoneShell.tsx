/** iPhone-style device shell: dark bezel, dynamic island, status bar. */
export function PhoneShell({
  time = "02:53",
  children
}: {
  time?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-[300px] rounded-[2.7rem] bg-[#17191E] p-[10px] shadow-[0_24px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/15">
      <div className="overflow-hidden rounded-[2.1rem] bg-white">
        <div className="relative flex items-center justify-between bg-[#075E54] px-6 pb-1 pt-2.5 text-white">
          <span className="text-[12px] font-semibold tabular-nums">{time}</span>
          <span
            aria-hidden
            className="absolute left-1/2 top-2 h-[18px] w-[74px] -translate-x-1/2 rounded-full bg-[#17191E]"
          />
          <span className="flex items-center gap-1" aria-hidden>
            <span className="flex items-end gap-[2px]">
              <span className="h-[4px] w-[3px] rounded-[1px] bg-white/90" />
              <span className="h-[6px] w-[3px] rounded-[1px] bg-white/90" />
              <span className="h-[8px] w-[3px] rounded-[1px] bg-white/90" />
              <span className="h-[10px] w-[3px] rounded-[1px] bg-white/50" />
            </span>
            <span className="ml-1 inline-block h-[10px] w-[20px] rounded-[3px] border border-white/80 p-[1.5px]">
              <span className="block h-full w-3/4 rounded-[1px] bg-white/90" />
            </span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
