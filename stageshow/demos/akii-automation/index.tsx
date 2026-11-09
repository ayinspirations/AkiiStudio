import { Avatar, Bar, Chart, Collapse, Count, Fly, Spinner, Stage, States, Window, type Act, type Rect } from '../../kit'
import '../akii-look/look.css'
import './auto.css'

// Digitale Lösungen: what the system does, no cursor. A request sent from the
// website's contact form arrives in the CRM by itself: its topic rides from
// the form into the new row, and "automatisch erfasst" rolls up a beat later.
// It happens twice, then the payoff holds. Plays once; the still is the
// payoff.
//
// Layout (from the subscriptions gold): the CRM window inset top, off the
// right and bottom; the form card straddling its sidebar line on the left.
// The chip is the only thing that travels between the two places.
//
// Real strings: the form's title and sender, the topic, the button and its
// done state, the CRM title, the counter's label and value, the new rows.

type Req = { name: string; topic: string }
const REQS: Req[] = [
  { name: 'Julia Weber', topic: 'Küchenplanung' },
  { name: 'Tobias Kern', topic: 'Einbauschrank' },
]
const BASE = 41
const HISTORY = [22, 25, 24, 29, 31, 30, 34, 36, 35, 39, 41]

type Send = 'idle' | 'busy' | 'sent' | 'done'
type S = { open: number; landed: number; k: number; send: Send; fly: null | { i: number; from: Rect; to: Rect; go: boolean } }

const START: S = { open: 0, landed: 0, k: 0, send: 'idle', fly: null }
const POSTER: S = { open: 2, landed: 2, k: 1, send: 'done', fly: null }

async function pulse(a: Act<S>, i: number) {
  await a.set({ send: 'busy' })
  await a.wait(700)
  const list = a.rect('list', { layout: true })
  const row = a.rect(`row-${i}`, { layout: true })
  const pill = a.rect(`pill-${i}`, { layout: true })
  const b = a.rect('send', { layout: true })
  const to = { ...pill, y: list.y + pill.y - row.y }
  const from = { x: b.x + b.width / 2 - pill.width / 2, y: b.y + b.height / 2 - pill.height / 2, width: pill.width, height: pill.height }
  await a.set({ send: 'sent', fly: { i, from, to, go: false } })
  await a.wait(200)
  await a.set((s) => ({ open: i + 1, fly: { ...s.fly!, go: true } }))
  await a.wait(900)
  await a.set({ fly: null, landed: i + 1, send: 'done' })
}

async function script(a: Act<S>) {
  await a.wait(900)
  a.mark('first')
  await pulse(a, 0)
  await a.wait(900)
  // The form moves on to the next request: only sender and topic change
  await a.set({ send: 'idle', k: 1 })
  await a.wait(1100)
  a.mark('second')
  await pulse(a, 1)
  await a.wait(2600)
}

const OLD = [
  { name: 62, topic: 48 },
  { name: 78, topic: 56 },
  { name: 54, topic: 44 },
]

export default function AkiiAutomation() {
  return (
    <Stage<S> width={720} height={440} compact={{ below: 600, width: 358, height: 340 }} initial={START} poster={POSTER} script={script} play="once" fill className="akii am">
      {(s, _rect, layout) => {
        const req = REQS[s.k]!
        const count = BASE + s.landed
        const data = [...HISTORY.slice(0, -1), count]
        return (
          <>
            <div className="am-ground" />
            <Window url="crm.ihre-website.de/anfragen" className="am-window">
              <div className="am-scene" data-on>
                <aside className="am-side">
                  <div className="am-org"><span className="am-strong">Holzwerk Brandt</span></div>
                  {[46, 58, 40, 52].map((w, i) => (
                    <div key={i} className="am-nav" data-on={i === 0 || undefined}>
                      <Bar w={10} h={10} r={3} tone={i === 0 ? 4 : 3} />
                      <Bar w={w} h={5} tone={i === 0 ? 4 : 2} />
                    </div>
                  ))}
                </aside>
                <main className="am-main">
                  <div className="am-head">
                    <span className="am-title">Anfragen</span>
                    <Bar w={56} h={22} r={6} tone={2} />
                  </div>
                  <div className="am-mrr">
                    <div className="am-mrr__text">
                      <span className="am-muted">Automatisch erfasst</span>
                      <Count className="am-mrr__value" value={count} duration={900} />
                    </div>
                    <Chart data={data} width={layout === 'compact' ? 110 : 190} height={52} className="am-chart" />
                  </div>
                  <div className="am-list" data-target="list">
                    {REQS.map((r, i) => ({ r, i })).reverse().map(({ r, i }) => (
                      <Collapse key={r.name} open={s.open > i} reveal="clip">
                        <div className="am-row" data-target={`row-${i}`} data-landed={s.landed > i || undefined}>
                          <Avatar name={r.name} size={22} className="am-av" data-i={i} />
                          <span className="am-name">{r.name}</span>
                          <span className="am-plan">Formular</span>
                          <span className="am-pill" data-target={`pill-${i}`}>{r.topic}</span>
                        </div>
                      </Collapse>
                    ))}
                    {OLD.map((r, i) => (
                      <div key={i} className="am-row am-row--old">
                        <Bar w={22} h={22} r={11} tone={2} />
                        <Bar w={r.name} h={5} tone={3} />
                        <Bar w={r.topic} h={5} tone={2} style={{ marginLeft: 'auto' }} />
                      </div>
                    ))}
                  </div>
                </main>
              </div>
            </Window>

            <section className="am-checkout" data-in>
              <div className="am-checkout__head">
                <span className="am-strong">Kontaktformular</span>
              </div>
              <div className="am-price">
                <span className="am-from">{req.name}</span>
              </div>
              <div className="am-fields">
                <div className="am-field"><span className="am-topic">{req.topic}</span></div>
                <div className="am-field"><Bar w={s.k === 0 ? 120 : 96} h={5} tone={3} /></div>
              </div>
              <div className="am-pay" data-target="send" data-state={s.send}>
                <States
                  value={s.send}
                  states={{
                    idle: 'Absenden',
                    busy: <Spinner size={14} />,
                    sent: null,
                    done: (
                      <span className="am-done">
                        <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden>
                          <path d="M3.5 8.5 6.5 11.5 12.5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Gesendet
                      </span>
                    ),
                  }}
                />
              </div>
            </section>

            {s.fly && (
              <Fly from={s.fly.from} to={s.fly.to} go={s.fly.go} held duration={900}>
                <span className="am-pill am-pill--chip">{REQS[s.fly.i]!.topic}</span>
              </Fly>
            )}
          </>
        )
      }}
    </Stage>
  )
}
