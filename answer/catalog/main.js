document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('.pill');
  const cards = [...document.querySelectorAll('.card')];
  const grid  = document.querySelector('.grid');

  // 初期: URLの ?tag=xxx を反映
  const params = new URLSearchParams(location.search);
  const initial = params.get('tag') || '*';
  activate(initial);

  pills.forEach(p => {
    p.addEventListener('click', () => {
      const tag = p.dataset.filter;
      const sp = new URLSearchParams(location.search);
      tag === '*' ? sp.delete('tag') : sp.set('tag', tag);
      history.replaceState({}, '', `${location.pathname}${sp.toString() ? '?' + sp.toString() : ''}`);
      activate(tag);
    });
  });

  function activate(tag){
    pills.forEach(x => x.classList.toggle('is-active', x.dataset.filter === tag));
    cards.forEach(card => {
      const tags = (card.dataset.tags || '').split(/\s+/);
      const show = (tag === '*') || tags.includes(tag);
      toggle(card, show);
    });
    grid.scrollIntoView({ behavior:'smooth', block:'start' });
  }

  function toggle(el, show){
    if (show) {
      el.hidden = false;
      requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'scale(1)'; el.style.visibility = 'visible'; });
    } else {
      el.style.opacity = '0';
      el.style.transform = 'scale(.98)';
      el.style.visibility = 'hidden';
      setTimeout(() => { el.hidden = true; }, 180);
    }
  }

  // ライトボックス
  const dlg = document.getElementById('lightbox');
  const lbImg = dlg.querySelector('.lb-img');
  const lbTtl = dlg.querySelector('.lb-ttl');
  const lbSub = dlg.querySelector('.lb-sub');
  const btnClose = dlg.querySelector('.close');

  cards.forEach(card => {
    card.addEventListener('click', () => openLB(card));
    card.addEventListener('keypress', e => { if (e.key === 'Enter') openLB(card); });
  });

  function openLB(card){
    const img = card.querySelector('img');
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    lbTtl.textContent = card.querySelector('.ttl')?.textContent || '';
    lbSub.textContent = card.querySelector('.sub')?.textContent || '';
    dlg.showModal();
  }

  btnClose.addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

  // ギャラリーモード（暗転）任意
  const modeBtn = document.getElementById('modeToggle');
  if (modeBtn){
    modeBtn.addEventListener('click', () => {
      const on = document.body.classList.toggle('dark');
      modeBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
});
