import Image from "next/image";
import { Ed } from "@/components/ed/Ed";
import { TwoTone } from "@/components/ed/TwoTone";

export function EdProductPeek() {
  return (
    <section id="product-peek" className="py-16 lg:py-24">
      <Ed>
        <TwoTone
          lead="This is what I look like to your ops team."
          rest="Drivers and supervisors never see a dashboard — they keep WhatsApp. You get the one screen that knows everything."
        />
        <div className="mt-12 border border-hairline">
          <Image
            src="/product/dashboard.png"
            alt="Xiaro dashboard with shift coverage, live routing activity and chain integrity"
            width={1440}
            height={868}
            sizes="(min-width: 1270px) 1270px, 100vw"
            className="w-full"
          />
        </div>
        <p className="mt-4 text-[14px] text-gray">
          Live shift coverage, unanswered messages, escalations, and a verified audit chain — one screen.
        </p>
      </Ed>
    </section>
  );
}
