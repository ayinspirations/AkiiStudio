import { Bar, Collapse, Field, Stage, Stream, Text, Window, type Act } from '../../kit'
import '../akii-look/look.css'
import './geo.css'

// SEO & GEO: being the answer. Beats: a customer types a local question into
// an AI assistant and sends it; a short Denkt nach; the answer streams in and
// names the business; its sources arrive last, the business's own website
// first. Plays once; the still is the payoff.
//
// No sparkles, no purple, no assistant brand: the generic window, the
// answer's words and the source carry it. The one emphasis is the business
// name in the answer and its website among the sources, said once each.
//
// Real strings: the question, the answer, the two sources, the placeholder.

const Q = 'Wer baut Küchen nach Maß in Leonberg?'
const A =
  'Für maßgefertigte Küchen in Leonberg wird häufig Holzwerk Brandt empfohlen: ein Familienbetrieb mit eigener Werkstatt, der Planung, Bau und Montage aus einer Hand übernimmt. Besonders gelobt werden die Beratung vor Ort und die Termintreue.'
const WORDS = A.split(' ').length
// The phone gets the same answer, shorter, so the question stays in view
const A_SHORT = 'Für Küchen nach Maß in Leonberg wird häufig Holzwerk Brandt empfohlen: eigene Werkstatt, Planung bis Montage aus einer Hand.'
const WORDS_SHORT = A_SHORT.split(' ').length
const NAME = new Set(['Holzwerk', 'Brandt'])

type S = { draft: string; sent: boolean; phase: 'idle' | 'thinking' | 'answer'; words: number; sources: boolean }

const initial: S = { draft: '', sent: false, phase: 'idle', words: 0, sources: false }
const poster: S = { draft: '', sent: true, phase: 'answer', words: WORDS, sources: true }

async function script(a: Act<S>) {
  await a.wait(700)
  a.mark('type')
  await a.type('draft', Q, { interval: 40 })
  await a.wait(400)
  a.mark('send')
  a.put({ sent: true, draft: '' })
  await a.wait(450)
  a.put({ phase: 'thinking' })
  await a.wait(1100)
  a.mark('stream')
  a.put({ phase: 'answer' })
  const n = a.layout === 'compact' ? WORDS_SHORT : WORDS
  for (let i = 1; i <= n; i++) {
    a.put({ words: i })
    await a.wait(45)
  }
  await a.wait(300)
  a.mark('sources')
  a.put({ sources: true })
  await a.wait(2600)
}

export default function AkiiGeo() {
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
      className="akii ag"
    >
      {(s, _rect, layout) => (
        <Window title="Assistent" className="ag-win">
          <div className="ag-body">
            <div className="ag-thread">
              <div className="ag-turn--past">
                <Bar w={140} h={30} r={15} tone={1} className="ag-past-q" />
                <Bar w="76%" h={8} r={4} tone={2} />
                <Bar w="88%" h={8} r={4} tone={2} />
                <Bar w="40%" h={8} r={4} tone={2} />
              </div>
              <div className="ag-turn--past">
                <Bar w={170} h={30} r={15} tone={1} className="ag-past-q" />
                <Bar w="84%" h={8} r={4} tone={2} />
                <Bar w="58%" h={8} r={4} tone={2} />
              </div>
              <Collapse open={s.sent} reveal="drop" from="below">
                <div className="ag-q">
                  <Text>{Q}</Text>
                </div>
              </Collapse>
              <Collapse open={s.phase === 'thinking'}>
                <Text className="ag-thinking">Denkt nach</Text>
              </Collapse>
              <Collapse open={s.phase === 'answer'}>
                <div className="ag-a" data-on>
                  <Stream className="ag-stream" text={layout === 'compact' ? A_SHORT : A} count={s.words} mark={(w) => NAME.has(w)} />
                  <div className="ag-sources" data-on={s.sources || undefined}>
                    <span className="ag-source ag-source--own">ihre-website.de</span>
                    <span className="ag-source">Bewertungen</span>
                  </div>
                </div>
              </Collapse>
            </div>
            <Field className="ag-composer" value={s.draft} placeholder="Frag etwas" focused={!s.sent} />
          </div>
        </Window>
      )}
    </Stage>
  )
}
