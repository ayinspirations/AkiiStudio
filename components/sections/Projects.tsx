import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/content";

/**
 * Selected work at full scale: each entry leads with a large serif title and
 * carries its detail underneath, so the section reads as an index rather
 * than a row of cards.
 */
export function Projects() {
  return (
    <section id="projekte" className="bg-paper py-28 sm:py-36 lg:py-44">
      <div className="mx-auto w-full max-w-[92rem] px-6 sm:px-10 lg:px-14">
        <Reveal>
          <p className="text-[0.6875rem] uppercase tracking-[0.3em] text-soft">
            Projekte
          </p>
        </Reveal>

        <div className="mt-16 sm:mt-20">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              as="article"
              delay={index * 0.07}
              className="border-t border-hairline py-12 last:border-b sm:py-16"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-7">
                  <h3 className="display text-balance text-[2rem] text-ink sm:text-[2.75rem] lg:text-[3.25rem]">
                    {project.title}
                  </h3>
                  <p className="mt-5 max-w-[54ch] text-pretty leading-relaxed text-soft">
                    {project.body}
                  </p>
                </div>

                <dl className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9">
                  <div>
                    <dt className="text-sm text-soft">Leistung</dt>
                    <dd className="mt-1 text-ink">{project.discipline}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-soft">Umfang</dt>
                    <dd className="mt-1 text-ink">{project.scope}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
