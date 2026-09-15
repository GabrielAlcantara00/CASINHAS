(() => {
  'use strict';
  const config = window.MINI_CIDADE_CONFIG || {};
  const all = (selector) => [...document.querySelectorAll(selector)];
  const get = (id) => document.getElementById(id);
  const consentKey = 'mini-cidade:medicao:v1';
  const pixelId = String(config.pixelId || '').trim();
  const hasPixel = /^\d{5,25}$/.test(pixelId);
  let consent = '';
  let pixelStarted = false;
  let dialogOpener = null;

  all('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
  const phone = String(config.whatsapp || '').replace(/\D/g, '');
  if (/^\d{10,15}$/.test(phone)) {
    const message = 'Olá! Tenho uma dúvida sobre a Mini Cidade Criativa, de R$10.';
    all('[data-support]').forEach((el) => {
      el.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    });
  }

  function buildCheckout() {
    try {
      const raw = String(config.checkoutUrl || '').trim();
      if (!raw) return '';
      const url = new URL(raw);
      if (url.protocol !== 'https:' || url.username || url.password) return '';
      const incoming = new URLSearchParams(window.location.search);
      const allowed = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'fbclid', 'gclid', 'ttclid', 'sck', 'src'];
      for (const key of allowed) {
        const value = incoming.get(key);
        if (value && value.length <= 500 && !url.searchParams.has(key)) url.searchParams.set(key, value);
      }
      return url.href;
    } catch (_) { return ''; }
  }

  function openDialog(id, opener) {
    const dialog = get(id);
    if (!dialog) return;
    dialogOpener = opener || document.activeElement;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }
  function closeDialog(dialog) {
    if (typeof dialog.close === 'function') dialog.close();
    else { dialog.removeAttribute('open'); dialogOpener?.focus(); }
  }
  all('[data-dialog]').forEach((button) => button.addEventListener('click', () => openDialog(button.dataset.dialog, button)));
  all('dialog').forEach((dialog) => {
    dialog.querySelector('[data-close]')?.addEventListener('click', () => closeDialog(dialog));
    dialog.addEventListener('close', () => dialogOpener?.focus());
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeDialog(dialog);
    });
  });

  const checkout = buildCheckout();
  all('[data-checkout]').forEach((button) => {
    button.href = checkout || '#oferta';
    button.addEventListener('click', (event) => {
      if (!checkout) {
        event.preventDefault();
        openDialog('checkout-dialog', button);
        return;
      }
      if (hasPixel && consent === 'yes' && pixelStarted && typeof window.fbq === 'function') {
        window.fbq('trackSingle', pixelId, 'InitiateCheckout', {
          content_ids: ['mini-cidade-criativa'], content_type: 'product', value: 10, currency: 'BRL', num_items: 1
        });
      }
    });
  });

  const mobileBar = get('mobile-bar');
  const firstCTA = get('hero-cta');
  const offer = get('oferta');
  const footer = document.querySelector('footer');
  let queued = false;
  function updateBar() {
    queued = false;
    if (!mobileBar || !firstCTA || !offer || !footer) return;
    const offerRect = offer.getBoundingClientRect();
    const offerVisible = offerRect.top < window.innerHeight && offerRect.bottom > 0;
    const footerVisible = footer.getBoundingClientRect().top < window.innerHeight;
    mobileBar.hidden = !(window.matchMedia('(max-width:760px)').matches && firstCTA.getBoundingClientRect().bottom < 0 && !offerVisible && !footerVisible);
  }
  function scheduleBar() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(updateBar);
  }
  window.addEventListener('scroll', scheduleBar, { passive: true });
  window.addEventListener('resize', scheduleBar);
  window.addEventListener('pageshow', scheduleBar);
  window.addEventListener('load', scheduleBar);
  updateBar();

  function startPixel() {
    if (!hasPixel || consent !== 'yes') return;
    if (pixelStarted) { window.fbq?.('consent', 'grant'); return; }
    pixelStarted = true;
    if (!window.fbq) {
      const queue = function () { queue.callMethod ? queue.callMethod.apply(queue, arguments) : queue.queue.push(arguments); };
      window.fbq = queue;
      if (!window._fbq) window._fbq = queue;
      queue.push = queue; queue.loaded = true; queue.version = '2.0'; queue.queue = [];
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
    }
    window.fbq('consent', 'grant');
    window.fbq('init', pixelId);
    window.fbq('trackSingle', pixelId, 'PageView');
    window.fbq('trackSingle', pixelId, 'ViewContent', {
      content_name: 'Mini Cidade Criativa', content_ids: ['mini-cidade-criativa'], content_type: 'product', value: 10, currency: 'BRL'
    });
  }
  function saveConsent(choice) {
    consent = choice;
    try { window.localStorage.setItem(consentKey, choice); } catch (_) { /* Browsers can block storage. The page continues working. */ }
    get('consent').hidden = true;
    if (choice === 'yes') startPixel();
    else if (pixelStarted) window.fbq?.('consent', 'revoke');
  }
  if (hasPixel) {
    try { consent = window.localStorage.getItem(consentKey) || ''; } catch (_) { consent = ''; }
    get('privacy-settings').hidden = false;
    get('privacy-settings').addEventListener('click', () => { get('consent').hidden = false; get('consent-no').focus(); });
    get('consent-yes').addEventListener('click', () => saveConsent('yes'));
    get('consent-no').addEventListener('click', () => saveConsent('no'));
    if (consent === 'yes') startPixel();
    else if (consent !== 'no') get('consent').hidden = false;
  }
})();
