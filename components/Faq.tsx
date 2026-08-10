import { Plus } from "@phosphor-icons/react/dist/ssr";
import { faqItems } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="border-t border-hairline px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl">
              Häufige Fragen.
            </h2>
            <p className="mt-4 max-w-[38ch] text-[15px] leading-relaxed text-muted-strong">
              Nicht dabei, was ihr wissen wollt? Schreibt uns direkt – wir
              antworten persönlich.
            </p>
          </div>

          <div className="divide-y divide-hairline lg:col-span-8">
            {faqItems.map((item) => (
              <details key={item.question} className="group py-6 first:pt-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
                  <span className="text-base font-medium tracking-tight sm:text-lg">
                    {item.question}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-paper transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-open:rotate-45">
                    <Plus weight="regular" className="h-4 w-4" />
                  </span>
                </summary>
                <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-muted-strong">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
