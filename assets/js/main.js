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
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq__item');
        const open = item.classList.toggle('is-open');
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

    let offsets = [];
    let current = 0;             // px currently applied
    let animating = false;
    let landedAt = 0;

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const measure = () => {
      offsets = panels.map((p) => p.offsetTop);
    };

    const apply = (y) => {
      current = y;
      stage.style.transform = 'translate3d(0,' + -y + 'px,0)';
    };

    const glideTo = (i) => {
      index = Math.max(0, Math.min(i, panels.length - 1));
      const dest = offsets[index];
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
        }
        sync();
      };
      requestAnimationFrame(step);
    };

    const advance = (dir) => {
      if (animating || performance.now() - landedAt < EDGE_HOLD) return;
      glideTo(index + dir);
    };

    measure();
    apply(offsets[0]);

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
      if (e.key === 'End') { e.preventDefault(); glideTo(panels.length - 1); return; }
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
      if (i > -1) glideTo(i);
    });

    window.addEventListener('resize', () => {
      measure();
      apply(offsets[index]);
      sync();
    }, { passive: true });

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
     No backend here: we compose a prefilled mail to the studio so the
     submission is real rather than a fake success state.            */
  const form = document.getElementById('form');
  const status = document.getElementById('status');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());

      if (!data.name?.trim() || !data.message?.trim() || !/^\S+@\S+\.\S+$/.test(data.email || '')) {
        status.textContent = 'Bitte Name, gültige E-Mail und Nachricht ausfüllen.';
        return;
      }

      const body = [
        `Name: ${data.name}`,
        `E-Mail: ${data.email}`,
        `Unternehmen: ${data.company || '—'}`,
        `Budget: ${data.budget || '—'}`,
        '',
        data.message
      ].join('\n');

      window.location.href =
        `mailto:hallo@akii.studio?subject=${encodeURIComponent('Projektanfrage — ' + data.name)}` +
        `&body=${encodeURIComponent(body)}`;

      status.textContent = 'E-Mail-Programm wird geöffnet …';
    });
  }

  /* ---- Year ---- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
