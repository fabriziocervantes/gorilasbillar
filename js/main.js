(function () {
  'use strict';

  // ---------- Trust marquee ----------
  var marqueeItems = [
    '30 años en el mercado',
    'Fabricación propia',
    'Hecho sobre pedido',
    'Sede en Hermosillo',
    'Hechas para durar generaciones'
  ];
  var track = document.querySelector('.marquee__track');
  if (track) {
    // Two identical rows: the animation shifts by -50% for a seamless loop.
    for (var r = 0; r < 2; r++) {
      marqueeItems.forEach(function (text) {
        var item = document.createElement('span');
        item.className = 'marquee__item';
        item.textContent = text;
        var ball = document.createElement('span');
        ball.className = 'ball ball--sm';
        track.appendChild(item);
        track.appendChild(ball);
      });
    }
  }

  // ---------- Mobile menu ----------
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('mobile-menu');

  function setMenu(open) {
    if (!toggle || !menu) return;
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    toggle.textContent = open ? '✕' : '☰';
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(menu.hidden); });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    window.matchMedia('(min-width: 1120px)').addEventListener('change', function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  // ---------- Gallery carousel ----------
  var gallery = document.querySelector('[data-gallery]');
  document.querySelectorAll('[data-gallery-dir]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!gallery) return;
      var card = gallery.firstElementChild;
      var step = card ? card.getBoundingClientRect().width + 10 : 390;
      gallery.scrollBy({ left: Number(btn.dataset.galleryDir) * step, behavior: 'smooth' });
    });
  });

  // ---------- FAQ accordion (one open at a time) ----------
  var faqButtons = Array.prototype.slice.call(document.querySelectorAll('.faq__q'));
  faqButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var willOpen = btn.getAttribute('aria-expanded') !== 'true';
      faqButtons.forEach(function (other) {
        var open = other === btn && willOpen;
        other.setAttribute('aria-expanded', String(open));
        document.getElementById(other.getAttribute('aria-controls')).hidden = !open;
      });
    });
  });

  // ---------- Reveal sections on scroll ----------
  if ('IntersectionObserver' in window) {
    var revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-hidden');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (el) {
      // Anything already on screen at load stays visible.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      el.classList.add('is-hidden');
      io.observe(el);
    });
  }
})();
