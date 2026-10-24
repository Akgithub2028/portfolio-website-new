import { useEffect, useRef } from 'react';
import Footer from '@src/components/dom/Footer';
import PreFooter from '@src/components/dom/PreFooter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { createNavigationTransition } from '@src/lib/navigation-transition.mjs';
import styles from '@src/components/dom/styles/layout.module.scss';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';

function Layout({children, layoutRef, mainRef, router}) {
  const [lenis, introOut, setIsLoading, setIsMenuOpen, setIsAbout] = useStore(useShallow(state => [state.lenis, state.introOut, state.setIsLoading, state.setIsMenuOpen, state.setIsAbout]));
  const path = useRef(router.asPath);
  path.current = router.asPath;
  useEffect(() => {
    if (!introOut || !mainRef.current) return;
    const transition = createNavigationTransition({gsap, lenis, setLoading: setIsLoading, setMenuOpen: setIsMenuOpen, setAbout: setIsAbout,
      nodes: {main: mainRef.current, layout: layoutRef.current, loader: document.getElementById('loader'), header: document.querySelector('header[role="banner"]'), scrollbar: document.getElementById('scrollbar')},
      readPath: () => path.current, refresh: () => ScrollTrigger.refresh(), reducedMotion: () => matchMedia('(prefers-reduced-motion: reduce)').matches});
    const clicked = event => transition.begin(event.detail.href);
    const completed = url => transition.complete(url);
    router.events.on('routeChangeStart', transition.begin);
    router.events.on('routeChangeComplete', completed);
    router.events.on('routeChangeError', transition.error);
    window.addEventListener('portfolio:navigate', clicked);
    return () => {
      router.events.off('routeChangeStart', transition.begin);
      router.events.off('routeChangeComplete', completed);
      router.events.off('routeChangeError', transition.error);
      window.removeEventListener('portfolio:navigate', clicked);
      transition.dispose();
    };
  }, [router.events, introOut, lenis, layoutRef, mainRef, setIsLoading, setIsMenuOpen, setIsAbout]);
  return <>{children}<PreFooter /><footer className={styles.footer}><Footer /></footer></>;
}
export default Layout;
