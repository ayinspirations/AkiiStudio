"use server";

import type { ContactState } from "@/lib/contact-state";
import { site } from "@/lib/content";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function value(formData: FormData, key: string) {
  const raw = formData.get(key);
  return typeof raw === "string" ? raw.trim() : "";
}

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = value(formData, "name");
  const email = value(formData, "email");
  const company = value(formData, "company");
  const budget = value(formData, "budget");
  const message = value(formData, "message");
  const consent = formData.get("consent") === "on";

  const fieldErrors: Record<string, string> = {};

  if (name.length < 2) {
    fieldErrors.name = "Bitte gebt euren Namen an.";
  }
  if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Bitte gebt eine gültige E-Mail-Adresse an.";
  }
  if (message.length < 20) {
    fieldErrors.message =
      "Bitte beschreibt euer Vorhaben in mindestens 20 Zeichen.";
  }
  if (!consent) {
    fieldErrors.consent = "Bitte bestätigt die Verarbeitung eurer Angaben.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Bitte prüft die markierten Felder.",
      fieldErrors,
    };
  }

  // Delivery is configuration-driven: point CONTACT_ENDPOINT at an inbox
  // webhook (Resend, Formspark, a custom route) to switch the form on. Until
  // then it says so rather than silently dropping submissions.
  const endpoint = process.env.CONTACT_ENDPOINT;

  if (!endpoint) {
    return {
      status: "error",
      message: `Das Formular ist noch nicht an ein Postfach angebunden. Schreibt uns bitte direkt an ${site.email}.`,
      fieldErrors: {},
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, company, budget, message }),
    });

    if (!response.ok) {
      throw new Error(`Endpoint responded with ${response.status}`);
    }
  } catch {
    return {
      status: "error",
      message: `Das hat gerade nicht geklappt. Schreibt uns bitte direkt an ${site.email}.`,
      fieldErrors: {},
    };
  }

  return {
    status: "success",
    message:
      "Vielen Dank. Wir melden uns innerhalb von zwei Werktagen bei euch.",
    fieldErrors: {},
  };
}
