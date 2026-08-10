import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const siteUrl = "https://akiistudio.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AkiiStudio — Webdesign, SEO, SaaS & KI-Agenten",
    template: "%s — AkiiStudio",
  },
  description:
    "AkiiStudio ist eine deutsche Digitalagentur für Webdesign, SEO, SaaS-Entwicklung und individuelle KI-Agenten. Ein Team, ein System, messbares Wachstum.",
  keywords: [
    "Webdesign Agentur",
    "SEO Agentur",
    "SaaS Entwicklung",
    "KI Agenten",
    "AI Agents",
    "Digitalagentur Deutschland",
  ],
  authors: [{ name: "AkiiStudio" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "AkiiStudio",
    title: "AkiiStudio — Webdesign, SEO, SaaS & KI-Agenten",
    description:
      "Wir bauen Websites, SEO-Systeme, SaaS-Produkte und KI-Agenten, die euer Geschäft nach vorne bringen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AkiiStudio — Webdesign, SEO, SaaS & KI-Agenten",
    description:
      "Wir bauen Websites, SEO-Systeme, SaaS-Produkte und KI-Agenten, die euer Geschäft nach vorne bringen.",
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AkiiStudio",
  url: siteUrl,
  description:
    "Digitalagentur für Webdesign, SEO, SaaS-Entwicklung und individuelle KI-Agenten.",
  areaServed: "DE",
  address: {
    "@type": "PostalAddress",
    addressCountry: "DE",
  },
  knowsAbout: [
    "Webdesign",
    "Suchmaschinenoptimierung",
    "SaaS-Entwicklung",
    "KI-Agenten",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="grain relative overflow-x-hidden bg-ink text-paper">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
