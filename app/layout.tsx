import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { site } from "@/lib/content";
import "./globals.css";

const title = "Akii Studio · Webdesign und digitale Produkte";
const description =
  "Akii Studio gestaltet und entwickelt Websites, digitale Produkte und Automatisierung für moderne Marken und Unternehmen. Strategie, Design und Entwicklung aus einer Hand.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s · Akii Studio",
  },
  description,
  keywords: [
    "Webdesign Agentur",
    "Digitalagentur",
    "digitale Produkte",
    "SEO Agentur",
    "KI Agenten",
    "Webentwicklung Deutschland",
  ],
  authors: [{ name: site.fullName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.url,
    siteName: site.fullName,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ed" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1815" },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.fullName,
  url: site.url,
  email: site.email,
  description,
  areaServed: "DE",
  address: { "@type": "PostalAddress", addressCountry: "DE" },
  knowsAbout: [
    "Webdesign",
    "Digitale Produkte",
    "Suchmaschinenoptimierung",
    "KI-Agenten",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      // Keeps in-page anchor scrolling smooth while route changes still jump
      // to the top, which Next 16 no longer does by default.
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="grain relative overflow-x-hidden bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
