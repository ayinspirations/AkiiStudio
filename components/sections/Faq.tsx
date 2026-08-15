import { Plus } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/Reveal";
import { faqItems } from "@/lib/content";

/**
 * Native disclosure elements, so the accordion keeps keyboard support and
 * in-page find without shipping any JavaScript for it.
 */
export function Faq() {
  return (
    <section className="bg-bright py-28 sm:py-36 lg:py-44">
      <div className="mx-auto grid w-full max-w-[92rem] grid-cols-1 gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:px-14">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 className="display max-w-[12ch] text-balance text-[2rem] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">
              Häufige Fragen.
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          {faqItems.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.05}>
              <details className="group border-b border-hairline first:border-t">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-6 text-lg text-ink transition-colors duration-300 hover:text-olive sm:py-7 sm:text-xl [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <Plus
                    weight="light"
                    aria-hidden
                    className="h-5 w-5 shrink-0 text-soft transition-transform duration-500 ease-[var(--ease-fluid)] group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-[62ch] pb-8 pr-8 text-pretty leading-relaxed text-soft">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
