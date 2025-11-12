// 超軽量フィルタとライトボックス。依存なし。
document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('.pill');
  const cards = [...document.querySelectorAll('.card')];
  const grid  = document.querySelector('.grid');

  // 初期: URLの ?tag=xxx を読んで反映
  const params = new URLSearchParams(location.search);
  const initial = params.get('tag') || '*';
  activate(initial);

  pills.forEach(p => {
    p.addEventListener('click', () => {
      const tag = p.dataset.filter;
      // URLを更新（履歴に優しい）
      const sp = new URLSearchParams(location.search);
      tag === '*' ? sp.delete('tag') : sp.set('tag', tag);
      history.replaceState({}, '', `${location.pathname}${sp.toString() ? '?' + sp.toString() : ''}`);
      activate(tag);
    });
  });

  function activate(tag){
    pills.forEach(x => x.classList.toggle('is-active', x.dataset.filter === tag));
    // フィルタ処理
    cards.forEach(card => {
      const tags = (card.dataset.tags || '').split(/\s+/);
      const show = (tag === '*') || tags.includes(tag);
      toggle(card, show);
    });
    // スクロール位置を少し戻して“切り替わった感”
    grid.scrollIntoView({ behavior:'smooth', block:'start' });
  }

  function toggle(el, show){
    // アニメっぽい見え方を維持しつつ hidden でアクセシビリティ配慮
    if (show) {
      el.hidden = false;
      requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'scale(1)'; el.style.visibility = 'visible'; });
    } else {
      el.style.opacity = '0';
      el.style.transform = 'scale(.98)';
      el.style.visibility = 'hidden';
      // 遅延で hidden を付けるとフォーカスが飛ばない
      setTimeout(() => { el.hidden = true; }, 180);
    }
  }

  // ライトボックス（クリック or キーボードで開く）
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
});
