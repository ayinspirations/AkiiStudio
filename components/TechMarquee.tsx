import { techLogos } from "@/lib/content";

export function TechMarquee() {
  const loop = [...techLogos, ...techLogos];

  return (
    <section aria-label="Verwendete Technologien" className="border-y border-hairline py-10">
      <p className="mb-6 text-center text-[11px] uppercase tracking-[0.18em] text-muted">
        Gebaut mit modernen Technologien
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-14">
          {loop.map((logo, i) => (
            <span
              key={`${logo.slug}-${i}`}
              className="shrink-0 whitespace-nowrap font-mono text-sm tracking-tight text-muted-strong opacity-60 transition-opacity duration-300 hover:text-paper hover:opacity-100"
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
