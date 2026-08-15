import { Reveal } from "@/components/Reveal";
import { solutions } from "@/lib/content";

/**
 * Four capabilities as an editorial list: the discipline holds the left
 * column, the explanation the right, separated only by hairlines.
 */
export function Solutions() {
  return (
    <section id="loesungen" className="bg-bright py-28 sm:py-36 lg:py-44">
      <div className="mx-auto w-full max-w-[92rem] px-6 sm:px-10 lg:px-14">
        <Reveal>
          <p className="text-[0.6875rem] uppercase tracking-[0.3em] text-soft">
            Lösungen
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mt-8 max-w-[20ch] text-balance text-[2rem] text-ink sm:text-[2.75rem] lg:text-[3.5rem]">
            Was wir für euch bauen.
          </h2>
        </Reveal>

        <div className="mt-16 border-t border-hairline sm:mt-20">
          {solutions.map((solution, index) => (
            <Reveal
              key={solution.id}
              as="article"
              delay={index * 0.06}
              className="grid grid-cols-1 gap-6 border-b border-hairline py-10 sm:py-14 lg:grid-cols-12 lg:gap-10"
            >
              <h3 className="display-sm text-2xl text-ink sm:text-[1.75rem] lg:col-span-4">
                {solution.title}
              </h3>

              <p className="max-w-[52ch] text-pretty leading-relaxed text-soft lg:col-span-5">
                {solution.body}
              </p>

              <ul className="flex flex-col gap-2 lg:col-span-3">
                {solution.items.map((item) => (
                  <li key={item} className="text-sm text-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
