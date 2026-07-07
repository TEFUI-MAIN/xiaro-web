export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[300px] rounded-[2.2rem] border border-ink/15 bg-panel p-2 shadow-[0_12px_32px_rgba(20,24,31,0.14)]">
      <div className="overflow-hidden rounded-[1.8rem] bg-white">{children}</div>
    </div>
  );
}
