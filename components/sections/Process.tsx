import { Reveal } from "@/components/Reveal";
import { processSteps } from "@/lib/content";

/** Four stages side by side, each opening under its own rule. */
export function Process() {
  return (
    <section className="bg-paper py-28 sm:py-36 lg:py-44">
      <div className="mx-auto w-full max-w-[92rem] px-6 sm:px-10 lg:px-14">
        <Reveal>
          <h2 className="display max-w-[16ch] text-balance text-[2rem] text-ink sm:text-[2.75rem] lg:text-[3.5rem]">
            So arbeiten wir.
          </h2>
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 sm:mt-20 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal key={step.id} as="li" delay={index * 0.07}>
              <span
                aria-hidden
                className="block h-px w-full bg-hairline-strong"
              />
              <h3 className="display-sm mt-6 text-xl text-ink sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-soft">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
