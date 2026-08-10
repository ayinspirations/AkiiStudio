"use client";

import { motion } from "motion/react";
import { Robot, User } from "@phosphor-icons/react";

const conversation = [
  {
    role: "user" as const,
    text: "Wie lange dauert ein Website-Relaunch bei euch?",
  },
  {
    role: "agent" as const,
    text: "Im Schnitt vier bis acht Wochen, abhängig vom Umfang. Soll ich dir einen Termin für ein kurzes Kennenlerngespräch vorschlagen?",
  },
  {
    role: "user" as const,
    text: "Ja gerne, nächste Woche Dienstag.",
  },
];

export function AiAgentSpotlight() {
  return (
    <section className="border-t border-hairline px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-2xl">
          <h2 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
            Euer Team bekommt Verstärkung, die nie schläft.
          </h2>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-strong sm:text-lg">
            Wir bauen KI-Agenten, die auf euren eigenen Daten und Tools laufen –
            für Support, Vertrieb und interne Prozesse. Rund um die Uhr, ohne
            Warteschlange.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 rounded-[2rem] border border-hairline bg-white/[0.03] p-1.5 lg:mt-16"
        >
          <div className="rounded-[calc(2rem-0.375rem)] bg-surface-raised p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 font-mono text-xs text-muted">akiistudio-agent · Support</span>
            </div>

            <div className="flex flex-col gap-4 px-4 py-8 sm:px-8">
              {conversation.map((message, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-start gap-3 ${
                    message.role === "user" ? "flex-row-reverse text-right" : ""
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      message.role === "agent" ? "bg-volt/10 text-volt" : "bg-white/10 text-paper"
                    }`}
                  >
                    {message.role === "agent" ? (
                      <Robot weight="light" className="h-4 w-4" />
                    ) : (
                      <User weight="light" className="h-4 w-4" />
                    )}
                  </span>
                  <p
                    className={`max-w-[34ch] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                      message.role === "agent"
                        ? "bg-white/5 text-paper"
                        : "bg-volt/10 text-paper"
                    }`}
                  >
                    {message.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
