// ── Image fallback handlers (replaces all inline onerror attributes) ─
function initImageFallbacks() {
  // Navbar logo → show fallback span
  document.querySelectorAll('img[data-logo-img]').forEach(img => {
    img.addEventListener('error', () => {
      const fallback = document.getElementById('logo-fallback');
      if (fallback) fallback.style.display = 'flex';
      img.style.display = 'none';
    });
  });

  // Footer logo (services/about/contact/legal pages) → text fallback
  document.querySelectorAll('img[data-footer-logo]').forEach(img => {
    img.addEventListener('error', () => {
      const span = document.createElement('span');
      span.className = 'font-display font-bold text-white';
      span.textContent = 'Autoglow Cleaning Services Ltd';
      img.parentElement.replaceChildren(span);
    });
  });

  // Footer logo full (index.html) → AG badge + name
  document.querySelectorAll('img[data-footer-logo-full]').forEach(img => {
    img.addEventListener('error', () => {
      const badge = document.createElement('span');
      badge.className = 'w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-sm text-white';
      badge.style.background = '#03BCF1';
      badge.textContent = 'AG';
      const name = document.createElement('span');
      name.className = 'font-display font-bold text-white ml-2';
      name.textContent = 'Autoglow';
      img.parentElement.replaceChildren(badge, name);
    });
  });

  // Hero image fallback
  document.querySelectorAll('img[data-img-fallback-hero]').forEach(img => {
    img.addEventListener('error', () => {
      img.parentElement.classList.add('hero-img-fallback');
      img.style.display = 'none';
    });
  });

  // Generic hide-on-error (team photos, etc.)
  document.querySelectorAll('img[data-img-fallback-hide]').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
    });
  });
}

// ── Navbar scroll shadow ─────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ── Mobile menu ──────────────────────────────────────────────────────
function initMobileMenu() {
  const menuBtn    = document.getElementById('menu-btn');
  const menuClose  = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => mobileMenu.classList.remove('translate-x-full'));
  menuClose?.addEventListener('click', () => mobileMenu.classList.add('translate-x-full'));
  mobileMenu.addEventListener('click', e => {
    if (e.target === mobileMenu) mobileMenu.classList.add('translate-x-full');
  });
}

// ── FAQ accordion ────────────────────────────────────────────────────
function initFAQ() {
  document.querySelectorAll('[data-faq-item]').forEach(item => {
    const trigger = item.querySelector('[data-faq-trigger]');
    const panel   = item.querySelector('[data-faq-panel]');
    const icon    = trigger?.querySelector('svg');
    trigger?.addEventListener('click', () => {
      const isOpen = !panel.classList.contains('hidden');
      document.querySelectorAll('[data-faq-panel]').forEach(p => p.classList.add('hidden'));
      document.querySelectorAll('[data-faq-trigger] svg').forEach(s => s.style.transform = '');
      if (!isOpen) {
        panel.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// ── Contact form → Formspree ─────────────────────────────────────────
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqeygkgg';

// Phone format: digits, spaces, +, dashes only, min 7 chars
const PHONE_RE = /^[+\d][\d\s\-().]{6,}$/;

function buildSubmitIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'w-5 h-5');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2.5');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('d', 'M17 8l4 4m0 0l-4 4m4-4H3');
  svg.appendChild(path);
  return svg;
}

function resetSubmitBtn(btn) {
  btn.disabled = false;
  btn.style.opacity = '';
  // Use DOM APIs — no innerHTML
  btn.replaceChildren(
    document.createTextNode('Send Quote Request '),
    buildSubmitIcon()
  );
}

function initContactForm() {
  const submitBtn   = document.getElementById('submit-btn');
  const formSuccess = document.getElementById('form-success');
  const formError   = document.getElementById('form-error');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', async () => {
    // ── Honeypot — silently abort if filled by a bot ──────────────
    const honeypot = document.querySelector('input[name="_gotcha"]');
    if (honeypot?.value.trim() !== '') return;

    // ── Gather fields ─────────────────────────────────────────────
    const nameEl     = document.getElementById('name');
    const phoneEl    = document.getElementById('phone');
    const serviceEl  = document.getElementById('service');
    const emailEl    = document.getElementById('email');
    const locationEl = document.getElementById('location');
    const dateEl     = document.getElementById('date');
    const messageEl  = document.getElementById('message');

    const name     = nameEl?.value.trim()     || '';
    const phone    = phoneEl?.value.trim()    || '';
    const service  = serviceEl?.value         || '';
    const location = locationEl?.value.trim() || '';

    // ── Validation ────────────────────────────────────────────────
    if (!name || name.length < 2) {
      alert('Please enter your full name (at least 2 characters).');
      nameEl?.focus();
      return;
    }
    if (!phone || !PHONE_RE.test(phone)) {
      alert('Please enter a valid phone number, e.g. +265 999 915 894.');
      phoneEl?.focus();
      return;
    }
    if (!service) {
      alert('Please select the service you need.');
      serviceEl?.focus();
      return;
    }
    if (!location) {
      alert('Please enter your location or area.');
      locationEl?.focus();
      return;
    }

    // ── Session rate limit (one submission per 60 s) ──────────────
    const lastSubmit = sessionStorage.getItem('ag_last_submit');
    if (lastSubmit && Date.now() - parseInt(lastSubmit) < 60000) {
      alert('Please wait a moment before sending another request.');
      return;
    }

    // ── Loading state ─────────────────────────────────────────────
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';
    submitBtn.replaceChildren(document.createTextNode('Sending…'));

    const payload = {
      _subject:  'New Quote Request — Autoglow Website',
      name,
      phone,
      service,
      location,
      email:    emailEl?.value.trim()  || '(not provided)',
      date:     dateEl?.value          || '(not specified)',
      message:  messageEl?.value.trim() || '(none)',
      _gotcha:  '',
    };

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':       'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        sessionStorage.setItem('ag_last_submit', Date.now().toString());
        formSuccess?.classList.remove('hidden');
        if (formError) formError.classList.add('hidden');
        submitBtn.style.opacity = '0.4';
        // Clear fields
        [nameEl, phoneEl, emailEl, locationEl, dateEl, messageEl].forEach(el => {
          if (el) el.value = '';
        });
        if (serviceEl) serviceEl.value = '';
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors?.[0]?.message || 'Submission failed');
      }
    } catch (err) {
      resetSubmitBtn(submitBtn);
      if (formError) formError.classList.remove('hidden');
      if (formSuccess) formSuccess.classList.add('hidden');
      console.error('Form error:', err);
    }
  });
}

// ── Init all ─────────────────────────────────────────────────────────
initImageFallbacks();
initNavbar();
initMobileMenu();
initFAQ();
initContactForm();
