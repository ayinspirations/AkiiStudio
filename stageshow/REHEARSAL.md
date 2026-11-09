# Rehearsal: akii service-page demos

Built with the stageshow skill (kit + gold examples, MIT, see `LICENSE-stageshow`).
Look: `demos/akii-look/look.css` (warm akii ground, ember accent, the site's type stack).
All four play once (dashboard loops), stage 720×440 wide, 358×340 compact below 600px,
`fill` capped by the page at 920px wide (scale ≈ 1.28).

## akii-webdesign (/leistungen/webdesign/)
Gold: `panel-annotation` — kept the panel-over-product layout and its weights;
changed the story to a CMS edit (no leader line), the panel's publish button
moved into its header, the hero image moved into the filler row.
Beats: click headline field … ⌘A … type new headline (site updates live) … Publish → Veröffentlicht, Entwurf → Live (payoff holds 2.6s).

## akii-geo (/leistungen/seo-geo/)
Gold: `ai-chat` — kept the thread, Collapse/Stream structure and timing;
German copy, the business name emphasised once (bold, no tint), its website
as the first source in the accent. Compact streams a shorter answer.
Beats: type question … send … Denkt nach … answer streams … sources.

## akii-automation (/leistungen/digitale-loesungen/)
Gold: `subscriptions` — kept the chip flight, Count and handoff recipe;
one scene instead of two, play once, contact form instead of checkout,
no invented logo tile. Compact: CRM on top, the form as a slim bar at the foot.
Beats: Absenden … topic flies into the list … counter rolls … second request … payoff holds.

## akii-dashboard (/leistungen/apps-saas/)
Gold: `chart-scrub` — kept the scrub gesture and readout; German dates and €,
taller chart for the wider stage, no window title.

## Captured
Playground and the real pages, widths 1280 and 390, light look only, plus a
13s settle screenshot of each page at 1440 and 390 (no layout shift: slot size
reserved by aspect-ratio).

Gate: `rehearsal passed` for all four demos at 1280 and 390 in the playground.
On the site the only remaining lines are `kit override` on `.ss-phone*` rules:
those are the kit's own rules inside `@layer stageshow`; the checker attributes
them to the demo because the build bundles all CSS into one file. No demo uses
a phone.

Film candidates left standing (not gate lines): typing makes the field's
characters grow per keystroke (`jump` on `.ss-field__chars`, intentional);
`same-box content change` on the live headline (typed text, intentional);
dashboard loop-seam warnings inherited from the gold.

## Not checked
- Dark theme (the site has none), reduced motion on a real device, touch input.
- Fresh-eye review (`references/review.md`) by a second reviewer.
- Real Safari/iOS rendering; checks ran in headless Chromium.
