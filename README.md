# akii studio — Website

Statische Website für eine Webdesign- und Digitalagentur. Kein Build-Schritt, keine
Abhängigkeiten — `index.html` im Browser öffnen genügt.

## Lokal starten

```bash
npx -y serve akii-studio -l 4321
```

## Struktur

```
akii-studio/
├── index.html              Alle Sektionen (Hero → Footer)
├── assets/css/style.css    Design-Tokens + Komponenten
├── assets/js/main.js       Nav, Akkordeons, Reveals, Counter, Formular
└── assets/img/*.svg        Generierte Bildwelt (austauschbar)
```

## Design-System

Die Architektur stammt aus dem ORYZO-System (Referenz aus dem Briefing): vollflächige
Sektionen ohne Max-Width-Container, zweistufiger Helligkeits-Stack statt Schatten,
gestrichelte 1px-Trennlinien, Pill-Buttons, Versalien in Weight 500 — Fließtext als
einzige gemischt geschriebene Stimme.

Die Palette ist gegenüber der Referenz **invertiert**: statt Warm-Dark ist die Basis
hell und warm (Leinen/Stein/Walnuss), passend zum eingereichten Bild. Die dunklen Töne
des Ursprungssystems bleiben als Kontrastsektionen erhalten (Statement, Kontakt, Footer),
damit der zweistufige Stack funktioniert.

Alle Werte liegen als Custom Properties in `:root` (`style.css`), z. B.:

| Token | Wert | Rolle |
|---|---|---|
| `--cream` | `#F7F3ED` | Seitenhintergrund |
| `--linen` | `#EFE8DE` | Erhöhte Fläche |
| `--walnut` | `#2C2119` | Primäre Schrift |
| `--drift` | `#7C6F60` | Sekundäre Schrift |
| `--cork` | `#C7BBA9` | Haarlinien |
| `--void` | `#17100A` | Dunkle Sektionen |
| `--ember` | `#C2551F` | Akzent, sehr sparsam |

Schrift: `Helvetica Neue` mit Fallback auf Inter/System-Sans. Soll eine Lizenzschrift
(z. B. Halyard Display wie in der Referenz) zum Einsatz kommen, nur `--font` tauschen.

## Bilder

**Hero:** `aki_studio_design.jpg` — aus `aki_studio_design.png` (2,5 MB) mit
JPEG-Qualität 92 kodiert, 587 KB. Hohe Qualitätsstufe mit Absicht: Das Bild wird auf
den meisten Geräten hochskaliert, dabei würden Kompressionsartefakte mitvergrößert.
q92 gegen q78 kostet 140 KB und vermeidet das.

**Auflösung — der begrenzende Faktor.** Die Datei ist 1672×941. Für einen
formatfüllenden Hero braucht der Browser:

| Anzeige | benötigt | vorhanden | Faktor |
|---|---|---|---|
| Monitor 1440 (1×) | 1599 px | 1672 px | 0,96× ✓ |
| Full-HD (1×) | 1920 px | 1672 px | 1,15× |
| MacBook (2×) | 3198 px | 1672 px | 1,91× |
| iPad hoch (2×) | 3639 px | 1672 px | 2,18× |
| iPhone (3×) | 4328 px | 1672 px | 2,59× |
| 5K (2×) | 5120 px | 1672 px | 3,06× |

Nur auf nicht-skalierten Monitoren reicht die Datei. Auf allen Retina- und
Zoom-Szenarien wird hochgerechnet — das lässt sich durch keine Kodierung, kein Format
und keine CSS-Einstellung beheben, nur durch mehr Pixel in der Quelle.

**Empfehlung:** Export mit **3840px** Breite. Der `srcset`-Hook liegt bereits
auskommentiert in `index.html` am Hero-`<img>`; Datei als
`aki_studio_design@2x.jpg` ablegen, Zeile einkommentieren, fertig.

Nicht mehr referenziert: `akiistudio.jpg`, `akiistudio.png`.

**Team:** `akii_studio_team.jpeg` (1536×1022) im Studio-Bereich, 3:2-Slot.

**Übrige Visuals:** prozedurale SVGs in der Markenpalette (Cases).

## Leistungen

Vier Punkte, in dieser Reihenfolge:

1. **Webdesign** — Konzept, Gestaltung und Umsetzung inkl. CMS.
2. **SEO & Agentic SEO** — klassisches technisches SEO plus Sichtbarkeit in
   KI-Systemen (Generative Engine Optimization).
3. **Digitale Lösungen** — erst Kunde und Problem verstehen, dann gemeinsam eine
   maßgeschneiderte Lösung entwickeln.
4. **Apps & SaaS-Applikationen** — Web-Apps, Kundenportale, SaaS-Plattformen.

Die Fußzeile führt dieselben vier Punkte.

## Hero-Typografie

`digital` steht in 700, `solutions` bleibt in 400.

> Die Größe von `solutions` hängt über `em` am Titel. Als der Titel von `12.5vw` auf
> `14vw` wuchs, wäre `solutions` automatisch mitgewachsen — deshalb ist der Faktor von
> `0.185em` auf `0.165em` (÷ 1,12) korrigiert. Gemessen: unverändert 33,3px bei 1440px
> Breite. Wer den Titel weiter skaliert, muss den Faktor entsprechend nachziehen.

## Hero-Bildausschnitt

Desktop zeigt das volle Bild. Auf Telefon und Tablet wird nur der Ausschnitt verschoben
— **nicht** vergrößert.

