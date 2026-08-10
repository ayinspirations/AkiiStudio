"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, EnvelopeSimple } from "@phosphor-icons/react";
import { ctaLabel } from "@/lib/content";

export function ContactCta() {
  const [submitted, setSubmitted] = useState(false);

  // Hinweis: Formular ist UI-fertig, aber noch nicht an einen echten
  // E-Mail-/Backend-Dienst angebunden. Vor Launch mit z. B. Formspree,
  // Resend oder einer eigenen API-Route verbinden.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="kontakt" className="border-t border-hairline px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="rounded-[2.5rem] border border-hairline bg-white/[0.03] p-1.5">
          <div className="mesh-glow relative overflow-hidden rounded-[calc(2.5rem-0.375rem)] bg-surface-raised px-6 py-16 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:px-12 lg:px-16 lg:py-20">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
                  Bereit für den nächsten Schritt?
                </h2>
                <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-muted-strong">
                  Erzählt uns von eurem Projekt. Wir melden uns innerhalb von
                  zwei Werktagen mit einem konkreten Vorschlag.
                </p>
                <a
                  href="mailto:hallo@akiistudio.de"
                  className="mt-8 inline-flex items-center gap-2 text-sm text-muted-strong transition-colors duration-300 hover:text-paper"
                >
                  <EnvelopeSimple weight="light" className="h-4 w-4" />
                  hallo@akiistudio.de
                </a>
              </div>

              <div className="lg:col-span-7">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-full min-h-[280px] flex-col items-start justify-center gap-4 rounded-[1.5rem] border border-hairline bg-white/[0.03] p-8"
                  >
                    <CheckCircle weight="light" className="h-8 w-8 text-volt" />
                    <p className="text-lg font-medium tracking-tight">
                      Danke! Eure Nachricht ist angekommen.
                    </p>
                    <p className="text-[15px] leading-relaxed text-muted-strong">
                      Wir melden uns innerhalb von zwei Werktagen bei euch.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2 sm:col-span-1">
                      <label htmlFor="name" className="text-sm text-muted-strong">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Euer Name"
                        className="rounded-xl border border-hairline-strong bg-white/[0.03] px-4 py-3 text-[15px] text-paper placeholder:text-muted focus:border-volt focus:outline-none focus:ring-1 focus:ring-volt"
                      />
                    </div>
                    <div className="flex flex-col gap-2 sm:col-span-1">
                      <label htmlFor="email" className="text-sm text-muted-strong">
                        E-Mail
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="name@firma.de"
                        className="rounded-xl border border-hairline-strong bg-white/[0.03] px-4 py-3 text-[15px] text-paper placeholder:text-muted focus:border-volt focus:outline-none focus:ring-1 focus:ring-volt"
                      />
                    </div>
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <label htmlFor="message" className="text-sm text-muted-strong">
                        Nachricht
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        placeholder="Erzählt uns kurz von eurem Projekt."
                        className="resize-none rounded-xl border border-hairline-strong bg-white/[0.03] px-4 py-3 text-[15px] text-paper placeholder:text-muted focus:border-volt focus:outline-none focus:ring-1 focus:ring-volt"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-3 rounded-full bg-volt py-1.5 pl-6 pr-1.5 text-[15px] font-medium leading-none text-volt-ink transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
                      >
                        {ctaLabel}
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-volt-ink/10">
                          →
                        </span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
