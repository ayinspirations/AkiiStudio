import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 lg:px-10">
        <h1 className="display text-[2rem] sm:text-[2.75rem]">Datenschutzerklärung</h1>
        <p className="mt-4 max-w-[60ch] rounded-[var(--radius-media)] border border-hairline bg-bright px-5 py-4 text-sm leading-relaxed text-soft">
          Platzhalter-Seite. Vor Veröffentlichung durch eine rechtsgültige,
          auf die tatsächlich eingesetzten Dienste (Hosting, Analyse,
          Kontaktformular, ggf. Cookies) zugeschnittene Datenschutzerklärung
          ersetzen, idealerweise mit anwaltlicher Prüfung.
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-soft">
          <section>
            <h2 className="display-sm text-xl text-ink">1. Verantwortlicher</h2>
            <p className="mt-2">
              [Firmenname GmbH]
              <br />
              [Straße Hausnummer, PLZ Ort]
              <br />
              E-Mail: hallo@akiistudio.de
            </p>
          </section>

          <section>
            <h2 className="display-sm text-xl text-ink">
              2. Erhebung und Speicherung personenbezogener Daten
            </h2>
            <p className="mt-2">
              Beim Besuch dieser Website erhebt unser Hosting-Anbieter
              automatisch technische Daten (u. a. IP-Adresse, Datum und
              Uhrzeit des Zugriffs, aufgerufene Seite) in Server-Logfiles.
              Diese Daten sind nicht bestimmten Personen zuordenbar.
            </p>
          </section>

          <section>
            <h2 className="display-sm text-xl text-ink">3. Kontaktformular</h2>
            <p className="mt-2">
              Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen,
              werden Ihre Angaben aus dem Formular inklusive der von Ihnen
              dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage
              bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre
              Einwilligung weiter.
            </p>
          </section>

          <section>
            <h2 className="display-sm text-xl text-ink">4. Ihre Rechte</h2>
            <p className="mt-2">
              Sie haben jederzeit das Recht auf Auskunft, Berichtigung,
              Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit
              und Widerspruch bezüglich Ihrer gespeicherten personenbezogenen
              Daten sowie das Recht auf Beschwerde bei einer
              Aufsichtsbehörde.
            </p>
          </section>

          <section>
            <h2 className="display-sm text-xl text-ink">5. Hosting</h2>
            <p className="mt-2">
              [Name und Anschrift des Hosting-Anbieters ergänzen, sobald
              feststeht, wo die Website betrieben wird.]
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
