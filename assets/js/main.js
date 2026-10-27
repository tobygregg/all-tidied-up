/* ─────────────────────────────────────────────────────────────
   All Tidied Up Guernsey – site scripts (no dependencies)
   Menu · header · reveals · services explorer · before/after
   · gallery lightbox · quote form · mobile bar
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Header shadow + sticky mobile bar ─────────────────── */
  var header = $('[data-header]');
  var bar = $('[data-mobile-bar]');
  var contact = $('#contact');
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 12);
    if (bar) {
      var nearForm = contact && contact.getBoundingClientRect().top < window.innerHeight * 0.6;
      bar.classList.toggle('is-visible', y > window.innerHeight * 0.55 && !nearForm);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ───────────────────────────────────────── */
  var menu = $('[data-menu]');
  var openBtn = $('[data-menu-open]');
  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) $('[data-menu-close]').focus(); else openBtn.focus({ preventScroll: true });
  }
  if (menu && openBtn) {
    openBtn.addEventListener('click', function () { setMenu(true); });
    $('[data-menu-close]').addEventListener('click', function () { setMenu(false); });
    menu.addEventListener('click', function (e) { if (e.target === menu) setMenu(false); });
    $$('[data-menu-link]', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false); });
  }

  /* ── Active nav link ───────────────────────────────────── */
  var navLinks = $$('.nav-link');
  if ('IntersectionObserver' in window && navLinks.length) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) navIO.observe(s); });
  }

  /* ── Scroll reveals ────────────────────────────────────── */
  var reveals = $$('.reveal');
  if (!('IntersectionObserver' in window) || reduceMotion) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ── Services explorer (tabs) ──────────────────────────── */
  var tabs = $$('[data-svc] [role="tab"]');
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      panel.classList.remove('is-in');
      if (on) { void panel.offsetWidth; panel.classList.add('is-in'); }
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      selectTab(tab);
      // On small screens, bring the panel into view
      if (window.innerWidth < 1024) {
        var panel = document.getElementById(tab.getAttribute('aria-controls'));
        var top = panel.getBoundingClientRect().top;
        if (top > window.innerHeight * 0.7) panel.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      }
    });
    tab.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowDown' || k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (k === 'ArrowUp' || k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (k === 'Home') n = tabs[0];
      if (k === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); selectTab(n, true); }
    });
  });

  // "Get a quote" buttons pre-select the matching service in the form
  var serviceSelect = $('#f-service');
  $$('[data-service]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (!serviceSelect) return;
      serviceSelect.value = a.getAttribute('data-service');
      serviceSelect.classList.remove('is-invalid');
    });
  });

  /* ── Before / after slider ─────────────────────────────── */
  var PAIRS = {
    bathroom: { title: 'Bathroom deep clean', text: 'Part of an emergency clean for a client coming home from hospital. Scrubbed, disinfected and safe again.' },
    kitchen:  { title: 'Kitchen deep clean', text: 'From the same flat. Worktops cleared, appliances cleaned and the floor brought back.' },
    fridge:   { title: 'Fridge cleared and cleaned', text: 'Emptied, washed out and disinfected, shelves and drawers included.' },
    cupboard: { title: 'Food cupboard sorted', text: 'Cleared, wiped down and reorganised so everything is easy to find.' }
  };
  var ba = $('[data-ba]');
  if (ba) {
    var handle = $('.ba-handle', ba);
    var imgA = $('.ba-after', ba), imgB = $('.ba-before', ba);
    var pos = 50, dragging = false;
    var setPos = function (p) {
      pos = Math.max(0, Math.min(100, p));
      ba.style.setProperty('--pos', pos + '%');
      handle.setAttribute('aria-valuenow', Math.round(pos));
      handle.setAttribute('aria-valuetext', Math.round(pos) + '% before');
    };
    var fromEvent = function (e) {
      var r = ba.getBoundingClientRect();
      setPos(((e.clientX - r.left) / r.width) * 100);
    };
    ba.addEventListener('pointerdown', function (e) {
      dragging = true; ba.setPointerCapture(e.pointerId); fromEvent(e);
    });
    ba.addEventListener('pointermove', function (e) { if (dragging) fromEvent(e); });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (t) {
      ba.addEventListener(t, function () { dragging = false; });
    });
    handle.addEventListener('keydown', function (e) {
      var step = e.shiftKey ? 10 : 4;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); setPos(pos - step); }
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); setPos(pos + step); }
      if (e.key === 'Home') { e.preventDefault(); setPos(0); }
      if (e.key === 'End') { e.preventDefault(); setPos(100); }
    });

    // Gentle hint: ease the slider once when it first comes into view
    if ('IntersectionObserver' in window && !reduceMotion) {
      var hinted = false;
      var hintIO = new IntersectionObserver(function (en) {
        if (!en[0].isIntersecting || hinted) return;
        hinted = true; hintIO.disconnect();
        var start = performance.now();
        (function tick(now) {
          var t = Math.min(1, (now - start) / 1400);
          if (dragging) return;
          setPos(50 + Math.sin(t * Math.PI * 2) * 14 * (1 - t));
          if (t < 1) requestAnimationFrame(tick);
        })(start);
      }, { threshold: 0.6 });
      hintIO.observe(ba);
    }

    // Switch between jobs
    var chips = $$('[data-pair]');
    var title = $('[data-ba-title]'), text = $('[data-ba-text]');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var key = chip.getAttribute('data-pair');
        chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
        var label = PAIRS[key].title;
        ba.classList.add('is-loading');
        var loaded = 0;
        var done = function () { if (++loaded === 2) { ba.classList.remove('is-loading'); setPos(50); } };
        [[imgA, 'after'], [imgB, 'before']].forEach(function (pair) {
          var img = pair[0], kind = pair[1];
          img.onload = done; img.onerror = done;
          img.srcset = 'images/work/' + key + '-' + kind + '-sm.webp 600w, images/work/' + key + '-' + kind + '.webp 977w';
          img.src = 'images/work/' + key + '-' + kind + '.webp';
          img.alt = label + ' – ' + kind;
        });
        title.textContent = label;
        text.textContent = PAIRS[key].text;
      });
    });
  }

  /* ── Gallery lightbox ──────────────────────────────────── */
  var lb = $('[data-lightbox]');
  var items = $$('[data-gallery] [data-full]');
  if (lb && items.length) {
    var lbImg = $('[data-lb-img]', lb), lbCap = $('[data-lb-caption]', lb), lbCount = $('[data-lb-count]', lb);
    var current = 0, lastFocus = null;
    var show = function (i) {
      current = (i + items.length) % items.length;
      var it = items[current];
      lbImg.style.opacity = '0';
      lbImg.onload = function () { lbImg.style.opacity = '1'; };
      lbImg.src = it.getAttribute('data-full');
      lbImg.alt = $('img', it).alt;
      lbCap.textContent = it.getAttribute('data-caption');
      lbCount.textContent = (current + 1) + ' / ' + items.length;
    };
    var open = function (i) {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      $('[data-lb-close]', lb).focus();
    };
    var close = function () {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    };
    items.forEach(function (it, i) { it.addEventListener('click', function () { open(i); }); });
    $('[data-lb-close]', lb).addEventListener('click', close);
    $('[data-lb-prev]', lb).addEventListener('click', function () { show(current - 1); });
    $('[data-lb-next]', lb).addEventListener('click', function () { show(current + 1); });
    $('[data-lb-stage]', lb).addEventListener('click', function (e) { if (e.target === e.currentTarget) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
      if (e.key === 'Tab') { // keep focus inside the viewer
        var f = $$('button', lb).filter(function (b) { return b.offsetParent !== null; });
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // Swipe on touch screens
    var sx = null, sy = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close();
      sx = sy = null;
    });
  }

  /* ── Quote form: inline validation + submit state ──────── */
  var form = $('[data-form]');
  if (form) {
    var fields = $$('.field', form);
    var check = function (f) {
      var ok = f.checkValidity() && f.value.trim() !== '';
      f.classList.toggle('is-invalid', !ok);
      f.setAttribute('aria-invalid', ok ? 'false' : 'true');
      return ok;
    };
    fields.forEach(function (f) {
      f.addEventListener('blur', function () { if (f.value) check(f); });
      f.addEventListener('input', function () { if (f.classList.contains('is-invalid')) check(f); });
      f.addEventListener('change', function () { if (f.classList.contains('is-invalid')) check(f); });
    });
    form.addEventListener('submit', function (e) {
      var firstBad = null;
      fields.forEach(function (f) { if (!check(f) && !firstBad) firstBad = f; });
      if (firstBad) { e.preventDefault(); firstBad.focus(); return; }
      var btn = $('[data-submit]', form);
      btn.disabled = true;
      btn.classList.add('opacity-80');
      $('[data-submit-label]', form).textContent = 'Sending…';
    });
  }

  /* ── Footer year ───────────────────────────────────────── */
  var yr = $('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