`object-fit: cover` ist die kleinste Skalierung, die die Fläche noch füllt. Jede
Vergrößerung darüber skaliert die 1672px-Quelle weiter hoch und macht sie weicher:

| | Hochskalierung auf 2×-Telefon |
|---|---|
| frühere Variante `height: 170%` | 2,93× |
| jetzt: reines `cover` | **1,73×** |

Kleiner als `cover` geht nicht, ohne Leerraum zu lassen — 1,73× ist damit das Optimum,
das diese Bilddatei auf einem 375×812-Schirm hergibt.

Gerahmt wird nur über `object-position`:

| Breite | Wert | sichtbarer Bildausschnitt |
|---|---|---|
| ≤ 760px | `28%` | 0,21 – 0,47 |
| 761–1024px | `6%` | ~0,04 – 0,46 |

Kaffee liegt bei 0,36–0,47, das Tablet im Foto beginnt bei 0,445, sein Bildschirmtext ab
etwa 0,52. Die rechte Kante stoppt also bewusst kurz davor: Boden, Lichtbahn und Kaffee
tragen das Bild, vom Tablet ist höchstens die dunkle Ecke zu sehen, lesbarer Text nicht.

> Auf **Quer**format-Tablets wird das Fenster breiter als der gewünschte Bereich; dort
> rückt zwangsläufig mehr ins Bild — wie auf dem Desktop, wo das volle Foto gewollt ist.
> Sauber lösen ließe sich das nur mit einem größeren Export (≥2560px), der zusätzlich
> die Schärfe auf allen Geräten anhebt.

## Scrollen

`main.js` steuert das Scrollen selbst: eine Geste startet die Bewegung **sofort** und
fährt in 1150 ms mit `easeInOutCubic` in die nächste Sektion — langsamer Anlauf, ruhige
Mitte, weiches Auslaufen.

- Eine Wischbewegung = **eine** Sektion. Ein Animations-Lock plus 90 ms Nachlauf
  verhindert, dass ein Trackpad-Schwung zwei Screens überspringt.
- Maus, Touch, Tastatur (Pfeile, Bild auf/ab, Leertaste, Pos1/Ende) und Ankerlinks
  laufen alle über dieselbe Kurve.
- `scroll-behavior` steht auf `auto` — natives Smooth-Scrolling würde gegen die
  Einzelbild-Animation arbeiten.
- **Überlauf-Schutz:** Ist eine Sektion höher als das Fenster, scrollt sie zuerst normal
  bis zu ihrer Kante und rastet erst dann weiter. Auf dem Telefon betrifft das Studio
  und Kontakt — dort passt der Text nicht auf einen Schirm, und Inhalte zu verstecken
  wäre der schlechtere Tausch. Nichts wird dadurch unerreichbar.
- Bei `prefers-reduced-motion` wird der Controller gar nicht erst aktiv; dann gilt
  normales Scrollen.

Die Kopfzeile hat keine Leiste und keinen Blur mehr: Sie schwebt und dreht ihre Farbe
über `body[data-tone]` — helle Marke auf dunklen Sektionen, dunkle auf hellen.

## Navigation

Zwei Modi, ein Satz Links:

- **Ab 761px:** linke Leiste (`.rail`), vertikal zentriert, Labels über
  `writing-mode: vertical-rl` + `rotate(180deg)` von unten nach oben. Aktiver Punkt
  wird beim Scrollen markiert. Kein Burger.
- **Bis 760px:** Leiste aus, Burger oben rechts, Links im Overlay (`.drawer`).
  Beim Öffnen wird der Seiten-Scroll gesperrt und der Sektions-Controller stellt sich
  still; verdeckte Links bleiben über `visibility` aus der Tab-Reihenfolge.

`akii` steht in beiden Fällen oben links. Marke, Leiste und Burger drehen ihre Farbe
über `body[data-tone]` — `hero` (weiß über dem Foto), `dark`, `light`.

> `.nav` trägt `z-index: 120`, nicht 100. Es bildet einen eigenen Stacking-Context,
> deshalb wirkt ein höherer `z-index` am Burger **innerhalb** von `.nav` — läge `.nav`
> auf 100 wie das Overlay, verschwänden Marke und Schließen-Kreuz darunter.

## Schrift

Fließtext: `Helvetica Neue` mit Fallback auf Inter/System-Sans (`--font`).

Der Hero nutzt `--font-display`. Die Datei für die Display-Schrift fehlt noch — sobald
sie in `assets/fonts/` liegt, den `@font-face`-Block oben in `style.css` einkommentieren
(erwartet `akii-display.woff2` / `.woff`). Bis dahin fällt `--font-display` auf den
Fließtext-Stack zurück, der Hero rendert also, nur nicht in der Wunschschrift.

## Was noch angeschlossen werden muss

- **Kontaktformular** — öffnet aktuell das Mailprogramm mit vorausgefüllter Nachricht
  (`mailto:`), es gibt bewusst keine erfundene Erfolgsmeldung. Für echten Versand einen
  Endpunkt (Formspree, Resend, eigene Route) in `main.js` unter „Contact form" eintragen.
- **Inhalte** — Projekte, Zahlen, Adresse, Telefonnummer und E-Mail sind Platzhalter
  und müssen vor dem Livegang ersetzt werden.
- **Impressum & Datenschutz** — im Footer verlinkt, Seiten fehlen noch (in Deutschland
  Pflicht).
- **Case-Detailseiten** — die Projektkacheln verlinken derzeit auf `#kontakt`.
