import Link from "next/link";
import { LinkedinLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { navLinks } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="text-lg font-semibold tracking-tight text-paper">
              Akii<span className="text-volt">Studio</span>
            </span>
            <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-muted-strong">
              Digitalagentur für Webdesign, SEO, SaaS-Entwicklung und
              individuelle KI-Agenten – aus Deutschland.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="AkiiStudio auf LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-muted-strong transition-colors duration-300 hover:text-paper"
              >
                <LinkedinLogo weight="light" className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="AkiiStudio auf Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-muted-strong transition-colors duration-300 hover:text-paper"
              >
                <InstagramLogo weight="light" className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Seite</p>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[15px] text-muted-strong transition-colors duration-300 hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">Rechtliches</p>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <Link
                  href="/impressum"
                  className="text-[15px] text-muted-strong transition-colors duration-300 hover:text-paper"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-[15px] text-muted-strong transition-colors duration-300 hover:text-paper"
                >
                  Datenschutz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-hairline pt-8 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} AkiiStudio. Alle Rechte vorbehalten.</p>
          <p>Made in Germany.</p>
        </div>
      </div>
    </footer>
  );
}
