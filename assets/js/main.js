/* akii studio — interactions */
(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Nav tone: wordmark and rail invert over dark panels ---- */
  /* Assigned once readTone and markRail exist; the paged controller calls it
     on every animation frame because there are no scroll events any more. */
  let sync = () => {};

  const railEl = document.querySelector('.rail');

  const toneAt = (y) => {
    const hit = document.elementsFromPoint(window.innerWidth / 2, y)
      .find((el) => el.matches && el.matches('[data-panel]'));
    const panel = hit || [...document.querySelectorAll('[data-panel]')].find((el) => {
      const r = el.getBoundingClientRect();
      return r.top <= y && r.bottom > y;
    });
    if (!panel) return 'light';
    return panel.classList.contains('hero') ? 'hero'
      : panel.classList.contains('on-dark') ? 'dark'
      : 'light';
  };

  const readTone = () => {
    /* Wordmark and burger sit at the top edge... */
    document.body.dataset.tone = toneAt(30);
    /* ...the rail sits at mid height, so it has to read the panel behind
       itself. Reading the top edge for both made the rail take the colour
       of a section it was not standing on — on a dark-to-light change that
       left cream text on a cream ground, so it appeared to vanish and pop
       back. The colour transition carries it across the boundary. */
    const r = railEl ? railEl.getBoundingClientRect() : null;
    document.body.dataset.railTone =
      toneAt(r ? (r.top + r.bottom) / 2 : window.innerHeight / 2);
  };

  readTone();
  window.addEventListener('scroll', readTone, { passive: true });
  window.addEventListener('resize', readTone, { passive: true });

  /* ---- Overlay menu (phones) ---- */
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  };
  if (burger && drawer) {
    burger.addEventListener('click', () =>
      setMenu(!document.body.classList.contains('menu-open')));
    /* The wordmark sits above the open overlay, so tapping it has to close
       the menu too — otherwise the page glides home behind the drawer. */
    document.querySelector('.brand')?.addEventListener('click', () => setMenu(false));
    drawer.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll('.r');
  if (reduced) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    /* Deliberately shallow.
       Panels are snapped to the viewport and never scroll internally, so
       anything the observer refuses to count stays invisible for good.
       The margin therefore only has to hold back the row the incoming
       panel is still carrying below the fold — 8% does that. */
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---- Services accordion (one open at a time) ---- */
  const svc = document.getElementById('svc');
  if (svc) {
    /* The list starts fully collapsed in the markup — no item carries
       is-open — so nothing flashes open before this script runs. */
    svc.addEventListener('click', (e) => {
      const item = e.target.closest('.svc__item');
      if (!item) return;
      const wasOpen = item.classList.contains('is-open');
      svc.querySelectorAll('.svc__item').forEach((i) => i.classList.remove('is-open'));
      if (!wasOpen) item.classList.add('is-open');
    });
  }

  /* ---- Studio values (folded behind their labels on phones) ---- */
  const values = document.querySelector('#studio .values');
  if (values) {
    values.addEventListener('click', (e) => {
      const row = e.target.closest('li');
      if (!row) return;
      const wasOpen = row.classList.contains('is-open');
      values.querySelectorAll('li').forEach((r) => r.classList.remove('is-open'));
      if (!wasOpen) row.classList.add('is-open');
    });
  }

  /* ---- FAQ accordion ---- */
  const faq = document.getElementById('faq');
  if (faq) {
    faq.querySelectorAll('.faq__q').forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      /* one open at a time — the panel always fits the screen */
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq__item');
        const open = !item.classList.contains('is-open');
        faq.querySelectorAll('.faq__item.is-open').forEach((other) => {
          other.classList.remove('is-open');
          other.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
        });
        item.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  }

  /* ---- Paged section scrolling --------------------------------------
     The browser never scrolls: #stage is moved by transform instead.

     Why: while the document scrolled natively, trackpad momentum kept
     arriving as non-cancelable wheel events. Those moved the page, the
     settle lock pulled it back, and the two fought each other — the jitter
     you saw before each move. With the document locked there is nothing to
     fight, and every gesture goes straight into the animation.           */
  const stage = document.getElementById('stage');
  const panels = [...document.querySelectorAll('[data-panel]')];

  let index = 0;

  if (stage && panels.length && !reduced) {
    document.documentElement.classList.add('paged');

    const DURATION = 1150;
    const EDGE_HOLD = 60;        // ignore stray events right after landing

    /* Stops: every panel starts with one. A panel taller than the screen
       (Kontakt or Studio on a short phone) gets further stops so its lower
       part is reachable instead of cut off. */
    let stops = [];              // [{ y, panel }]
    let current = 0;             // px currently applied
    let animating = false;
    let landedAt = 0;

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const measure = () => {
      const vh = window.innerHeight;
      stops = [];
      panels.forEach((p, i) => {
        const top = p.offsetTop, end = top + p.offsetHeight;
        stops.push({ y: top, panel: i });
        let y = top;
        while (y + vh < end - 4) {
          y = Math.min(y + Math.round(vh * 0.8), end - vh);
          stops.push({ y, panel: i });
        }
      });
    };
    const firstStop = (panelIndex) => stops.findIndex((st) => st.panel === panelIndex);

    const apply = (y) => {
      current = y;
      stage.style.transform = 'translate3d(0,' + -y + 'px,0)';
    };

    const glideTo = (i) => {
      index = Math.max(0, Math.min(i, stops.length - 1));
      const dest = stops[index].y;
      /* a jump straight to a far panel (nav click): its previews start now */
      document.dispatchEvent(new CustomEvent('panel-target', { detail: stops[index].panel }));
      const from = current;
      const delta = dest - from;
      if (!delta) return;

      animating = true;
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t0) / DURATION, 1);
        apply(from + delta * easeInOutCubic(p));
        if (p < 1) {
          requestAnimationFrame(step);
        } else {
          apply(dest);
          animating = false;
          landedAt = performance.now();
          landed();
        }
        sync();
      };
      requestAnimationFrame(step);
    };

    const advance = (dir) => {
      if (animating || performance.now() - landedAt < EDGE_HOLD) return;
      glideTo(index + dir);
    };

    /* Tells the rest of the page which panel is now on screen — the live
       previews load only when their panel has been reached. */
    const landed = () => {
      const st = stops[index];
      if (st) document.dispatchEvent(new CustomEvent('panel-landed', { detail: st.panel }));
    };

    /* An embedded site can call scrollIntoView/focus while it loads, which
       would scroll this (locked) document and make the page jump. Pin it. */
    window.addEventListener('scroll', () => {
      if (window.scrollX || window.scrollY) window.scrollTo(0, 0);
    }, { passive: true });

    measure();
    apply(stops[0].y);
    if (document.readyState === 'complete') setTimeout(landed, 300);
    else window.addEventListener('load', () => setTimeout(landed, 300), { once: true });

    /* Every gesture drives the animation — nothing scrolls on its own. */
    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (document.body.classList.contains('menu-open')) return;
      if (Math.abs(e.deltaY) < 8) return;
      advance(Math.sign(e.deltaY));
    }, { passive: false });

    let touchY = null;
    window.addEventListener('touchstart', (e) => {
      touchY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (touchY === null || document.body.classList.contains('menu-open')) return;
      const dy = touchY - e.touches[0].clientY;
      if (Math.abs(dy) < 42) return;
      touchY = null;
      advance(Math.sign(dy));
    }, { passive: false });

    window.addEventListener('touchend', () => { touchY = null; }, { passive: true });

    window.addEventListener('keydown', (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
      if (typing || document.body.classList.contains('menu-open')) return;
      const map = { ArrowDown: 1, PageDown: 1, ' ': 1, ArrowUp: -1, PageUp: -1 };
      if (e.key === 'Home') { e.preventDefault(); glideTo(0); return; }
      if (e.key === 'End') { e.preventDefault(); glideTo(stops.length - 1); return; }
      const dir = map[e.key];
      if (dir) { e.preventDefault(); advance(dir); }
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const panel = target.closest('[data-panel]');
      let i = panel ? panels.indexOf(panel) : -1;
      /* Wrappers that sit outside the stack — #top on <main>, used by the
         wordmark and the footer credit — resolve to the first panel they
         contain, so those links land on the hero instead of doing nothing. */
      if (i < 0) i = panels.findIndex((pnl) => target.contains(pnl));
      if (i > -1) glideTo(firstStop(i));
    });

    window.addEventListener('resize', () => {
      const panel = stops[index] ? stops[index].panel : 0;
      measure();
      index = Math.max(0, firstStop(panel));
      apply(stops[index].y);
      sync();
    }, { passive: true });

    /* Accordions (FAQ, services, values) change panel heights — re-measure
       so the stops stay right, staying on the panel you are looking at. */
    if ('ResizeObserver' in window) {
      new ResizeObserver(() => {
        if (animating) return;
        const panel = stops[index] ? stops[index].panel : 0;
        measure();
        let best = firstStop(panel), d = Infinity;
        stops.forEach((st, k) => {
          if (st.panel === panel && Math.abs(st.y - current) < d) { d = Math.abs(st.y - current); best = k; }
        });
        index = Math.max(0, best);
        apply(stops[index].y);
        sync();
      }).observe(stage);
    }

    /* keep the furniture in step with the transform */
    window.__paged = { sync: () => sync() };
  }

  /* ---- Rail: mark the section you are on ---- */
  const railLinks = [...document.querySelectorAll('.rail__link')];
  const markRail = () => {
    const mid = window.innerHeight / 2;
    railLinks.forEach((l) => {
      const target = document.querySelector(l.getAttribute('href'));
      const panel = target && (target.closest('[data-panel]') || target);
      if (!panel) return;
      /* geometry, not scrollY — the page is moved by transform */
      const r = panel.getBoundingClientRect();
      l.classList.toggle('is-active', r.top <= mid && r.bottom > mid);
    });
  };

  sync = () => { readTone(); markRail(); };
  sync();

  /* ---- Contact form ----
     Submitted to Netlify Forms (data-netlify on the form). Sent via fetch
     so the visitor stays on the page; without JS the form posts normally
     and lands on /danke.html.                                         */
  const form = document.getElementById('form');
  const status = document.getElementById('status');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const data = Object.fromEntries(fd.entries());

      if (!data.name?.trim() || !data.message?.trim() || !/^\S+@\S+\.\S+$/.test(data.email || '')) {
        status.textContent = 'Bitte Name, gültige E-Mail und Nachricht ausfüllen.';
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      status.textContent = 'Wird gesendet …';
      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(fd).toString()
        });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.textContent = 'Danke! Ihre Anfrage ist angekommen – Sie hören in Kürze von uns.';
      } catch {
        status.textContent = 'Das hat leider nicht geklappt. Bitte schreiben Sie direkt an hallo@akiistudio.de.';
      } finally {
        btn.disabled = false;
      }
    });
  }

  /* ---- Live previews of the case sites ----
     Each iframe renders the real site at desktop width and is scaled down
     to fit its 16:10 frame, so the whole hero shows — on phones too. */
  const lives = [...document.querySelectorAll('.case__frame--live')];
  if (lives.length) {
    /* Virtual browser window: 1440×900 (1280×800 on phones) — 16:10 like the frame, so
       a hero built for 100vh fills the tile exactly with its nav bar.
       scrolling="no" removes the scrollbar; the extra pixel covers any
       sub-pixel seam at the right and bottom edge. */
    const fit = (frame) => {
      const f = frame.querySelector('iframe');
      const vw = Number(frame.dataset.vw) || (window.innerWidth < 760 ? 1280 : 1440);
      const w = frame.clientWidth, h = frame.clientHeight;
      if (!w) return;
      const k = (w + 1) / vw;
      f.style.width = vw + 'px';
      f.style.height = Math.ceil(h / k + 2) + 'px';
      f.style.transform = 'scale(' + k + ')';
    };
    const ro = new ResizeObserver((entries) => entries.forEach((e) => fit(e.target)));
    lives.forEach((frame) => { fit(frame); ro.observe(frame); });

    /* Load ahead: on arriving at a panel, the previews in that panel and the
       two panels either side are loaded in the background — after the glide
       has finished, so the animation never competes with a site booting up.
       By the time someone reaches a work panel its sites are ready. A jump
       straight to a far panel starts that panel's previews at once.
       A preview stays invisible until its site has loaded and painted, then
       fades in; once loaded it is kept, so nothing reloads or flashes. */
    const allPanels = [...document.querySelectorAll('[data-panel]')];
    const load = (frame) => {
      const f = frame.querySelector('iframe');
      if (f.src) return;
      frame.classList.add('is-loading');
      f.addEventListener('load', () => {
        setTimeout(() => {
          f.classList.add('is-loaded');
          frame.classList.remove('is-loading');
        }, 120);
      }, { once: true });
      f.src = f.dataset.src;
    };
    const loadPanel = (i) => {
      const panel = allPanels[i];
      if (panel) panel.querySelectorAll('.case__frame--live').forEach(load);
    };

    if (document.documentElement.classList.contains('paged')) {
      document.addEventListener('panel-landed', (e) => {
        const i = e.detail;
        [0, 1, -1, 2, -2].forEach((d, k) => setTimeout(() => loadPanel(i + d), k * 150));
      });
      document.addEventListener('panel-target', (e) => loadPanel(e.detail));
    } else if ('IntersectionObserver' in window) {
      /* no paging (reduced motion): load a screen ahead of the frame */
      const io = new IntersectionObserver((entries) => entries.forEach((e) => {
        if (e.isIntersecting) { load(e.target); io.unobserve(e.target); }
      }), { rootMargin: '100% 0px' });
      lives.forEach((frame) => io.observe(frame));
    } else {
      lives.forEach(load);
    }
  }

  /* ---- Year ---- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
