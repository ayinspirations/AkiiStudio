import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:px-10">
        <h1 className="display text-[2rem] sm:text-[2.75rem]">Impressum</h1>
        <p className="mt-4 max-w-[60ch] rounded-[var(--radius-media)] border border-hairline bg-bright px-5 py-4 text-sm leading-relaxed text-soft">
          Platzhalter-Seite. Vor Veröffentlichung mit den gesetzlich
          vorgeschriebenen Angaben nach § 5 TMG ausfüllen (Firmenname,
          Rechtsform, Anschrift, Vertretungsberechtigte, Registergericht,
          Registernummer, USt-IdNr., Kontaktdaten und ggf. Aufsichtsbehörde).
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-soft">
          <section>
            <h2 className="display-sm text-xl text-ink">Angaben gemäß § 5 TMG</h2>
            <p className="mt-2">
              [Firmenname GmbH]
              <br />
              [Straße Hausnummer]
              <br />
              [PLZ Ort]
              <br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="display-sm text-xl text-ink">Vertreten durch</h2>
            <p className="mt-2">[Vor- und Nachname der Geschäftsführung]</p>
          </section>

          <section>
            <h2 className="display-sm text-xl text-ink">Kontakt</h2>
            <p className="mt-2">
              Telefon: [Telefonnummer]
              <br />
              E-Mail: hallo@akiistudio.de
            </p>
          </section>

          <section>
            <h2 className="display-sm text-xl text-ink">Registereintrag</h2>
            <p className="mt-2">
              Eintragung im Handelsregister.
              <br />
              Registergericht: [Amtsgericht Ort]
              <br />
              Registernummer: [HRB XXXXX]
            </p>
          </section>

          <section>
            <h2 className="display-sm text-xl text-ink">Umsatzsteuer-ID</h2>
            <p className="mt-2">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: [DE XXXXXXXXX]
            </p>
          </section>

          <section>
            <h2 className="display-sm text-xl text-ink">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p className="mt-2">[Vor- und Nachname, Anschrift wie oben]</p>
          </section>

          <section>
            <h2 className="display-sm text-xl text-ink">EU-Streitschlichtung</h2>
            <p className="mt-2">
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noreferrer"
                className="text-ink underline underline-offset-4"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
