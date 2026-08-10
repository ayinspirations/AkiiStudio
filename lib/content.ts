export const navLinks = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#arbeiten", label: "Arbeiten" },
  { href: "#prozess", label: "Prozess" },
  { href: "#faq", label: "FAQ" },
];

export const ctaLabel = "Projekt starten";

export const services = [
  {
    id: "webdesign",
    icon: "PenNib",
    title: "Webdesign",
    headline: "Design, das Vertrauen schafft",
    body: "Marken-Websites, die in Sekunden laden, klar kommunizieren und auf jedem Gerät überzeugen.",
    span: "lg",
  },
  {
    id: "seo",
    icon: "MagnifyingGlass",
    title: "SEO",
    headline: "Sichtbarkeit, die sich auszahlt",
    body: "Technisches SEO, Content-Strategie und lokale Optimierung für nachhaltiges Ranking.",
    span: "sm",
  },
  {
    id: "saas",
    icon: "Cube",
    title: "SaaS-Entwicklung",
    headline: "Produkte, die skalieren",
    body: "Von der ersten Idee bis zum produktiven SaaS – Full-Stack-Entwicklung mit modernem Stack.",
    span: "sm",
  },
  {
    id: "ki-agenten",
    icon: "Robot",
    title: "KI-Agenten",
    headline: "Automatisierung, die mitdenkt",
    body: "Individuelle KI-Agenten für Support, Vertrieb und interne Abläufe – trainiert auf euren Daten.",
    span: "lg",
  },
] as const;

export const processSteps = [
  {
    index: "01",
    title: "Kennenlernen",
    body: "Wir verstehen euer Geschäft, eure Zielgruppe und den aktuellen Stand eurer digitalen Präsenz.",
  },
  {
    index: "02",
    title: "Konzept & Design",
    body: "Struktur, Content-Strategie und visuelles Design entstehen gemeinsam – klar begründet, nicht dekorativ.",
  },
  {
    index: "03",
    title: "Entwicklung",
    body: "Website, SaaS-Produkt oder KI-Agent werden mit modernem Stack gebaut und laufend getestet.",
  },
  {
    index: "04",
    title: "Launch & Wachstum",
    body: "Nach dem Launch optimieren wir kontinuierlich anhand echter Daten – SEO, Conversion, Performance.",
  },
];

export const workItems = [
  {
    id: "ecommerce-relaunch",
    category: "Webdesign · SEO",
    title: "E-Commerce Relaunch",
    body: "Komplette Neuausrichtung von Design und Informationsarchitektur für einen deutschen Onlineshop.",
  },
  {
    id: "saas-dashboard",
    category: "SaaS-Entwicklung",
    title: "Analytics-Plattform",
    body: "Ein Self-Service-SaaS-Dashboard für Teams, von der ersten Zeile Code bis zum produktiven Rollout.",
  },
  {
    id: "support-agent",
    category: "KI-Agenten",
    title: "KI-Support-Agent",
    body: "Ein Agent, der Support-Anfragen automatisch beantwortet und komplexe Fälle sauber weiterleitet.",
  },
] as const;

export const faqItems = [
  {
    question: "Wie lange dauert ein typisches Projekt?",
    answer:
      "Eine neue Website dauert meist vier bis acht Wochen, ein SaaS-Produkt oder KI-Agent je nach Umfang zwei bis vier Monate. Nach dem Erstgespräch bekommt ihr einen konkreten Zeitplan.",
  },
  {
    question: "Arbeitet ihr auch mit kleinen Unternehmen und Start-ups?",
    answer:
      "Ja. Wir passen Umfang und Tempo an eure Größe an – vom ersten Web-Auftritt bis zur skalierenden SaaS-Plattform.",
  },
  {
    question: "Was kostet eine neue Website oder ein KI-Agent?",
    answer:
      "Das hängt vom Umfang ab. Nach einem kurzen Kennenlerngespräch bekommt ihr ein konkretes, unverbindliches Angebot statt einer Pauschalzahl.",
  },
  {
    question: "Übernehmt ihr auch Wartung und Weiterentwicklung nach dem Launch?",
    answer:
      "Ja, auf Wunsch betreuen wir Hosting, Sicherheit, SEO-Monitoring und Weiterentwicklung dauerhaft.",
  },
  {
    question: "Wo sitzt euer Team und mit wem arbeiten wir zusammen?",
    answer:
      "Wir arbeiten remote-first aus Deutschland und bilden für jedes Projekt ein festes, kleines Team statt wechselnder Ansprechpartner.",
  },
];

export const techLogos = [
  { slug: "nextdotjs", name: "Next.js" },
  { slug: "react", name: "React" },
  { slug: "typescript", name: "TypeScript" },
  { slug: "vercel", name: "Vercel" },
  { slug: "openai", name: "OpenAI" },
  { slug: "anthropic", name: "Anthropic" },
  { slug: "googlecloud", name: "Google Cloud" },
  { slug: "postgresql", name: "PostgreSQL" },
  { slug: "stripe", name: "Stripe" },
];
