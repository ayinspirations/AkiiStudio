// Mounts the stageshow demos into the static pages:
//   <div data-stageshow="webdesign" role="img" aria-label="…"></div>
// Built with `npm run build` into /assets/stageshow/ (see README.md).
import { createRoot } from 'react-dom/client'
import type { ComponentType } from 'react'
import Webdesign from './demos/akii-webdesign'
import Geo from './demos/akii-geo'
import Automation from './demos/akii-automation'
import Dashboard from './demos/akii-dashboard'

const DEMOS: Record<string, ComponentType> = {
  webdesign: Webdesign,
  'seo-geo': Geo,
  'digitale-loesungen': Automation,
  'apps-saas': Dashboard,
}

document.querySelectorAll<HTMLElement>('[data-stageshow]').forEach((el) => {
  const Demo = DEMOS[el.dataset.stageshow ?? '']
  if (Demo) createRoot(el).render(<Demo />)
})
