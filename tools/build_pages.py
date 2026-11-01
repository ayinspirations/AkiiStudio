#!/usr/bin/env python3
"""Generates the service pages and the case-studies page for akiistudio.de.
Run from the repo root:  python3 build_pages.py"""
import json, os, html

SITE = "https://akiistudio.de"
TODAY = "2026-11-01"
E = html.escape

SERVICES = [
    ("webdesign", "Webdesign"),
    ("seo-geo", "SEO &amp; GEO"),
    ("digitale-loesungen", "Digitale Lösungen"),
    ("apps-saas", "Apps &amp; SaaS"),
]

ORG = {
    "@type": "ProfessionalService",
    "@id": f"{SITE}/#organization",
    "name": "akii studio",
    "url": f"{SITE}/",
    "logo": f"{SITE}/assets/img/logo-schwarz.png",
    "email": "hallo@akiistudio.de",
    "telephone": "+49 173 7318640",
    "foundingDate": "2025",
    "founder": {"@type": "Person", "name": "Akan Yüksel"},
    "address": {"@type": "PostalAddress", "streetAddress": "Paracelsusstr. 18",
                "postalCode": "71229", "addressLocality": "Leonberg",
                "addressRegion": "Baden-Württemberg", "addressCountry": "DE"},
    "areaServed": [{"@type": "City", "name": "Leonberg"}, {"@type": "City", "name": "Stuttgart"},
                   {"@type": "AdministrativeArea", "name": "Baden-Württemberg"},
                   {"@type": "Country", "name": "Deutschland"}],
}

CASES = {
    "gg-manufaktur": dict(name="GG Manufaktur", tag="Website · 2026", img="ph-02",
                          text="Auftritt für eine Gaming- und eSport-Agentur aus Rutesheim."),
    "skv-rutesheim": dict(name="SKV Rutesheim", tag="Vereinswebsite · 2026", img="ph-03",
                          text="Neue Website für einen Sportverein mit vielen Abteilungen."),
    "lina-soul": dict(name="Lina Soul", tag="Website · 2025", img="ph-05",
                      text="Galerie-Website für abstrakte Acrylmalerei."),
    "fusspflege": dict(name="Fußpflege", tag="Konzept · 2025", img="ph-07",
                       text="Gestaltungskonzept und Prototyp für eine Fußpflege-Praxis."),
}


def head(title, desc, path, ld, og_img="assets/img/og-image.jpg"):
    url = f"{SITE}{path}"
    return f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="{url}">
