import { Badge, Bar, Button, Field, Roll, Stage, Text, Window, type Act } from '../../kit'
import '../akii-look/look.css'
import './web.css'

// Webdesign: the client edits their own site. Beats: the cursor clicks the
// headline field in the CMS panel; the old words are selected and replaced by
// typing; the website behind updates live as the words land; Publish turns
// into Published and the status rolls from Entwurf to Live. Plays once; the
// still is the payoff.
//
// Layout: stage with gutters on akii's warm ground. The website (the
// product) is inset from the sides and runs off the bottom; the CMS panel
// (the tool) straddles its right edge over the empty margin beside the hero
// image, never over the headline it changes.
//
// Real strings: the business name, the headline (old and new), the site's
// button, the panel title, the field label, the status, Publish.

const OLD = 'Handwerk, das bleibt.'
const NEW = 'Ihre Küche nach Maß.'

type S = { draft: string; editing: boolean; selected: boolean; published: boolean }

const initial: S = { draft: OLD, editing: false, selected: false, published: false }
const poster: S = { draft: NEW, editing: false, selected: false, published: true }

async function script(a: Act<S>) {
  await a.wait(900)
  a.mark('focus')
  await a.click({ at: 'field', x: 0.86, y: 0.5 })
  a.put({ editing: true })
  await a.wait(350)
  await a.key('cmd+a')
  a.put({ selected: true })
  await a.wait(450)
  a.mark('type')
  a.put({ selected: false, draft: '' })
  await a.type('draft', NEW, { interval: 55 })
  await a.wait(500)
  a.mark('publish')
  await a.click({ at: 'publish', x: 0.85, y: 0.7 })
  a.put({ editing: false, published: true })
  await a.wait(500)
  await a.move({ at: 'panel', x: 0.3, y: 1.15 })
  await a.wait(2600)
}

export default function AkiiWebdesign() {
  return (
    <Stage<S>
      width={720}
      height={440}
      compact={{ below: 600, width: 358, height: 340 }}
      initial={initial}
      poster={poster}
      script={script}
      play="once"
      fill
      keys={{ wide: 'bottom', compact: 'top' }}
      cursor={{ at: { wide: { x: 660, y: 400 }, compact: { x: 320, y: 120 } } }}
      className="akii aw"
    >
      {(s) => (
        <>
          <Window url="ihre-website.de" className="aw-win">
            <div className="aw-site">
              <div className="aw-nav">
                <Text className="aw-brand">Holzwerk Brandt</Text>
                <span className="aw-links">
                  <Bar w={34} h={6} tone={2} />
                  <Bar w={40} h={6} tone={2} />
                  <Bar w={28} h={6} tone={2} />
                </span>
              </div>
              <div className="aw-copy">
                <div className="aw-headline">{s.draft}</div>
                <div className="aw-lines">
                  <Bar w="92%" h={7} tone={2} />
                  <Bar w="70%" h={7} tone={2} />
                </div>
                <span className="aw-cta">Termin anfragen</span>
              </div>
              <div className="aw-row">
                <div className="aw-image" />
                <Bar w="100%" h={96} r={10} tone={1} />
                <Bar w="100%" h={96} r={10} tone={1} />
              </div>
            </div>
          </Window>

          <section className="aw-panel" data-target="panel">
            <div className="aw-panel__head">
              <span className="aw-panel__name">
                <Text className="aw-title">Startseite</Text>
                <Badge tone={s.published ? 'success' : 'neutral'} dot><Roll variant="fade">{s.published ? 'Live' : 'Entwurf'}</Roll></Badge>
              </span>
              <Button variant="primary" className="aw-publish" data-target="publish">{s.published ? 'Veröffentlicht' : 'Veröffentlichen'}</Button>
            </div>
            <div className="aw-media">
              <span className="aw-thumb" />
              <span className="aw-media__lines">
                <Bar w={96} h={6} tone={3} />
                <Bar w={64} h={6} tone={2} />
              </span>
            </div>
            <div className="aw-quiet">
              <Bar w={58} h={6} tone={3} />
              <Bar w="100%" h={30} r={8} tone={1} />
            </div>
            <Field
              className="aw-field"
              label="Überschrift"
              value={s.draft}
              focused={s.editing}
              data-selected={s.selected || undefined}
              box={{ 'data-target': 'field', 'data-cursor': 'ibeam' }}
            />
          </section>
        </>
      )}
    </Stage>
  )
}
