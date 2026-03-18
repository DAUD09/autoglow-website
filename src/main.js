// ── Navbar scroll shadow ─────────────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// ── Mobile menu ──────────────────────────────────────────────────────
const menuBtn    = document.getElementById('menu-btn');
const menuClose  = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => mobileMenu.classList.remove('translate-x-full'));
  menuClose?.addEventListener('click', () => mobileMenu.classList.add('translate-x-full'));
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) mobileMenu.classList.add('translate-x-full');
  });
}

// ── FAQ accordion ────────────────────────────────────────────────────
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

// ── Contact form → Formspree ─────────────────────────────────────────
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqeygkgg';

const submitBtn    = document.getElementById('submit-btn');
const formSuccess  = document.getElementById('form-success');
const formError    = document.getElementById('form-error');

if (submitBtn) {
  submitBtn.addEventListener('click', async () => {

    // ── Field references ──
    const nameEl     = document.getElementById('name');
    const phoneEl    = document.getElementById('phone');
    const serviceEl  = document.getElementById('service');
    const emailEl    = document.getElementById('email');
    const locationEl = document.getElementById('location');
    const dateEl     = document.getElementById('date');
    const messageEl  = document.getElementById('message');
    const honeypotEl = document.querySelector('input[name="_gotcha"]');

    // ── Honeypot check — silently abort if filled by a bot ──
    if (honeypotEl && honeypotEl.value.trim() !== '') return;

    // ── Client-side validation ──
    const name    = nameEl?.value.trim()    || '';
    const phone   = phoneEl?.value.trim()   || '';
    const service = serviceEl?.value        || '';

    if (!name || !phone || !service) {
      alert('Please fill in your name, phone number, and the service you need.');
      return;
    }

    // ── Rate-limit: one submission per 60 s (simple session guard) ──
    const lastSubmit = sessionStorage.getItem('ag_last_submit');
    if (lastSubmit && Date.now() - parseInt(lastSubmit) < 60000) {
      alert('Please wait a moment before sending another request.');
      return;
    }

    // ── Disable button & show loading state ──
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    // ── Build payload ──
    const payload = {
      _subject:   'New Quote Request — Autoglow Website',
      name,
      phone,
      service,
      email:      emailEl?.value.trim()    || '(not provided)',
      location:   locationEl?.value.trim() || '(not provided)',
      date:       dateEl?.value            || '(not specified)',
      message:    messageEl?.value.trim()  || '(none)',
      _gotcha:    '',   // always empty — Formspree ignores bots that fill this
    };

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':        'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // ── Success ──
        sessionStorage.setItem('ag_last_submit', Date.now().toString());
        formSuccess?.classList.remove('hidden');
        if (formError) formError.classList.add('hidden');
        submitBtn.style.opacity = '0.5';
        // Clear form fields
        [nameEl, phoneEl, emailEl, locationEl, dateEl, messageEl].forEach(el => {
          if (el) el.value = '';
        });
        if (serviceEl) serviceEl.value = '';
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.errors?.[0]?.message || 'Submission failed');
      }
    } catch (err) {
      // ── Error state ──
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Quote Request <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>';
      if (formError) formError.classList.remove('hidden');
      console.error('Formspree error:', err);
    }
  });
}