<meta name="author" content="akii studio">
<meta name="theme-color" content="#F7F3ED">
<link rel="icon" href="/favicon.ico?v=2" sizes="48x48">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32-v2.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16-v2.png">
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon-v2.png">
<link rel="manifest" href="/site.webmanifest?v=2">
<meta property="og:type" content="website">
<meta property="og:site_name" content="akii studio">
<meta property="og:locale" content="de_DE">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{SITE}/{og_img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{SITE}/{og_img}">
<meta name="geo.region" content="DE-BW">
<meta name="geo.placename" content="Leonberg">
<link rel="stylesheet" href="/assets/css/style.css">
<link rel="stylesheet" href="/assets/css/pages.css">
<script type="application/ld+json">
{json.dumps({"@context": "https://schema.org", "@graph": ld}, ensure_ascii=False, indent=2)}
</script>
</head>
<body class="page">
<a class="sr-only" href="#inhalt">Zum Inhalt springen</a>
"""


def gnav(current):
    links = []
    for slug, label in SERVICES:
        cur = ' aria-current="page"' if current == slug else ""
        links.append(f'<a href="/leistungen/{slug}/"{cur}>{label}</a>')
    cur = ' aria-current="page"' if current == "case-studies" else ""
    links.append(f'<a href="/case-studies/"{cur}>Case Studies</a>')
    links.append('<a class="gnav__cta" href="/#kontakt">Projekt anfragen</a>')
    return f"""<header class="gnav">
  <a class="gnav__logo" href="/" aria-label="akii studio — Startseite">
    <img src="/assets/img/logo-schwarz.png" alt="akii studio" width="480" height="221">
  </a>
  <nav class="gnav__links" aria-label="Hauptnavigation">
    {chr(10).join('    ' + l for l in links).strip()}
  </nav>
  <button class="gnav__burger" aria-label="Menü" aria-expanded="false"><span></span><span></span><span></span></button>
</header>
"""


def lnav(title, anchors):
    a = "\n    ".join(f'<a href="#{i}">{t}</a>' for i, t in anchors)
    return f"""<nav class="lnav" aria-label="{E(title)} — Abschnitte">
  <span class="lnav__title">{title}</span>
  <div class="lnav__links">
    {a}
    <a class="pill" href="/#kontakt">Anfragen</a>
  </div>
</nav>
"""


def crumbs(items):
    lis = []
    for i, (name, href) in enumerate(items):
        if href:
            lis.append(f'<li><a href="{href}">{name}</a></li>')
        else:
            lis.append(f'<li aria-current="page">{name}</li>')
    return f'<nav class="crumbs" aria-label="Brotkrumen"><ol>{"".join(lis)}</ol></nav>\n'


def crumbs_ld(items, path):
    out = []
    for i, (name, href) in enumerate(items, 1):
        it = {"@type": "ListItem", "position": i, "name": html.unescape(name)}
        it["item"] = f"{SITE}{href}" if href else f"{SITE}{path}"
        out.append(it)
    return {"@type": "BreadcrumbList", "@id": f"{SITE}{path}#breadcrumb", "itemListElement": out}


def faq_html(faqs):
    items = "\n".join(f"""    <div class="faq__item">
      <h3><button class="faq__q">{q}<span class="faq__icon" aria-hidden="true"></span></button></h3>
      <div class="faq__a"><div><p>{a}</p></div></div>
    </div>""" for q, a in faqs)
    return f'  <div class="faq">\n{items}\n  </div>'


def faq_ld(faqs, path):
    return {"@type": "FAQPage", "@id": f"{SITE}{path}#faq",
            "mainEntity": [{"@type": "Question", "name": html.unescape(q),
                            "acceptedAnswer": {"@type": "Answer", "text": html.unescape(a)}} for q, a in faqs]}


def img(name, alt, w=1600, h=1000, lazy=True, cls=""):
    la = ' loading="lazy"' if lazy else ' fetchpriority="high"'
    c = f' class="{cls}"' if cls else ""
    return f'<img src="/assets/img/placeholder/{name}.jpg" alt="{alt}" width="{w}" height="{h}" decoding="async"{la}{c}>'


def shot(slug, alt, lazy=True):
    """Screenshot of a project's hero (assets/img/cases/<slug>.webp/.jpg)."""
    la = ' loading="lazy"' if lazy else ''
    return (f'<picture><source srcset="/assets/img/cases/{slug}.webp" type="image/webp">'
            f'<img src="/assets/img/cases/{slug}.jpg" alt="{alt}" width="1600" height="1000" decoding="async"{la}></picture>')


def card(slug):
    c = CASES[slug]
    return f"""    <a class="card" href="/case-studies/#{slug}">
      {shot(slug, c['name'] + ' — Startseite der Website')}
      <div class="card__body"><span class="card__tag">{c['tag']}</span><h3>{c['name']}</h3><p>{c['text']}</p></div>
    </a>"""


def footer():
    svc = "\n".join(f'        <li><a href="/leistungen/{s}/">{l}</a></li>' for s, l in SERVICES)
    return f"""<footer class="pfoot">
  <div class="pfoot__grid">
    <div class="pfoot__brand">
      <a href="/" aria-label="akii studio — Startseite"><img src="/assets/img/logo-creme.png" alt="akii studio" width="480" height="221" loading="lazy"></a>
      <p>Webdesign, SEO &amp; GEO und digitale Lösungen für den Mittelstand. Aus Leonberg bei Stuttgart.</p>
    </div>
    <div>
      <h2>Leistungen</h2>
      <ul>
{svc}
      </ul>
    </div>
    <div>
      <h2>Studio</h2>
      <ul>
        <li><a href="/case-studies/">Case Studies</a></li>
        <li><a href="/#studio">Über akii</a></li>
        <li><a href="/#faq">Häufige Fragen</a></li>
      </ul>
    </div>
    <div>
      <h2>Kontakt</h2>
      <ul>
        <li><a href="mailto:hallo@akiistudio.de">hallo@akiistudio.de</a></li>
        <li><a href="tel:+491737318640">+49 173 7318640</a></li>
        <li><a href="/#kontakt">Projekt anfragen</a></li>
      </ul>
    </div>
  </div>
  <div class="pfoot__bottom">
    <span>© 2025–<span id="year">2026</span> akii studio · Paracelsusstr. 18, 71229 Leonberg</span>
    <span><a href="/impressum.html">Impressum</a> · <a href="/datenschutz.html">Datenschutz</a></span>
  </div>
</footer>
<script src="/assets/js/pages.js" defer></script>
</body>
</html>
"""


def cta(title, text):
    return f"""<section class="cta" aria-labelledby="cta-title">
  <div class="cta__inner">
    <h2 id="cta-title">{title}</h2>
    <p>{text}</p>
    <div class="phero__ctas">
      <a class="pill pill--lg pill--light" href="/#kontakt">Projekt anfragen</a>
      <a class="more" href="tel:+491737318640">Oder direkt anrufen</a>
    </div>
  </div>
</section>
"""


def tile(t):
    size = t.get("size", "half")
    tone = t.get("tone", "")
    cls = f"tile tile--{size}" + (f" tile--{tone}" if tone else "")
    out = [f'    <article class="{cls}">']
    if t.get("eyebrow"):
        out.append(f'      <span class="tile__eyebrow">{t["eyebrow"]}</span>')
    out.append(f'      <h3>{t["h"]}</h3>')
    out.append(f'      <p>{t["p"]}</p>')
    if t.get("big"):
        out.append(f'      <span class="tile__big" aria-hidden="true">{t["big"]}</span>')
    if t.get("list"):
        out.append('      <ul class="tile__list">' + "".join(f"<li>{x}</li>" for x in t["list"]) + "</ul>")
    if t.get("img"):
        out.append(f'      <div class="tile__media">{img(t["img"], t.get("alt", ""))}</div>')
    out.append("    </article>")
    return "\n".join(out)


def service_page(d):
    path = f"/leistungen/{d['slug']}/"
    crumb_items = [("Startseite", "/"), ("Leistungen", "/#leistungen"), (d["name"], None)]
    service_ld = {
        "@type": "Service", "@id": f"{SITE}{path}#service",
        "name": html.unescape(d["name"]), "serviceType": d["serviceType"],
        "description": html.unescape(d["desc"]), "url": f"{SITE}{path}",
        "provider": {"@id": ORG["@id"]}, "areaServed": ORG["areaServed"],
        "audience": {"@type": "BusinessAudience", "name": "Mittelstand, Selbstständige und Vereine"},
        "hasOfferCatalog": {"@type": "OfferCatalog", "name": html.unescape(d["name"]),
                            "itemListElement": [{"@type": "Offer", "itemOffered": {"@type": "Service", "name": html.unescape(x)}} for x in d["checks"]]},
    }
    page_ld = {"@type": "WebPage", "@id": f"{SITE}{path}#webpage", "url": f"{SITE}{path}",
               "name": html.unescape(d["title"]), "description": html.unescape(d["desc"]),
               "inLanguage": "de-DE", "isPartOf": {"@id": f"{SITE}/#website"},
               "about": {"@id": f"{SITE}{path}#service"}, "breadcrumb": {"@id": f"{SITE}{path}#breadcrumb"},
               "primaryImageOfPage": f"{SITE}/assets/img/placeholder/{d['hero_img']}.jpg",
               "dateModified": TODAY}
    website_ld = {"@type": "WebSite", "@id": f"{SITE}/#website", "url": f"{SITE}/", "name": "akii studio",
                  "inLanguage": "de-DE", "publisher": {"@id": ORG["@id"]}}
    ld = [ORG, website_ld, page_ld, service_ld, crumbs_ld(crumb_items, path), faq_ld(d["faqs"], path)]

    others = [(s, l) for s, l in SERVICES if s != d["slug"]]
    other_cards = "\n".join(f"""    <a class="card" href="/leistungen/{s}/">
      {img(dict(SVC_IMG)[s], '')}
      <div class="card__body"><span class="card__tag">Leistung</span><h3>{l}</h3><p>{dict(SVC_TEASER)[s]}</p></div>
    </a>""" for s, l in others)

    tiles = "\n".join(tile(t) for t in d["tiles"])
    steps = "\n".join(f"    <li><h3>{h}</h3><p>{p}</p></li>" for h, p in d["steps"])
    checks = "\n".join(f"    <li>{c}</li>" for c in d["checks"])
    cases = "\n".join(card(c) for c in d["cases"])

    body = f"""{gnav(d['slug'])}{lnav(d['name'], [('ueberblick', 'Überblick'), ('ablauf', 'Ablauf'), ('umfang', 'Leistungsumfang'), ('referenzen', 'Referenzen'), ('faq', 'FAQ')])}
<main id="inhalt">
{crumbs(crumb_items)}
<header class="phero">
  <span class="eyebrow">{d['eyebrow']}</span>
  <h1>{d['h1']}</h1>
  <p class="phero__lead">{d['lead']}</p>
  <div class="phero__ctas">
    <a class="pill pill--lg" href="/#kontakt">Projekt anfragen</a>
    <a class="more" href="/case-studies/">Case Studies ansehen</a>
  </div>
  <div class="phero__media">{img(d['hero_img'], d['hero_alt'], lazy=False)}</div>
</header>

<section class="psec" id="ueberblick" aria-labelledby="ueberblick-title">
  <div class="psec__head">
    <h2 id="ueberblick-title">{d['intro_h']}</h2>
    <p>{d['intro_p']}</p>
  </div>
  <div class="bento">
{tiles}
  </div>
</section>

<div class="statement"><p>{d['statement']}</p></div>

<section class="psec" id="ablauf" aria-labelledby="ablauf-title">
  <div class="psec__head">
    <h2 id="ablauf-title">{d['steps_h']}</h2>
    <p>{d['steps_p']}</p>
  </div>
  <ol class="steps">
{steps}
  </ol>
</section>

<section class="psec" id="umfang" aria-labelledby="umfang-title">
  <div class="psec__head">
    <h2 id="umfang-title">{d['checks_h']}</h2>
    <p>{d['checks_p']}</p>
  </div>
  <ul class="checks">
{checks}
  </ul>
</section>

<section class="psec" id="referenzen" aria-labelledby="referenzen-title">
  <div class="psec__head">
    <h2 id="referenzen-title">Ausgewählte Projekte.</h2>
    <p>Ein Auszug aus unserer Arbeit – mehr Hintergründe in den <a class="more" href="/case-studies/">Case Studies</a></p>
  </div>
  <div class="cards">
{cases}
  </div>
</section>

<section class="psec" id="faq" aria-labelledby="faq-title">
  <div class="psec__head">
    <h2 id="faq-title">Häufige Fragen zu {d['faq_topic']}.</h2>
  </div>
{faq_html(d['faqs'])}
</section>

{cta(d['cta_h'], d['cta_p'])}
<section class="psec" aria-labelledby="mehr-title">
  <div class="psec__head">
    <h2 id="mehr-title">Weitere Leistungen.</h2>
  </div>
  <div class="cards">
{other_cards}
  </div>
</section>
</main>
"""
    os.makedirs(f"leistungen/{d['slug']}", exist_ok=True)
    with open(f"leistungen/{d['slug']}/index.html", "w") as f:
        f.write(head(d["title"], d["desc"], path, ld) + body + footer())


SVC_IMG = [("webdesign", "ph-01"), ("seo-geo", "ph-04"), ("digitale-loesungen", "ph-06"), ("apps-saas", "ph-08")]
SVC_TEASER = [
    ("webdesign", "Websites mit Konzept, Design-System und Headless CMS – schnell, barrierefrei, selbst pflegbar."),
    ("seo-geo", "Sichtbar in Google und in KI-Antworten: technisches SEO, Inhalte und Generative Engine Optimization."),
    ("digitale-loesungen", "Prozesse verstehen, Engpässe lösen: Automatisierung, Schnittstellen und eigene Tools."),
    ("apps-saas", "Web-Apps, Kundenportale und SaaS – vom MVP bis zum Release."),
]

PAGES = [
    dict(
        slug="webdesign", name="Webdesign", serviceType="Webdesign und Website-Entwicklung",
        title="Webdesign Agentur Leonberg &amp; Stuttgart | akii studio",
        desc="Webdesign aus Leonberg bei Stuttgart: schnelle, barrierefreie Websites mit Headless CMS – Konzept, Design und Entwicklung zum Festpreis.",
        eyebrow="Webdesign", h1="Websites, die wirken.",
        lead="Klar gestaltet, schnell geladen und so gebaut, dass Ihr Team sie selbst pflegen kann – Webdesign für den Mittelstand aus Leonberg bei Stuttgart.",
        hero_img="ph-01", hero_alt="Platzhalter: Website-Entwurf von akii studio auf Laptop und Smartphone",
        intro_h="Gestaltung mit Substanz.",
        intro_p="Eine gute Website beantwortet die Fragen Ihrer Kunden, bevor sie gestellt werden. Dafür verbinden wir Strategie, Design und saubere Technik in einem Projekt – mit einem Ansprechpartner von Anfang bis Ende.",
        tiles=[
            dict(size="wide", eyebrow="Konzept", h="Erst die Struktur. Dann die Pixel.",
                 p="Bevor gestaltet wird, klären wir Ziele, Zielgruppen und Inhalte. Sitemap, Nutzerwege und Kernbotschaften stehen, bevor das erste Layout entsteht – so wird aus Design ein Werkzeug, das verkauft.",
                 img="ph-03", alt="Platzhalter: Sitemap und Wireframes"),
            dict(size="narrow", tone="dark", eyebrow="Performance", h="Schnell. Messbar.",
                 p="Core Web Vitals sind bei uns Abnahmekriterium, nicht Nachgedanke: LCP, INP und CLS im grünen Bereich – das spüren Besucher und Google.", big="&lt;1 s"),
            dict(size="third", tone="linen", eyebrow="Barrierefreiheit", h="Für alle zugänglich.",
                 p="Seit Juni 2025 gilt das Barrierefreiheitsstärkungsgesetz (BFSG) für viele Online-Angebote. Wir gestalten und entwickeln nach WCAG 2.2 – Kontraste, Tastaturbedienung, Screenreader."),
            dict(size="third", eyebrow="Headless CMS", h="Inhalte selbst pflegen.",
                 p="Texte, Bilder und Seiten ändern Sie ohne Entwickler. Wir binden ein CMS an, schulen Ihr Team und übergeben eine kurze Dokumentation.",
                 list=["Storyblok", "Sanity", "Strapi", "WordPress headless"]),
            dict(size="third", eyebrow="SEO inklusive", h="Von Anfang an auffindbar.",
                 p="Saubere Überschriften-Struktur, strukturierte Daten, Meta-Angaben und Ladezeit – technisches SEO ist in jedem Webdesign-Projekt enthalten."),
            dict(size="half", tone="ember", eyebrow="Design-System", h="Ein System statt vieler Einzelseiten.",
                 p="Farben, Typografie und Komponenten werden einmal sauber definiert. Neue Seiten entstehen dadurch schneller, sehen konsistent aus und Ihr Auftritt kann mitwachsen."),
            dict(size="half", eyebrow="Mobile first", h="Gemacht für das Smartphone.",
                 p="Die meisten Besuche kommen heute vom Handy. Wir gestalten zuerst für kleine Bildschirme und erweitern dann – nicht umgekehrt.",
                 img="ph-07", alt="Platzhalter: mobile Ansicht einer Website"),
        ],
        statement="Eine Website ist kein Prospekt. <span>Sie ist Ihr bester Vertriebsmitarbeiter – und arbeitet rund um die Uhr.</span>",
        steps_h="So entsteht Ihre Website.",
        steps_p="Fünf klare Schritte mit festen Ergebnissen. Sie wissen jederzeit, wo das Projekt steht.",
        steps=[
            ("Discovery", "Gespräch und Workshop: Ziele, Zielgruppen, Wettbewerb und Inhalte. Ergebnis ist ein Festpreis-Angebot."),
            ("Konzept", "Sitemap, Nutzerwege und Wireframes. Die Struktur steht, bevor gestaltet wird."),
            ("Design", "Visuelles Konzept, Design-System und alle Seiten für Desktop und Mobil."),
            ("Entwicklung", "Umsetzung, CMS-Anbindung, SEO-Grundlagen, Tests auf allen Geräten."),
            ("Launch &amp; Betreuung", "Go-live, Schulung und 30 Tage Support. Danach optional monatliche Weiterentwicklung."),
        ],
        checks_h="Was enthalten ist.",
        checks_p="Jedes Webdesign-Projekt umfasst alles, was eine professionelle Website braucht – ohne versteckte Positionen.",
        checks=["Strategie-Workshop &amp; Zielgruppenanalyse", "Informationsarchitektur &amp; Sitemap", "Wireframes &amp; Prototyp",
                "UI-Design für Desktop, Tablet und Smartphone", "Design-System &amp; Komponentenbibliothek", "Entwicklung mit modernem Tech-Stack",
                "Headless-CMS-Anbindung &amp; Schulung", "Technisches SEO &amp; strukturierte Daten", "Barrierefreiheit nach WCAG 2.2 AA",
                "DSGVO-konforme Einbindung von Diensten", "Performance-Optimierung (Core Web Vitals)", "30 Tage Support nach dem Launch"],
        cases=["gg-manufaktur", "skv-rutesheim", "lina-soul"],
        faq_topic="Webdesign",
        faqs=[
            ("Was kostet eine professionelle Website?", "Das hängt von Umfang und Funktionen ab. Nach dem Discovery-Termin erhalten Sie ein Angebot mit festem Preis und festem Umfang. Projekte starten bei rund 5.000 €."),
            ("Wie lange dauert die Erstellung einer Website?", "Eine Landingpage liegt bei zwei bis drei Wochen, ein vollständiger Relaunch bei sechs bis acht Wochen. Den Zeitplan legen wir im Kick-off gemeinsam fest."),
            ("Kann ich die Website nach dem Launch selbst bearbeiten?", "Ja. Wir binden ein Headless CMS an, mit dem Sie Texte, Bilder und Seiten ohne Programmierkenntnisse ändern. Zum Launch gibt es eine Schulung."),
            ("Muss meine Website barrierefrei sein?", "Seit dem 28. Juni 2025 verpflichtet das Barrierefreiheitsstärkungsgesetz viele Anbieter von Online-Diensten für Verbraucher zur Barrierefreiheit. Kleinstunternehmen mit Dienstleistungen sind teilweise ausgenommen. Wir prüfen Ihren Fall und setzen WCAG 2.2 um."),
            ("Arbeiten Sie nur in Leonberg und Stuttgart?", "Unser Studio sitzt in Leonberg bei Stuttgart, wir arbeiten aber deutschlandweit – Termine finden vor Ort oder per Video statt."),
        ],
        cta_h="Bereit für eine Website, die arbeitet?",
        cta_p="Erzählen Sie uns von Ihrem Vorhaben. Sie erhalten innerhalb von zwei Werktagen eine Rückmeldung.",
    ),
    dict(
        slug="seo-geo", name="SEO &amp; GEO", serviceType="Suchmaschinenoptimierung und Generative Engine Optimization",
        title="SEO &amp; GEO Agentur Stuttgart – Google &amp; KI-Suche | akii",
        desc="SEO und Generative Engine Optimization aus Leonberg bei Stuttgart: technisches SEO, Local SEO und Inhalte, die Google und ChatGPT zitieren.",
        eyebrow="SEO &amp; Agentic SEO", h1="Gefunden werden. Von Google und KI.",
        lead="Technisches SEO, Inhalte mit Substanz und Generative Engine Optimization – damit Ihr Unternehmen in Google, ChatGPT, Perplexity und den AI Overviews auftaucht.",
        hero_img="ph-04", hero_alt="Platzhalter: Suchergebnisse und KI-Antwort mit Erwähnung eines Unternehmens",
        intro_h="Suche hat sich verändert.",
        intro_p="Immer mehr Menschen fragen nicht mehr nur Google, sondern KI-Assistenten. Die Antwort nennt wenige Quellen – oft nur eine. Wir sorgen dafür, dass Ihre Website technisch, inhaltlich und strukturell zu diesen Quellen gehört.",
        tiles=[
            dict(size="wide", tone="dark", eyebrow="GEO", h="Generative Engine Optimization.",
                 p="KI-Systeme bevorzugen Inhalte, die klar strukturiert, belegt und eindeutig einer Marke zuzuordnen sind. Wir schärfen Ihre Entität, formulieren zitierfähige Antworten und machen Fakten maschinenlesbar – damit ChatGPT, Perplexity, Gemini und Claude Sie nennen.",
                 list=["ChatGPT", "Perplexity", "Google AI Overviews", "Gemini", "Claude", "Copilot"]),
            dict(size="narrow", eyebrow="Technisches SEO", h="Das Fundament.",
                 p="Crawling, Indexierung, Ladezeit, saubere URLs, Canonicals und interne Verlinkung. Ohne Technik helfen die besten Inhalte nicht."),
            dict(size="third", tone="linen", eyebrow="Local SEO", h="Sichtbar in Ihrer Region.",
                 p="Google-Unternehmensprofil, konsistente Firmendaten und lokale Landingpages – für Suchen wie „Agentur Stuttgart“ oder „in meiner Nähe“."),
            dict(size="third", eyebrow="Strukturierte Daten", h="Schema.org, sauber umgesetzt.",
                 p="Organisation, Leistungen, FAQ, Produkte und Bewertungen als strukturierte Daten – für Rich Results in Google und als Faktenbasis für KI."),
            dict(size="third", eyebrow="Content", h="Inhalte nach Suchintention.",
                 p="Themencluster statt Keyword-Listen: Wir planen Inhalte, die echte Fragen Ihrer Kunden beantworten – ausführlich, belegt und verständlich."),
            dict(size="half", eyebrow="llms.txt &amp; KI-Crawler", h="Bereit für KI-Crawler.",
                 p="Wir steuern über robots.txt, welche KI-Crawler Ihre Inhalte lesen dürfen, und stellen mit llms.txt eine kompakte Zusammenfassung Ihres Unternehmens bereit.",
                 img="ph-06", alt="Platzhalter: robots.txt und llms.txt"),
            dict(size="half", tone="ember", eyebrow="Monitoring", h="Was wirkt, wird gemessen.",
                 p="Rankings, Klicks und Impressionen aus der Google Search Console – und regelmäßige Stichproben, ob und wie KI-Assistenten Ihre Marke erwähnen.", big="Monatlich"),
        ],
        statement="Wer heute fragt, bekommt eine Antwort – <span>nicht zehn blaue Links. Wir sorgen dafür, dass Ihr Name darin vorkommt.</span>",
        steps_h="Unser Vorgehen.",
        steps_p="SEO ist kein einmaliges Projekt, aber es beginnt mit einem klaren Plan.",
        steps=[
            ("Audit", "Technische Analyse, Inhalte, Wettbewerb und Status quo in KI-Antworten."),
            ("Strategie", "Prioritäten nach Aufwand und Wirkung, Keyword- und Themenplan."),
            ("Technik", "Behebung technischer Fehler, Ladezeit, strukturierte Daten, llms.txt."),
            ("Inhalte", "Optimierung bestehender Seiten und neue Inhalte für Ihre Kernthemen."),
            ("Monitoring", "Monatlicher Bericht, Anpassung der Maßnahmen, laufende Betreuung."),
        ],
        checks_h="Leistungsumfang.",
        checks_p="Vom einmaligen Audit bis zur laufenden Betreuung – kombinierbar nach Bedarf.",
        checks=["SEO-Audit (Technik, Inhalte, Backlinks)", "GEO-Analyse: Sichtbarkeit in KI-Antworten", "Keyword- &amp; Themenrecherche",
                "Technische Optimierung &amp; Core Web Vitals", "Strukturierte Daten (Schema.org)", "robots.txt, Sitemap &amp; llms.txt",
                "Local SEO &amp; Google-Unternehmensprofil", "Content-Strategie &amp; Texte", "Interne Verlinkung &amp; Informationsarchitektur",
                "Einrichtung Google Search Console", "Monatliches Reporting", "Schulung für Ihr Team"],
        cases=["gg-manufaktur", "skv-rutesheim", "lina-soul"],
        faq_topic="SEO &amp; GEO",
        faqs=[
            ("Was ist GEO (Generative Engine Optimization)?", "GEO ist die Optimierung von Inhalten für KI-gestützte Suche wie ChatGPT, Perplexity oder die Google AI Overviews. Ziel ist, dass diese Systeme Ihr Unternehmen als Quelle nennen und korrekt beschreiben."),
            ("Was ist der Unterschied zwischen SEO und GEO?", "SEO zielt auf Rankings in klassischen Suchergebnissen. GEO zielt darauf, in generierten Antworten zitiert zu werden. Beides baut auf denselben Grundlagen auf: gute Technik, klare Struktur und vertrauenswürdige Inhalte."),
            ("Wie schnell sehe ich Ergebnisse?", "Technische Verbesserungen wirken oft innerhalb weniger Wochen. Für stabile Rankings bei umkämpften Begriffen sollten Sie mit drei bis sechs Monaten rechnen."),
            ("Was ist eine llms.txt?", "Eine llms.txt ist eine Textdatei im Stammverzeichnis Ihrer Website, die KI-Systemen eine kompakte, strukturierte Zusammenfassung Ihres Unternehmens und Ihrer wichtigsten Seiten bietet."),
            ("Garantieren Sie Platz 1 bei Google?", "Nein – und das kann seriös niemand. Wir garantieren saubere Arbeit nach anerkannten Richtlinien, transparente Berichte und Maßnahmen, die messbar auf Ihre Ziele einzahlen."),
        ],
        cta_h="Wie sichtbar ist Ihr Unternehmen?",
        cta_p="Wir prüfen Ihre Website und zeigen, wo Sie in Google und KI-Antworten stehen – und was die wichtigsten nächsten Schritte sind.",
    ),
    dict(
        slug="digitale-loesungen", name="Digitale Lösungen", serviceType="Digitalisierung, Prozessanalyse und Automatisierung",
        title="Digitalisierung &amp; Automatisierung Mittelstand | akii studio",
        desc="Digitalisierung für den Mittelstand aus Leonberg bei Stuttgart: Prozessanalyse, Automatisierung, Schnittstellen und individuelle Tools.",
        eyebrow="Digitale Lösungen", h1="Erst verstehen. Dann digitalisieren.",
        lead="Wir sehen uns Ihre Abläufe an, finden die echten Engpässe und entwickeln passgenaue Lösungen – von der Automatisierung bis zum eigenen Tool.",
        hero_img="ph-06", hero_alt="Platzhalter: Workshop zur Prozessanalyse mit Notizen am Whiteboard",
        intro_h="Das Problem hinter dem Problem.",
        intro_p="Die meisten Digitalprojekte scheitern nicht an der Technik, sondern daran, dass das eigentliche Problem nie richtig verstanden wurde. Mit über zehn Jahren Erfahrung aus Digitalisierung, Prozessberatung und IT-Strategie in Konzernstrukturen bringen wir Klarheit in Ihre Abläufe.",
        tiles=[
            dict(size="wide", eyebrow="Discovery", h="Zuhören, bevor gebaut wird.",
                 p="In Gesprächen und Workshops mit Ihrem Team erfassen wir, wie Arbeit heute tatsächlich abläuft – nicht wie sie im Organigramm steht. Daraus entsteht ein klares Bild der Engpässe und Chancen.",
                 img="ph-05", alt="Platzhalter: Discovery-Workshop"),
            dict(size="narrow", tone="dark", eyebrow="Automatisierung", h="Weniger Handarbeit.",
                 p="Doppelte Dateneingabe, E-Mail-Pingpong, Excel-Listen: Wir verbinden Ihre Systeme über Schnittstellen und automatisieren wiederkehrende Aufgaben.", big="APIs"),
            dict(size="third", tone="linen", eyebrow="Prozessanalyse", h="Abläufe sichtbar machen.",
                 p="Wir modellieren Ihre Prozesse, messen Durchlaufzeiten und zeigen, wo Zeit und Geld verloren gehen."),
            dict(size="third", eyebrow="KI im Alltag", h="KI, die wirklich hilft.",
                 p="Dokumente auslesen, Anfragen vorsortieren, Texte entwerfen: Wir setzen KI dort ein, wo sie messbar entlastet – datenschutzkonform."),
            dict(size="third", eyebrow="Individuelle Tools", h="Software nach Maß.",
                 p="Wenn keine Standardsoftware passt, entwickeln wir schlanke interne Tools – genau für Ihren Ablauf."),
            dict(size="half", tone="ember", eyebrow="Einführung", h="Lösungen, die genutzt werden.",
                 p="Die beste Lösung bringt nichts, wenn niemand sie nutzt. Wir begleiten die Einführung, schulen Ihr Team und verbessern nach den ersten Wochen nach."),
            dict(size="half", eyebrow="Unabhängig", h="Beratung ohne Produktbindung.",
                 p="Wir verkaufen keine Lizenzen. Ob Standardsoftware, No-Code oder Eigenentwicklung – wir empfehlen, was zu Ihnen passt.",
                 list=["n8n", "Make", "Microsoft 365", "HubSpot", "REST-APIs"]),
        ],
        statement="Die beste Software ist die, <span>über die niemand mehr nachdenkt – weil sie einfach funktioniert.</span>",
        steps_h="Vom Problem zur Lösung.",
        steps_p="Ein strukturierter Weg, der mit Verstehen beginnt und mit einer Lösung endet, die im Alltag trägt.",
        steps=[
            ("Zuhören", "Gespräche mit Geschäftsführung und den Menschen, die die Arbeit machen."),
            ("Analysieren", "Prozesse erfassen, Engpässe benennen, Potenziale bewerten."),
            ("Konzipieren", "Lösungsvarianten mit Aufwand, Nutzen und Risiken – Sie entscheiden."),
            ("Prototyp", "Ein schneller Prototyp macht die Lösung greifbar, bevor investiert wird."),
            ("Umsetzen &amp; Einführen", "Entwicklung, Schulung und Begleitung, bis die Lösung im Alltag läuft."),
        ],
        checks_h="Womit wir helfen.",
        checks_p="Typische Aufgaben aus unseren Projekten – jedes Vorhaben beginnt mit einer Bestandsaufnahme.",
        checks=["Prozessaufnahme &amp; -modellierung", "Digitalisierungs-Roadmap", "Auswahl passender Software",
                "Schnittstellen &amp; Datenintegration", "Workflow-Automatisierung", "KI-gestützte Dokumentenverarbeitung",
                "Interne Tools &amp; Dashboards", "Formulare &amp; digitale Anträge", "Datenschutz-Konzept (DSGVO)",
                "Schulung &amp; Change-Begleitung", "Prototyping", "Laufende Betreuung"],
        cases=["gg-manufaktur", "fusspflege", "skv-rutesheim"],
        faq_topic="digitalen Lösungen",
        faqs=[
            ("Für welche Unternehmen eignen sich digitale Lösungen?", "Für kleine und mittlere Unternehmen, Selbstständige und Vereine, die wiederkehrende Abläufe vereinfachen wollen – unabhängig von der Branche."),
            ("Brauchen wir dafür neue Software?", "Nicht unbedingt. Oft lassen sich vorhandene Systeme besser verbinden oder automatisieren. Neue Software empfehlen wir nur, wenn sie sich klar rechnet."),
            ("Wie setzen Sie KI datenschutzkonform ein?", "Wir wählen Anbieter mit Verarbeitung in der EU oder geeigneten Garantien, schließen Auftragsverarbeitungsverträge und verarbeiten personenbezogene Daten nur, wo es nötig ist."),
            ("Gibt es Förderungen für Digitalisierungsprojekte?", "Je nach Bundesland und Vorhaben gibt es Förderprogramme von Bund und Land. Wir klären gemeinsam, ob Ihr Projekt in Frage kommt."),
            ("Wie fangen wir an?", "Mit einem kostenlosen Erstgespräch. Darin klären wir, wo es hakt und ob eine Discovery-Phase sinnvoll ist."),
        ],
        cta_h="Wo verliert Ihr Team die meiste Zeit?",
        cta_p="Erzählen Sie uns davon. Im Erstgespräch finden wir heraus, ob und wie wir helfen können.",
    ),
    dict(
        slug="apps-saas", name="Apps &amp; SaaS", serviceType="Web-App- und SaaS-Entwicklung",
        title="Web-App &amp; SaaS Entwicklung Stuttgart | akii studio",
        desc="Web-Apps, Kundenportale und SaaS-Produkte aus Leonberg bei Stuttgart: Konzeption, UX/UI-Design und Entwicklung vom MVP bis zum Release.",
        eyebrow="Apps &amp; SaaS-Applikationen", h1="Von der Idee zur Plattform.",
        lead="Web-Apps, Kundenportale und SaaS-Produkte – gedacht in Nutzerflüssen, gestaltet mit System und entwickelt bis zum Release.",
        hero_img="ph-08", hero_alt="Platzhalter: Dashboard einer SaaS-Anwendung",
        intro_h="Produkte, die Nutzer verstehen.",
        intro_p="Eine Anwendung ist mehr als eine Website mit Login. Sie hat Zustände, Rollen, Daten und Abläufe. Wir denken diese von Anfang an mit – damit Ihr Produkt intuitiv bleibt, auch wenn es wächst.",
        tiles=[
            dict(size="wide", tone="ember", eyebrow="MVP", h="In Wochen testen, nicht in Jahren.",
                 p="Wir definieren den kleinsten sinnvollen Funktionsumfang, bauen ihn schnell und bringen ihn zu echten Nutzern. So validieren Sie Ihre Idee, bevor Sie groß investieren.",
                 img="ph-02", alt="Platzhalter: MVP-Prototyp"),
            dict(size="narrow", eyebrow="UX", h="In Zuständen gedacht.",
                 p="Leer, ladend, Fehler, Erfolg: Wir gestalten jeden Zustand – nicht nur den schönen Screenshot."),
            dict(size="third", tone="dark", eyebrow="Design-System", h="Konsistent, auch bei Feature 100.",
                 p="Eine Komponentenbibliothek in Design und Code hält Ihr Produkt einheitlich und beschleunigt jede Erweiterung."),
            dict(size="third", tone="linen", eyebrow="Portale &amp; Dashboards", h="Daten, die man versteht.",
                 p="Kundenportale, Admin-Bereiche und Dashboards, die komplexe Informationen klar und handlungsorientiert zeigen."),
            dict(size="third", eyebrow="Technologie", h="Moderner Stack.",
                 p="Bewährte, weit verbreitete Technologien statt Exoten – damit Ihr Produkt wartbar bleibt.",
                 list=["React", "TypeScript", "Next.js", "Node.js", "PostgreSQL"]),
            dict(size="half", eyebrow="Ihr Code", h="Alles gehört Ihnen.",
                 p="Quellcode, Designs und Dokumentation gehen vollständig in Ihren Besitz über. Kein Lock-in, keine Abhängigkeit."),
            dict(size="half", tone="dark", eyebrow="Betrieb", h="Nach dem Release geht es weiter.",
                 p="Hosting, Monitoring, Updates und Weiterentwicklung – auf Wunsch übernehmen wir den Betrieb oder übergeben sauber an Ihr Team.", big="24/7"),
        ],
        statement="Gute Produkte erklären sich selbst. <span>Wir sorgen dafür, dass Ihres das auch tut.</span>",
        steps_h="Vom Konzept zum Release.",
        steps_p="Iterativ und transparent: Sie sehen alle zwei Wochen einen lauffähigen Stand.",
        steps=[
            ("Produktdefinition", "Zielgruppe, Kernnutzen, Funktionsumfang und Erfolgskriterien."),
            ("UX-Konzept", "Nutzerflüsse, Informationsarchitektur und klickbarer Prototyp."),
            ("UI-Design", "Design-System und alle Screens inklusive Zustände."),
            ("Entwicklung", "Sprints mit regelmäßigen Demos, Tests und Code-Reviews."),
            ("Release &amp; Betrieb", "Go-live, Monitoring, Feedback-Schleifen und Weiterentwicklung."),
        ],
        checks_h="Leistungsumfang.",
        checks_p="Ein Team für Konzept, Design und Entwicklung – oder gezielt dort, wo Sie Unterstützung brauchen.",
        checks=["Produkt-Workshop &amp; Anforderungsanalyse", "Nutzerflüsse &amp; Informationsarchitektur", "Klickbarer Prototyp &amp; Nutzertests",
                "UI-Design &amp; Design-System", "Frontend- und Backend-Entwicklung", "Rollen, Rechte &amp; Authentifizierung",
                "Schnittstellen zu bestehenden Systemen", "Zahlungs- &amp; Abo-Funktionen", "Barrierefreiheit &amp; Performance",
                "Hosting, Monitoring &amp; Backups", "Dokumentation &amp; Übergabe", "Wartung &amp; Weiterentwicklung"],
        cases=["fusspflege", "gg-manufaktur", "lina-soul"],
        faq_topic="Apps &amp; SaaS",
        faqs=[
            ("Was ist ein MVP?", "Ein Minimum Viable Product ist die erste, bewusst schlanke Version eines Produkts mit genau den Funktionen, die nötig sind, um den Kernnutzen mit echten Nutzern zu testen."),
            ("Was kostet die Entwicklung einer Web-App?", "Das hängt stark vom Funktionsumfang ab. Nach der Produktdefinition erhalten Sie ein Festpreis-Angebot für die erste Version – oft ein MVP, das sich anschließend schrittweise erweitern lässt."),
            ("Web-App oder native App?", "Für die meisten Geschäftsanwendungen ist eine Web-App die bessere Wahl: eine Codebasis, sofort auf allen Geräten verfügbar, keine App-Store-Hürden. Wo nötig, ergänzen wir sie als installierbare Progressive Web App."),
            ("Wem gehört der Quellcode?", "Ihnen. Mit der Schlusszahlung gehen alle Rechte an Code, Design und Dokumentation vollständig auf Sie über."),
            ("Übernehmen Sie auch den Betrieb?", "Ja, auf Wunsch kümmern wir uns um Hosting, Monitoring, Updates und Weiterentwicklung – oder übergeben das Projekt dokumentiert an Ihr Team."),
        ],
        cta_h="Sie haben eine Produktidee?",
        cta_p="Lassen Sie uns darüber sprechen, wie aus der Idee ein Produkt wird, das Nutzer lieben – und wie der schnellste Weg dahin aussieht.",
    ),
]


STUDIES = [
    dict(slug="gg-manufaktur", name="GG Manufaktur", img="ph-02", url="https://gg-manufaktur.de",
         lead="Website für eine Gaming- und eSport-Agentur aus Rutesheim bei Stuttgart – zwischen Gaming-Kultur und B2B-Seriosität.",
         facts=[("Kunde", "GG Manufaktur"), ("Branche", "Gaming &amp; eSport-Marketing"), ("Jahr", "2026"), ("Leistungen", "Webdesign, SEO, Entwicklung")],
         blocks=[("Ausgangslage", "Die Agentur organisiert Events, Turniere und Gamification-Aktionen für Marken und Unternehmen. Gesucht war ein Auftritt, der in der Gaming-Szene glaubwürdig ist und zugleich Entscheider in Unternehmen überzeugt."),
                 ("Lösung", "Ein dunkles, markantes Design mit animiertem Hero, eine klare Leistungsstruktur und ein Bereich „Blog &amp; Wissen“ für Sichtbarkeit in Suchmaschinen. Analyse- und Marketing-Dienste werden erst nach Einwilligung über ein eigenes Consent-Management geladen."),
                 ("Ergebnis", "Ein Auftritt, der beide Zielgruppen anspricht, Inhalte über einen eigenen Bearbeitungsmodus pflegbar macht und datenschutzkonform misst.")]),
    dict(slug="skv-rutesheim", name="SKV Rutesheim", img="ph-03", url="https://skvrutesheimhomepage.vercel.app",
         lead="Neue Website für einen Sportverein mit vielen Abteilungen – „Mehr als ein Verein. Eine Gemeinschaft.“",
         facts=[("Kunde", "SKV Rutesheim"), ("Branche", "Sportverein"), ("Jahr", "2026"), ("Leistungen", "Webdesign, Entwicklung")],
         blocks=[("Ausgangslage", "Ein Verein mit vielen Abteilungen, Vereinsheim und Angeboten für alle Altersgruppen – die Informationen sollten an einem Ort gebündelt und leicht auffindbar sein."),
                 ("Lösung", "Eine klar strukturierte Website mit eindrucksvollem Hero, Übersicht der Abteilungen, Informationen zum Vereinsheim und einem direkten Weg zur Mitgliedschaft."),
                 ("Ergebnis", "Ein moderner Auftritt, der Mitglieder und Interessierte gleichermaßen anspricht und den Weg zum Mitgliedsantrag verkürzt.")]),
    dict(slug="lina-soul", name="Lina Soul", img="ph-05", url="https://linasoul.art",
         lead="Galerie-Website für abstrakte Acrylmalerei – mit viel Raum für die Werke.",
         facts=[("Kunde", "Lina Soul"), ("Branche", "Kunst &amp; Malerei"), ("Jahr", "2025"), ("Leistungen", "Webdesign, Entwicklung")],
         blocks=[("Ausgangslage", "Die Künstlerin wollte ihre abstrakten Acrylbilder online zeigen – farbenfroh, hochwertig und so, dass jedes Werk für sich wirken kann."),
                 ("Lösung", "Ein zurückhaltendes Layout, das den Bildern den Vortritt lässt: großformatige Galerie, persönliche Vorstellung der Künstlerin und ein einfacher Kontaktweg."),
                 ("Ergebnis", "Eine Galerie im Netz, die die Handschrift der Künstlerin trägt und Interessierten den direkten Kontakt ermöglicht.")]),
    dict(slug="fusspflege", name="Fußpflege", img="ph-07", url=None,
         lead="Gestaltungskonzept und Prototyp für eine Fußpflege-Praxis – ruhig, vertrauensvoll, klar.",
         facts=[("Projekt", "Konzept"), ("Branche", "Gesundheit &amp; Pflege"), ("Jahr", "2025"), ("Leistungen", "Konzept, Design, Prototyp")],
         blocks=[("Ausgangslage", "Praxen im Gesundheitsbereich brauchen einen Auftritt, der Vertrauen schafft und die wichtigsten Fragen sofort beantwortet: Leistungen, Preise, Termin."),
                 ("Lösung", "Ein ruhiges, helles Gestaltungskonzept mit klarer Leistungsübersicht und prominenter Terminbuchung – umgesetzt als funktionsfähiger Prototyp."),
                 ("Ergebnis", "Eine Vorlage, die sich schnell auf konkrete Praxen übertragen lässt und zeigt, wie Gesundheitsangebote online wirken können.")]),
]


def case_studies_page():
    path = "/case-studies/"
    crumb_items = [("Startseite", "/"), ("Case Studies", None)]
    items = []
    for i, s in enumerate(STUDIES, 1):
        cw = {"@type": "CreativeWork", "@id": f"{SITE}{path}#{s['slug']}", "name": s["name"],
              "description": html.unescape(s["lead"]), "creator": {"@id": ORG["@id"]},
              "dateCreated": dict(s["facts"])["Jahr"], "inLanguage": "de-DE",
              "image": f"{SITE}/assets/img/cases/{s['slug']}.jpg"}
        if s["url"]:
            cw["url"] = s["url"]
        items.append({"@type": "ListItem", "position": i, "item": cw})
    page_ld = {"@type": "CollectionPage", "@id": f"{SITE}{path}#webpage", "url": f"{SITE}{path}",
               "name": "Case Studies – akii studio", "inLanguage": "de-DE",
               "isPartOf": {"@id": f"{SITE}/#website"}, "breadcrumb": {"@id": f"{SITE}{path}#breadcrumb"},
               "mainEntity": {"@type": "ItemList", "itemListElement": items}, "dateModified": TODAY}
    website_ld = {"@type": "WebSite", "@id": f"{SITE}/#website", "url": f"{SITE}/", "name": "akii studio",
                  "inLanguage": "de-DE", "publisher": {"@id": ORG["@id"]}}
    ld = [ORG, website_ld, page_ld, crumbs_ld(crumb_items, path)]
    title = "Case Studies – Websites &amp; digitale Projekte | akii studio"
    desc = "Case Studies von akii studio: Websites und digitale Projekte für eine eSport-Agentur, einen Sportverein, eine Künstlerin und eine Praxis."

    grid = "\n".join(card(s["slug"]) for s in STUDIES)
    blocks = []
    for s in STUDIES:
        facts = "".join(f"<div><dt>{k}</dt><dd>{v}</dd></div>" for k, v in s["facts"])
        tiles = "\n".join(f"""      <article class="tile{' tile--linen' if k == 1 else ''}{' tile--dark' if k == 2 else ''}">
        <span class="tile__eyebrow">{h}</span>
        <p>{p}</p>
      </article>""" for k, (h, p) in enumerate(s["blocks"]))
        link = (f'<a class="more" href="{s["url"]}" target="_blank" rel="noopener">Website ansehen</a>'
                if s["url"] else '<span class="card__tag">Konzept – nicht öffentlich</span>')
        blocks.append(f"""<section class="study" id="{s['slug']}" aria-labelledby="{s['slug']}-title">
  <div class="study__media">{shot(s['slug'], s['name'] + ' — Startseite der Website')}</div>
  <div class="study__head">
    <h2 id="{s['slug']}-title">{s['name']}</h2>
    <div><p class="lead">{s['lead']}</p><p style="margin-top:14px">{link}</p></div>
  </div>
  <dl class="facts">{facts}</dl>
  <div class="study__cols">
{tiles}
  </div>
</section>
""")
    anchors = [(s["slug"], s["name"]) for s in STUDIES]
    body = f"""{gnav('case-studies')}{lnav('Case Studies', anchors)}
<main id="inhalt">
{crumbs(crumb_items)}
<header class="phero">
  <span class="eyebrow">Case Studies</span>
  <h1>Arbeiten, die tragen.</h1>
  <p class="phero__lead">Ausgewählte Projekte – von der Ausgangslage über die Lösung bis zum Ergebnis.</p>
</header>

<section class="psec" aria-labelledby="uebersicht-title" style="padding-top:clamp(48px,8vh,96px)">
  <h2 id="uebersicht-title" class="sr-only">Übersicht aller Projekte</h2>
  <div class="cards">
{grid}
  </div>
</section>

{''.join(blocks)}
{cta('Ihr Projekt als nächste Case Study?', 'Erzählen Sie uns, was Sie vorhaben. Wir melden uns innerhalb von zwei Werktagen.')}
</main>
"""
    os.makedirs("case-studies", exist_ok=True)
    with open("case-studies/index.html", "w") as f:
        f.write(head(title, desc, path, ld) + body + footer())


if __name__ == "__main__":
    for p in PAGES:
        service_page(p)
    case_studies_page()
    print("ok")
