import { Logo } from "@/components/Logo";
import { legalLinks, navLinks, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-bright">
      <div className="mx-auto w-full max-w-[92rem] px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo className="text-2xl text-ink" />
            <p className="mt-5 max-w-[30ch] leading-relaxed text-soft">
              {site.tagline} für moderne Marken und Unternehmen.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-4">
            <h2 className="text-sm text-soft">Seite</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-ink transition-colors duration-300 hover:text-olive"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-sm text-soft">Kontakt</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink transition-colors duration-300 hover:text-olive"
                >
                  {site.email}
                </a>
              </li>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-soft transition-colors duration-300 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 border-t border-hairline pt-8 text-[0.8125rem] text-soft">
          © {new Date().getFullYear()} {site.fullName}
        </p>
      </div>
    </footer>
  );
}
