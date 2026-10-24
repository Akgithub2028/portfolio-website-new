// Covers the current page immediately; route/network readiness controls when it reveals.
export function createNavigationTransition({gsap, nodes, lenis, setLoading, setMenuOpen, setAbout, refresh, readPath, reducedMotion, schedule = requestAnimationFrame, cancel = cancelAnimationFrame}) {
  const {main, layout, loader, header, scrollbar} = nodes;
  let active = false, ready = false, disposed = false, url, sequence = 0, frame = 0;
  let exit, enter, covered = Promise.resolve();
  const normalize = value => (value || '/').split('#')[0].replace(/\/$/, '') || '/';
  const begin = next => {
    if (disposed || (active && normalize(next) === url)) return;
    const alreadyCovered = active;
    sequence++; active = true; ready = false; url = normalize(next);
    cancel(frame); enter?.kill(); exit?.kill();
    lenis?.stop(); setMenuOpen(false); setLoading(true);
    main.setAttribute('aria-busy', 'true');
    loader.dataset.transition = 'covering';
    gsap.set(layout, {opacity: 1});
    gsap.set(header, {autoAlpha: 0, left: 0, top: 0, scale: 1});
    if (!alreadyCovered) gsap.set(loader, {x: '100%', scale: 1, autoAlpha: 1, borderRadius: 0});
    covered = new Promise(resolve => {
      exit = gsap.timeline({onComplete: () => {loader.dataset.transition = 'covered'; resolve();}, onInterrupt: resolve});
      const duration = reducedMotion() ? 0 : .22;
      exit.to(loader, {x: 0, duration, ease: 'power2.out'}, 0)
        .to(main, {x: '-3%', scale: .98, pointerEvents: 'none', duration}, 0);
    });
  };
  const complete = (next, failed = false) => {
    if (disposed || !active || ready || normalize(next) !== url) return;
    ready = true;
    const ticket = sequence;
    covered.then(() => {
      if (disposed || ticket !== sequence) return;
      frame = schedule(() => {
        if (disposed || ticket !== sequence) return;
        setAbout(normalize(failed ? readPath() : next) === '/about');
        if (!failed) lenis?.scrollTo(0, {force: true, immediate: true});
        gsap.set(main, {x: '3%', left: 0, opacity: 1});
        loader.dataset.transition = 'revealing';
        const duration = reducedMotion() ? 0 : .28;
        enter = gsap.timeline({onComplete: () => {
          if (disposed || ticket !== sequence) return;
          active = false;
          gsap.set(main, {pointerEvents: 'auto', border: 'none'});
          main.removeAttribute('aria-busy');
          loader.dataset.transition = 'idle';
          setLoading(false); lenis?.start();
          frame = schedule(refresh);
        }});
        enter.to(loader, {x: '-100%', duration, ease: 'power2.inOut'}, 0)
          .to(main, {x: 0, scale: 1, duration, ease: 'power2.out'}, 0)
          .to(layout, {height: '100%', opacity: 1, duration}, 0)
          .to(header, {autoAlpha: 1, duration}, 0);
        if (scrollbar) enter.set(scrollbar, {autoAlpha: 1, scale: 1}, 0);
      });
    });
  };
  return {begin, complete, error: (_error, next) => complete(next, true), dispose() {
    disposed = true; sequence++; cancel(frame); exit?.kill(); enter?.kill();
  }};
}
