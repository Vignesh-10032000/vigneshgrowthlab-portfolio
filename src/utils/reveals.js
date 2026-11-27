// Reveal each section once. The browser tracks intersection as the layout changes.
export function observeReveals(root) {
  // Touch users can scroll straight to readable text without waiting for a fade.
  if (!window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;

  const observer = new IntersectionObserver(entries => {
    for (const { target, isIntersecting, boundingClientRect } of entries) {
      if (isIntersecting || boundingClientRect.bottom < 0) {
        target.classList.remove('reveal-pending');
        observer.unobserve(target);
      } else {
        target.style.setProperty('--reveal-delay', (Number(target.dataset.aosDelay) || 0) + 'ms');
        target.classList.add('reveal-ready', 'reveal-pending');
      }
    }
  });
  function observeTree(node) {
    if (node.nodeType !== 1) return;
    if (node.matches('[data-aos]')) observer.observe(node);
    node.querySelectorAll('[data-aos]').forEach(element => observer.observe(element));
  }
  observeTree(root);
  // Category filters can mount new project cards after hydration.
  const changes = new MutationObserver(records => {
    for (const record of records) {
      record.addedNodes.forEach(observeTree);
      record.removedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        observer.unobserve(node);
        node.querySelectorAll('[data-aos]').forEach(element => observer.unobserve(element));
      });
    }
  });
  changes.observe(root, { childList: true, subtree: true });
  return () => {
    changes.disconnect();
    observer.disconnect();
  };
}
