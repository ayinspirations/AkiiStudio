/* akii studio — Unterseiten: normal scroll, Apple-style motion */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Global nav: burger on phones ---- */
  const gnav = document.querySelector('.gnav');
  const burger = document.querySelector('.gnav__burger');
  if (gnav && burger) {
    burger.addEventListener('click', () => {
      const open = gnav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    gnav.querySelectorAll('.gnav__links a').forEach((a) =>
      a.addEventListener('click', () => gnav.classList.remove('is-open')));
  }

  /* ---- Rise into view ----
     Headlines, copy, tiles, cards and rows rise from below as they enter
     the screen. Siblings that arrive together are staggered. */
  const SEL = [
    '.phero .eyebrow', '.phero h1', '.phero__lead', '.phero__ctas',
    '.psec__head > *', '.tile', '.steps li', '.checks li', '.card',
    '.statement p', '.faq__item', '.cta__inner', '.study__media',
    '.study__head > *', '.facts', '.crumbs'
  ].join(',');
  const items = [...document.querySelectorAll(SEL)];
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
  } else {
    items.forEach((el) => el.classList.add('rv'));
    const io = new IntersectionObserver((entries) => {
      const arriving = entries.filter((e) => e.isIntersecting).map((e) => e.target);
      arriving.forEach((el, k) => {
        el.style.setProperty('--rd', (Math.min(k, 6) * 0.08).toFixed(2) + 's');
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  }

  /* ---- Hero image grows to full size as it scrolls into place ---- */
  const heroImg = document.querySelector('.phero__media img');
  if (heroImg && !reduced) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = heroImg.getBoundingClientRect();
      const vh = window.innerHeight;
      /* 0 when the image top sits at the bottom of the screen, 1 when it has
         risen to 35% of the screen height */
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.65)));
      heroImg.style.setProperty('--hero-scale', (0.9 + 0.1 * p).toFixed(4));
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ---- FAQ: one answer open at a time ---- */
  const faq = document.querySelector('.faq');
  if (faq) {
    faq.querySelectorAll('.faq__q').forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq__item');
        const open = !item.classList.contains('is-open');
        faq.querySelectorAll('.faq__item.is-open').forEach((o) => {
          o.classList.remove('is-open');
          o.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
        });
        item.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', String(open));
      });
    });
  }

  /* ---- Local nav: mark the section in view ---- */
  const lnavLinks = [...document.querySelectorAll('.lnav__links a[href^="#"]')];
  if (lnavLinks.length && 'IntersectionObserver' in window) {
    const map = new Map(lnavLinks.map((a) => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver((entries) => entries.forEach((e) => {
      const a = map.get(e.target.id);
      if (a && e.isIntersecting) {
        lnavLinks.forEach((l) => l.classList.remove('is-active'));
        a.classList.add('is-active');
      }
    }), { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
  }

  /* ---- Year ---- */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
