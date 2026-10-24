import { useEffect, useRef } from 'react';

import Link from 'next/link';
import clsx from 'clsx';
import footerLinks from '@src/components/dom/navbar/constants/footerLinks';
import gsap from 'gsap';
import menuLinks from '@src/components/dom/navbar/constants/menuLinks';
import projectsLinks from '@src/components/dom/navbar/constants/projectsLinks';
import styles from '@src/components/dom/navbar/styles/menuLinks.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useRouter } from 'next/router';
import { useStore } from '@src/store';

function MenuLinks() {
  const timeline = useRef(null);
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen, lenis] = useStore((state) => [state.isMenuOpen, state.setIsMenuOpen, state.lenis]);
  const menuRef = useRef();
  const menuLinksItemsRef = useRef([]);
  const router = useRouter();

  const setupMenuAnimation = (gsapTimeline, refs) => {
    const fluidCanvas = document?.getElementById('fluidCanvas');
    const layout = document?.getElementById('layout');
    const scrollbar = document?.getElementById('scrollbar');
    const header = document?.querySelector('header');

    gsap.set(refs.menuRef.current, { pointerEvents: 'none', autoAlpha: 0 });
    gsap.set(refs.menuLinksItemsRef.current, { x: '-100%' });

    gsapTimeline
      .to(refs.menuRef.current, { autoAlpha: 1, stagger: 0.01, pointerEvents: 'auto' }, 0)
      .to(fluidCanvas, { duration: 0, opacity: 0 }, 0)
      .to(refs.menuLinksItemsRef.current, { x: 0, stagger: 0.016, pointerEvents: 'auto' }, 0)
      .to('main', { borderRadius: '1.3888888889vw', border: '2px solid #f0f4f1', scale: 0.9, pointerEvents: 'none', left: '-40vw' }, 0)
      .to(layout, { opacity: isMobile ? 0.05 : 0.3, height: '90svh' }, 0)
      .to(scrollbar, { opacity: 0, right: '46vw', scale: 0.9 }, 0)
      .to(header, { autoAlpha: 0, left: '-40vw', top: isMobile ? '6vw' : '3vw', scale: 0.9, overwrite: true }, 0);
  };

  useEffect(() => {
    const tl = gsap.timeline({paused: true, defaults: {duration: .35, ease: "power3.inOut"}});
    timeline.current = tl;
    const refs = { menuRef, menuLinksItemsRef };
    const ctx = gsap.context(() => {
      setupMenuAnimation(tl, refs, isMobile);
    });

    return () => {
      if (tl) {
        tl.kill();
      }
      ctx.revert();
    };
  }, [isMobile]);

  useEffect(() => {
    const tl = timeline.current;
    if (!tl) return;
    if (isMenuOpen) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [isMenuOpen, isMobile]);

  useEffect(() => {
    if (!isMenuOpen) return;
    // Next prefetches route bundles in production; clicks still give immediate feedback in development.
    [...menuLinks, ...projectsLinks].forEach(link => {if (link.href) router.prefetch(link.href).catch(() => {});});
    const escape = event => {if (event.key === 'Escape') {setIsMenuOpen(false); lenis?.start();}};
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [isMenuOpen, router, setIsMenuOpen, lenis]);

  const navigate = (event, href) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return;
    const current = router.asPath.split(/[?#]/)[0].replace(/\/$/, '') || '/';
    if (current === href.replace(/\/$/, '') || (current === '/' && href === '/')) {
      event.preventDefault(); setIsMenuOpen(false); lenis?.start(); return;
    }
    // Stop the menu from reversing transforms concurrently with the page transition.
    timeline.current?.pause(0);
    gsap.set(menuRef.current, {autoAlpha: 0, pointerEvents: 'none'});
    setIsMenuOpen(false);
    window.dispatchEvent(new CustomEvent('portfolio:navigate', {detail: {href}}));
  };

  const renderMenuLinks = (links, refs, pathname) =>
    links.map((link, index) => (
      <div
        ref={(el) => {
          menuLinksItemsRef.current[index + 1] = el;
        }}
        key={link.title}
        className={clsx(styles.menuListItem, pathname === link.href && styles.menuListItemActive)}
      >
        {link.href !== undefined ? (
          <Link aria-label={`Go ${link.title}`} scroll={false} href={link.href} onClick={event => navigate(event, link.href)}>
            <span>{link.title}</span>
          </Link>
        ) : (
          <span
            onClick={() => {setIsMenuOpen(false); lenis?.start();}}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setIsMenuOpen(false); lenis?.start();
              }
            }}
          >
            {link.title}
          </span>
        )}
      </div>
    ));

  return (
    <nav id="menu" ref={menuRef} className={styles.menu}>
      <div className={clsx(styles.menuWrapper, 'layout-block-inner')}>
        <div
          ref={(el) => {
            menuLinksItemsRef.current[0] = el;
          }}
          className={styles.menuList}
        >
          {renderMenuLinks(menuLinks, menuLinksItemsRef, router.pathname)}
        </div>
        <div
          ref={(el) => {
            menuLinksItemsRef.current[menuLinks.length + 2] = el;
          }}
          className={styles.menuList}
        >
          {projectsLinks.map((link, index) => (
            <div
              ref={(el) => {
                menuLinksItemsRef.current[menuLinks.length + index + 2] = el;
              }}
              key={link.title}
              className={styles.menuListItem}
            >
              <Link aria-label={`Go ${link.title}`} scroll={false} href={link.href} onClick={event => navigate(event, link.href)}>
                <span>{link.title}</span>
              </Link>
            </div>
          ))}
        </div>
        <div
          ref={(el) => {
            menuLinksItemsRef.current[menuLinks.length + projectsLinks.length + 3] = el;
          }}
          className={styles.menuList}
        >
          <div
            role="presentation"
            ref={(el) => {
              menuLinksItemsRef.current[menuLinks.length + projectsLinks.length + 3] = el;
            }}
            className={styles.menuListItem}
          >
            <Link aria-label="Send email" scroll={false} href="mailto:aayaannkausar@gmail.com">
              <span>GET IN TOUCH</span>
            </Link>
          </div>
        </div>
        <div
          ref={(el) => {
            menuLinksItemsRef.current[menuLinks.length + projectsLinks.length + 4] = el;
          }}
          className={styles.menuList}
        >
          {footerLinks.map((link, index) => (
            <div
              ref={(el) => {
                menuLinksItemsRef.current[menuLinks.length + projectsLinks.length + index + 4] = el;
              }}
              key={link.title}
              className={styles.menuListItem}
            >
              <Link aria-label={`Find me on ${link.title}`} target="_blank" rel="noopener noreferrer" scroll={false} href={link.href}>
                <span>{link.title}</span>
              </Link>
            </div>
          ))}
        </div>
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => {
            setIsMenuOpen(false);
            lenis?.start();
          }}
          className={styles.menuClose}
        >
          <p>&#10005;</p>
        </button>
      </div>
    </nav>
  );
}

export default MenuLinks;
