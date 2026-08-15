"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { submitContact } from "@/app/actions/contact";
import { Reveal } from "@/components/Reveal";
import { initialContactState } from "@/lib/contact-state";
import { contact, ctaLabel, site } from "@/lib/content";

const FIELD_CLASS =
  "w-full rounded-full border border-hairline-strong bg-bright px-5 py-3.5 text-[0.9375rem] text-ink transition-colors duration-300 placeholder:text-soft focus:border-olive focus:outline-none";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full border border-olive bg-olive px-7 py-3.5 text-sm text-bright transition-all duration-500 ease-[var(--ease-fluid)] hover:border-olive-bright hover:bg-olive-bright active:scale-[0.98] disabled:cursor-progress disabled:opacity-70"
    >
      {pending ? "Wird gesendet" : ctaLabel}
    </button>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-[0.8125rem] text-olive">
      {message}
    </p>
  );
}

export function Contact() {
  const [state, formAction] = useActionState(submitContact, initialContactState);
  const uid = useId();

  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;
  const describedBy = (name: string) =>
    state.fieldErrors[name] ? errorId(name) : undefined;

  return (
    <section id="kontakt" className="bg-paper py-28 sm:py-36 lg:py-44">
      <div className="mx-auto w-full max-w-[92rem] px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="display max-w-[14ch] text-balance text-[2rem] text-ink sm:text-[2.75rem] lg:text-[3.5rem]">
                {contact.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-[42ch] text-pretty leading-relaxed text-soft">
                {contact.body}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <a
                href={`mailto:${site.email}`}
                className="display-sm mt-10 inline-block border-b border-hairline-strong pb-1 text-xl text-ink transition-colors duration-300 hover:border-olive hover:text-olive"
              >
                {site.email}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:col-span-7">
            {state.status === "success" ? (
              <div
                role="status"
                className="flex h-full min-h-[24rem] flex-col items-start justify-center rounded-[var(--radius-media)] border border-hairline bg-bright p-10"
              >
                <CheckCircle
                  weight="light"
                  aria-hidden
                  className="h-9 w-9 text-olive"
                />
                <p className="display-sm mt-6 max-w-[30ch] text-balance text-2xl text-ink">
                  {state.message}
                </p>
              </div>
            ) : (
              <form action={formAction} noValidate className="grid gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={fieldId("name")}
                      className="mb-2 block text-sm text-soft"
                    >
                      Name
                    </label>
                    <input
                      id={fieldId("name")}
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      aria-invalid={Boolean(state.fieldErrors.name)}
                      aria-describedby={describedBy("name")}
                      className={FIELD_CLASS}
                    />
                    <FieldError
                      id={errorId("name")}
                      message={state.fieldErrors.name}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={fieldId("email")}
                      className="mb-2 block text-sm text-soft"
                    >
                      E-Mail
                    </label>
                    <input
                      id={fieldId("email")}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-invalid={Boolean(state.fieldErrors.email)}
                      aria-describedby={describedBy("email")}
                      className={FIELD_CLASS}
                    />
                    <FieldError
                      id={errorId("email")}
                      message={state.fieldErrors.email}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={fieldId("company")}
                      className="mb-2 block text-sm text-soft"
                    >
                      Unternehmen
                    </label>
                    <input
                      id={fieldId("company")}
                      name="company"
                      type="text"
                      autoComplete="organization"
                      className={FIELD_CLASS}
                    />
                    <p className="mt-2 text-[0.8125rem] text-soft">Optional.</p>
                  </div>

                  <div>
                    <label
                      htmlFor={fieldId("budget")}
                      className="mb-2 block text-sm text-soft"
                    >
                      Budgetrahmen
                    </label>
                    <select
                      id={fieldId("budget")}
                      name="budget"
                      defaultValue=""
                      className={`${FIELD_CLASS} appearance-none`}
                    >
                      <option value="">Bitte wählen</option>
                      {contact.budgets.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 text-[0.8125rem] text-soft">
                      Hilft uns bei der Einschätzung.
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={fieldId("message")}
                    className="mb-2 block text-sm text-soft"
                  >
                    Worum geht es?
                  </label>
                  <textarea
                    id={fieldId("message")}
                    name="message"
                    rows={5}
                    required
                    aria-invalid={Boolean(state.fieldErrors.message)}
                    aria-describedby={describedBy("message")}
                    className={`${FIELD_CLASS} resize-y rounded-[var(--radius-media)]`}
                  />
                  <FieldError
                    id={errorId("message")}
                    message={state.fieldErrors.message}
                  />
                </div>

                <div>
                  <label
                    htmlFor={fieldId("consent")}
                    className="flex cursor-pointer items-start gap-3 text-[0.8125rem] leading-relaxed text-soft"
                  >
                    <input
                      id={fieldId("consent")}
                      name="consent"
                      type="checkbox"
                      required
                      aria-invalid={Boolean(state.fieldErrors.consent)}
                      aria-describedby={describedBy("consent")}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--c-olive)]"
                    />
                    <span>
                      Ich bin damit einverstanden, dass meine Angaben zur
                      Bearbeitung der Anfrage verarbeitet werden. Details in der{" "}
                      <a
                        href="/datenschutz"
                        className="text-ink underline underline-offset-2"
                      >
                        Datenschutzerklärung
                      </a>
                      .
                    </span>
                  </label>
                  <FieldError
                    id={errorId("consent")}
                    message={state.fieldErrors.consent}
                  />
                </div>

                {state.status === "error" && state.message ? (
                  <p
                    role="alert"
                    className="flex items-start gap-2.5 rounded-[var(--radius-media)] border border-hairline-strong bg-bright px-5 py-4 text-[0.875rem] leading-relaxed text-ink"
                  >
                    <WarningCircle
                      weight="light"
                      aria-hidden
                      className="mt-0.5 h-5 w-5 shrink-0 text-olive"
                    />
                    {state.message}
                  </p>
                ) : null}

                <div className="pt-1">
                  <SubmitButton />
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
