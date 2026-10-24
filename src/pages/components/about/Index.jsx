import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import Image from 'next/image';
import clsx from 'clsx';
import { gsap } from 'gsap';
import styles from '@src/pages/components/about/styles/about.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';

function About() {
  const isMobile = useIsMobile();
  const rootRef = useRef();
  const animatedImageRef = useRef();

  const setupScrollAnimation = () => {
    const ctx = gsap.context(() => {
      gsap.set(animatedImageRef.current, { top: !isMobile ? '-20vw' : '0' });
      if (!isMobile) {
        gsap.to(animatedImageRef.current, {
          top: '20vw',
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            scroller: document?.querySelector('main'),
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return ctx;
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = setupScrollAnimation();
    return () => ctx.kill();
  }, [isMobile]);

  const moveCard = event => {
    if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    card.style.setProperty('--card-rx', `${(0.5 - y) * 5}deg`);
    card.style.setProperty('--card-ry', `${(x - 0.5) * 5}deg`);
    card.style.setProperty('--card-x', `${x * 100}%`);
    card.style.setProperty('--card-y', `${y * 100}%`);
  };
  const resetCard = event => {
    delete event.currentTarget.dataset.active;
    event.currentTarget.style.setProperty('--card-rx', '0deg');
    event.currentTarget.style.setProperty('--card-ry', '0deg');
  };
  const enterCard = event => {
    if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.currentTarget.dataset.active = 'true';
    moveCard(event);
  };

  const renderImageContainer = () => (
    <div className={styles.imageContainer} onPointerEnter={enterCard} onPointerMove={moveCard} onPointerLeave={resetCard}>
      <Image priority src="/images/aayaann-card.svg" sizes="100%" fill alt="Aayaann Kausar personal monogram" />
    </div>
  );

  return (
    <section ref={rootRef} className={styles.root}>
      <div className={clsx(styles.nameContainer, 'layout-block-inner')}>
        <AppearTitle>
          <h1 className={clsx('h1', 'medium')}>Hello, I’m</h1>
          <h1 className={clsx('h1', 'medium')}>Aayaann Kausar.</h1>
        </AppearTitle>
      </div>

      <div className={clsx(styles.container, 'layout-grid-inner')}>
        {isMobile ? renderImageContainer() : null}
        <div className={clsx(styles.descWrapper)} ref={animatedImageRef}>
          <AppearTitle>
            <div className="p-l">Research gives me a question.</div>
            <div className="p-l">Engineering gives me a way to test it.</div>
            <div className="p-l">My work moves between the two.</div>
          </AppearTitle>
        </div>
        {!isMobile ? renderImageContainer() : null}
        <div className={clsx(styles.descWrapperBottom)}>
          {!isMobile ? (
            <AppearTitle key="desktop-descWrapperBottom">
              <h6 className="h6">An AI engineer and independent researcher</h6>
              <h6 className="h6">at IIT Kharagpur, studying Chemical Engineering</h6>
              <h6 className="h6">with a minor in Artificial Intelligence.</h6>
              <h6 className="h6">My work spans agents, speech systems,</h6>
              <h6 className="h6">and language-model adaptation.</h6>
            </AppearTitle>
          ) : (
            <AppearTitle key="mobile-descWrapperBottom">
              <h6 className="h6">An AI engineer and independent researcher at IIT Kharagpur,</h6>
              <h6 className="h6">studying Chemical Engineering with a minor in Artificial Intelligence.</h6>
              <h6 className="h6">My work spans agents, speech systems,</h6>
              <h6 className="h6">and language-model adaptation.</h6>
            </AppearTitle>
          )}
          <div className={clsx(styles.buttonContainer)}>
            <ButtonLink href="/about" label="ABOUT ME" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
