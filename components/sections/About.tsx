import { Reveal } from "@/components/Reveal";
import { about } from "@/lib/content";

export function About() {
  return (
    <section id="ueber-uns" className="bg-bright py-28 sm:py-36 lg:py-44">
      <div className="mx-auto w-full max-w-[92rem] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="display max-w-[18ch] text-balance text-[2rem] text-ink sm:text-[2.75rem] lg:text-[3.5rem]">
                {about.headline}
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            {about.body.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.1 + index * 0.07}>
                <p className="mb-6 max-w-[48ch] text-pretty leading-relaxed text-soft last:mb-0">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-px border-t border-hairline sm:mt-24 lg:grid-cols-4">
          {about.facts.map((fact, index) => (
            <Reveal
              key={fact.label}
              delay={index * 0.06}
              className="border-b border-hairline py-8 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <dt className="text-sm text-soft">{fact.label}</dt>
              <dd className="display-sm mt-2 text-2xl text-ink sm:text-[1.75rem]">
                {fact.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
