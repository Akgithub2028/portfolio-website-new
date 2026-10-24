import { useRef } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import { useShallow } from 'zustand/react/shallow';
import CustomHead from '@src/components/dom/CustomHead';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import competition from '@src/constants/competitions';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useStore } from '@src/store';
import titleStyles from '@src/pages/projects/projects.module.scss';
import styles from '@src/pages/competitions/competitions.module.scss';

export default function Competitions() {
  const root = useRef();
  const [isLoading] = useStore(useShallow(state => [state.isLoading]));

  useIsomorphicLayoutEffect(() => {
    if (isLoading) return undefined;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const scroller = document.querySelector('main');
      gsap.fromTo(root.current.querySelector('[data-rank]'), {yPercent: 12, opacity: 0},
        {yPercent: 0, opacity: 1, duration: .65, ease: 'power3.out'});
      gsap.fromTo(root.current.querySelectorAll('[data-flow]'), {strokeDashoffset: 1}, {
        strokeDashoffset: 0, duration: 1.1, stagger: .07, ease: 'power2.out',
        scrollTrigger: {trigger: root.current.querySelector('[data-sequence]'), scroller, start: 'top 90%', once: true},
      });
      root.current.querySelectorAll('[data-approach]').forEach(row => {
        gsap.fromTo(row, {y: 22, opacity: 0}, {y: 0, opacity: 1, duration: .5, ease: 'power2.out',
          scrollTrigger: {trigger: row, scroller, start: 'top 92%', once: true}});
      });
    }, root);
    return () => media.revert();
  }, [isLoading]);

  return <>
    <CustomHead title="Aayaann Kausar — Competitions" description="9th globally among 5,000+ competitors in Wunder Fund’s HFT Market State Forecasting Challenge. Transformer sequence modelling and efficient streaming inference." keywords={['Aayaann Kausar', 'Wunder RNN Challenge', 'Wundernn', 'Wunder Fund', 'Machine learning competitions']} />
    <section className={clsx(titleStyles.titleContainer, 'layout-block-inner')}>
      <h1 className={clsx(titleStyles.title, 'h1')}>Competitions</h1>
    </section>
    <section ref={root} className={clsx(styles.root, 'layout-block-inner')} aria-labelledby="wunder-title">
      <div className={styles.feature}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Wunder Fund <span> / </span> 2025</p>
          <h2 id="wunder-title" className="h2">Wunder RNN<br />Challenge</h2>
          <p className={styles.tagline}>Sequence modelling under CPU constraints.<br />A global top-ten result.</p>
          <p className={styles.challengeTitle}>{competition.title}</p>
          <p className={styles.period}>Competition entry <span> / </span> {competition.period}</p>
        </div>
        <figure className={styles.standing} aria-label={`${competition.rank}th globally among ${competition.competitors} competitors`}>
          <p className={styles.eyebrow}>Final standing</p>
          <div className={styles.rankWindow}><span data-rank className={styles.rank} aria-hidden="true">0{competition.rank}</span></div>
          <p className={styles.rankLabel}>9th globally</p>
          <p className={styles.field}>among {competition.competitors} competitors</p>
          <span className={styles.finishLine} aria-hidden="true" />
        </figure>
        <div className={styles.sequence} data-sequence aria-hidden="true">
          <svg viewBox="0 0 1000 100" fill="none" preserveAspectRatio="none">
            <path data-flow pathLength="1" d="M0 13C100 13 125 60 220 60S360 20 455 20S600 70 700 50S870 23 1000 23" />
            <path data-flow pathLength="1" d="M0 40C110 40 145 13 245 38S375 75 470 50S625 24 720 49S875 72 1000 72" />
            <path data-flow pathLength="1" d="M0 84C120 84 135 52 235 52S380 87 480 67S610 39 720 46S870 44 1000 44" />
          </svg>
          <div><span>Multivariate sequence</span><span>Model → next state</span></div>
        </div>
      </div>
      <dl className={styles.results}>
        <div><dt>Final R²</dt><dd>{competition.finalScore}</dd></div>
        <div><dt>Public leaderboard R²</dt><dd>{competition.publicScore}</dd></div>
        <div><dt>Steps per sequence</dt><dd>{competition.sequenceLength}</dd></div>
      </dl>
      <div className={styles.overview}>
        <div>
          <p className={styles.eyebrow}>The challenge</p>
          <AppearTitle><h3 className="h3">Sequence modelling.</h3><h3 className="h3">Streaming execution.</h3></AppearTitle>
        </div>
        <p className="h6">I modelled high-frequency market-state sequences spanning 1,000 steps. The solution combined Transformer pretraining, median–IQR scaling, and a streaming inference pipeline optimised for a single CPU core.</p>
      </div>
      <div className={styles.approach} aria-label="My competition approach">
        {competition.approach.map((step, index) => <article data-approach key={step.title} className={styles.approachRow}>
          <span className={styles.stepNumber}>0{index + 1}</span>
          <h4 className="h4">{step.title}</h4>
          <p className="p-l">{step.text}</p>
        </article>)}
      </div>
      <div className={styles.bottom}>
        <p className={styles.tools}>Transformer <span> / </span> Masked autoencoder <span> / </span> torch.compile <span> / </span> Numba</p>
        <div className={styles.actions}><ButtonLink target href={competition.cv} label="VIEW CV" /><ButtonLink target href={competition.platform} label="COMPETITION PLATFORM" /></div>
      </div>
    </section>
  </>;
}
