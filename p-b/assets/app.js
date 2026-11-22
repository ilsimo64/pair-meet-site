(() => {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // Handshake curtain transition. The emoji drops with the curtain,
  // makes a small bounce, then rises together with the curtain on the next page.
  const addCurtain = (phase) => {
    const curtain = document.createElement('div');
    curtain.className = `page-curtain ${phase}`;
    curtain.innerHTML = '<span class="curtain-handshake" aria-hidden="true">🤝</span>';
    document.body.appendChild(curtain);
    return curtain;
  };

  try {
    if (sessionStorage.getItem('pairmeet-curtain-in') === '1') {
      sessionStorage.removeItem('pairmeet-curtain-in');
      addCurtain('lift');
    }
  } catch (_) {}

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || !/\.html?$/.test(url.pathname) || url.pathname === window.location.pathname) return;

    event.preventDefault();
    addCurtain('drop');
    try { sessionStorage.setItem('pairmeet-curtain-in', '1'); } catch (_) {}
    // Let the curtain fall, then bounce the handshake just before navigation.
    window.setTimeout(() => {
      const hand = document.querySelector('.curtain-handshake');
      if (hand) hand.classList.add('bounce');
    }, 570);
    window.setTimeout(() => { window.location.href = url.href; }, 900);
  });
})();
