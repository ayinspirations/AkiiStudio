import { Reveal } from "@/components/Reveal";
import { intro } from "@/lib/content";

/** A single column of editorial copy, deliberately narrow and unadorned. */
export function Intro() {
  return (
    <section className="bg-paper py-28 sm:py-36 lg:py-44">
      <div className="mx-auto w-full max-w-[92rem] px-6 sm:px-10 lg:px-14">
        <div className="max-w-[52rem]">
          <Reveal>
            <p className="display text-balance text-[1.75rem] text-ink sm:text-[2.25rem] lg:text-[2.75rem]">
              {intro.lead}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-10 max-w-[46rem] text-pretty text-lg leading-relaxed text-soft">
              {intro.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
