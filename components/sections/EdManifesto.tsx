import { Ed } from "@/components/ed/Ed";

export function EdManifesto() {
  return (
    <section className="border-t border-line py-24 lg:py-36">
      <Ed>
        <div className="max-w-3xl border-l-[3px] border-amber pl-6 sm:pl-8">
          <p className="text-[13px] uppercase tracking-[0.12em] text-ink-soft">
            Why a number, not an app
          </p>
          <p className="mt-6 text-balance text-[26px] leading-[1.35] text-ink lg:text-[32px]">
            Every fleet app dies the same death: drivers won&apos;t install it,
            supervisors stop opening it, and six months later the group chats are
            back.
          </p>
          <p className="mt-6 max-w-2xl text-[17px] leading-8 text-ink-soft">
            So we didn&apos;t build an app. We built the number — the one thing
            every driver already uses. WhatsApp when there&apos;s data, SMS when
            there isn&apos;t, a roster deciding who answers, and a record nobody
            can quietly edit. Software should disappear into the way your fleet
            already works. That&apos;s the whole idea.
          </p>
          <p className="mt-8 text-[15px] text-ink">— The Xiaro team, Australia</p>
        </div>
      </Ed>
    </section>
  );
}
