(() => {
  document.documentElement.classList.add('has-js');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const header = document.querySelector('.site-header');
  if (toggle && nav && header) {
    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'メニューを開く');
      nav.classList.remove('is-open');
    }
    toggle.setAttribute('aria-label', 'メニューを開く');
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      nav.classList.toggle('is-open', open);
    });
    nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); }
    });
    document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
    header.addEventListener('focusout', () => {
      requestAnimationFrame(() => { if (!header.contains(document.activeElement)) closeMenu(); });
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  }
})();
