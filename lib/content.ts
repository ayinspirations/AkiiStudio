export const site = {
  name: "akii",
  fullName: "Akii Studio",
  url: "https://akiistudio.de",
  email: "hallo@akiistudio.de",
  tagline: "Webdesign und digitale Produkte",
};

export const navLinks = [
  { href: "#loesungen", label: "Lösungen" },
  { href: "#projekte", label: "Projekte" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#kontakt", label: "Kontakt" },
];

/** One label per intent, used identically in the menu, hero, and footer. */
export const ctaLabel = "Projekt anfragen";

export const hero = {
  headline: "Digitale Lösungen, die bewegen.",
  body: "Webdesign und digitale Produkte für moderne Marken und Unternehmen.",
  cta: { href: "#loesungen", label: "Mehr erfahren" },
};

/**
 * Drop a rendered interior at this path and the hero swaps the built-in
 * architectural scene for the photograph. 2400x1800 or wider, warm plaster,
 * light falling from the upper left. Leave as null to keep the scene.
 */
export const heroImage: string | null = null;

export const intro = {
  lead: "Wir gestalten und entwickeln digitale Auftritte, die ruhig wirken und präzise arbeiten.",
  body: "Akii Studio verbindet Strategie, Design und Entwicklung unter einem Dach. Statt Bausteine von drei Dienstleistern zusammenzusetzen, entsteht alles an einem Ort, in einem Team, mit einer Handschrift.",
};

export const solutions = [
  {
    id: "webdesign",
    title: "Webdesign",
    body: "Marken-Websites, die schnell laden, klar führen und auf jedem Gerät bestehen. Von der Informationsarchitektur bis zum fertigen Design-System.",
    items: ["Konzept & Wireframes", "Design-System", "Umsetzung in Next.js"],
  },
  {
    id: "digitale-produkte",
    title: "Digitale Produkte",
    body: "Vom Prototyp bis zum produktiven Betrieb. Wir bauen Anwendungen mit einem Stack, den euer Team später selbst weiterführen kann.",
    items: ["Prototyp", "Full-Stack-Umsetzung", "Betrieb & Wartung"],
  },
  {
    id: "sichtbarkeit",
    title: "Sichtbarkeit",
    body: "Technisches SEO, saubere Content-Struktur und lokale Optimierung, damit gefunden wird, was ihr aufgebaut habt.",
    items: ["Technisches Audit", "Content-Struktur", "Local SEO"],
  },
  {
    id: "automatisierung",
    title: "Automatisierung",
    body: "Individuelle KI-Agenten für Support, Vertrieb und interne Abläufe, trainiert auf euren Daten und eingebettet in eure Systeme.",
    items: ["Use-Case-Analyse", "Agent & Integration", "Monitoring"],
  },
];

export const projects = [
  {
    id: "ecommerce-relaunch",
    title: "E-Commerce Relaunch",
    discipline: "Webdesign, Sichtbarkeit",
    body: "Neuausrichtung von Design und Informationsarchitektur für einen deutschen Onlineshop. Sortiment, Filterlogik und Checkout wurden vollständig neu gedacht.",
    scope: "Relaunch in zwölf Wochen",
  },
  {
    id: "analytics-plattform",
    title: "Analytics-Plattform",
    discipline: "Digitale Produkte",
    body: "Ein Self-Service-Dashboard für Teams, von der ersten Zeile Code bis zum produktiven Rollout inklusive Abrechnung und Rollenverwaltung.",
    scope: "Vom Prototyp zur Produktion",
  },
  {
    id: "support-agent",
    title: "Support-Agent",
    discipline: "Automatisierung",
    body: "Ein Agent, der wiederkehrende Anfragen eigenständig beantwortet und komplexe Fälle mit vollständigem Kontext an das Team übergibt.",
    scope: "Angebunden an bestehendes Ticketing",
  },
];

export const about = {
  headline: "Ein kleines Team, das den ganzen Weg mitgeht.",
  body: [
    "Akii Studio arbeitet remote-first aus Deutschland. Für jedes Projekt stellen wir ein festes, kleines Team zusammen, statt Ansprechpartner durchzureichen.",
    "Wir übernehmen Strategie, Design und Entwicklung selbst. Das verkürzt die Wege und sorgt dafür, dass am Ende auch gebaut wird, was vorher entworfen wurde.",
  ],
  facts: [
    { label: "Erfahrung", value: "5+ Jahre" },
    { label: "Projekte", value: "30+" },
    { label: "Arbeitsweise", value: "Remote-first" },
    { label: "Standort", value: "Deutschland" },
  ],
};

export const processSteps = [
  {
    id: "kennenlernen",
    title: "Kennenlernen",
    body: "Wir verstehen euer Geschäft und den Stand eurer digitalen Präsenz. Am Ende steht ein klarer Umfang statt einer Wunschliste.",
  },
  {
    id: "konzept",
    title: "Konzept & Design",
    body: "Struktur, Inhalte und visuelles Design entstehen gemeinsam. Jede Entscheidung ist begründet, nichts ist Dekoration.",
  },
  {
    id: "umsetzung",
    title: "Umsetzung",
    body: "Gebaut und laufend getestet. Ihr seht jede Woche einen funktionierenden Stand statt einer Statusmeldung.",
  },
  {
    id: "betrieb",
    title: "Launch & Betrieb",
    body: "Nach dem Launch optimieren wir anhand echter Daten weiter: Performance, Sichtbarkeit und Conversion.",
  },
];

export const faqItems = [
  {
    question: "Wie lange dauert ein typisches Projekt?",
    answer:
      "Eine neue Website dauert meist vier bis acht Wochen, ein digitales Produkt je nach Umfang zwei bis vier Monate. Nach dem Erstgespräch bekommt ihr einen konkreten Zeitplan.",
  },
  {
    question: "Arbeitet ihr auch mit kleinen Unternehmen und Start-ups?",
    answer:
      "Ja. Wir passen Umfang und Tempo an eure Größe an, vom ersten Web-Auftritt bis zur skalierenden Plattform.",
  },
  {
    question: "Was kostet eine Zusammenarbeit?",
    answer:
      "Das hängt vom Umfang ab. Nach einem kurzen Kennenlerngespräch bekommt ihr ein konkretes, unverbindliches Angebot statt einer Pauschalzahl.",
  },
  {
    question: "Übernehmt ihr auch Wartung und Weiterentwicklung?",
    answer:
      "Ja. Auf Wunsch betreuen wir Hosting, Sicherheit, Monitoring und Weiterentwicklung dauerhaft.",
  },
  {
    question: "Wem gehört am Ende der Code und das Design?",
    answer:
      "Euch. Ihr bekommt das vollständige Repository und alle Design-Dateien. Wir setzen auf verbreitete Technologien, damit ihr nicht an uns gebunden seid.",
  },
];

export const contact = {
  headline: "Erzählt uns von eurem Vorhaben.",
  body: "Eine kurze Beschreibung reicht. Wir melden uns innerhalb von zwei Werktagen mit einer ehrlichen Einschätzung, ob und wie wir helfen können.",
  budgets: [
    "Unter 10.000 €",
    "10.000 bis 25.000 €",
    "25.000 bis 50.000 €",
    "Über 50.000 €",
    "Noch offen",
  ],
};

export const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];
