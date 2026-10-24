import SplitType from 'split-type';
import gsap from 'gsap';
import styles from '@src/components/animationComponents/textOpacity/textOpacity.module.scss';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';

function TextOpacity({children, trigger}) {
  const containerRef = useRef();
  useIsomorphicLayoutEffect(() => {
    const element = containerRef.current;
    let split;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      split = new SplitType(element, {types: 'words'});
      const words = split.words;
      // Build the scatter once, then scrub this exact animation forwards and backwards.
      // Reusing its playhead preserves every word's path, rotation, depth and stagger.
      const assembly = gsap.timeline({paused: true})
        .fromTo(words, {z: () => gsap.utils.random(500, 950), opacity: 0, xPercent: () => gsap.utils.random(-100, 100), yPercent: () => gsap.utils.random(-10, 10), rotationX: () => gsap.utils.random(-90, 90)},
          {z: 0, opacity: 1, xPercent: 0, yPercent: 0, rotationX: 0, duration: .65, ease: 'expo.out', stagger: {amount: .08, from: 'random'}}, 0);
      gsap.timeline({scrollTrigger: {trigger, start: 'top top', end: 'bottom bottom', scrub: true, scroller: document.querySelector('main'), invalidateOnRefresh: true}})
        .to(assembly, {time: assembly.duration(), duration: .44, ease: 'none'}, 0)
        // Leave the assembled quote readable before retracing the same motion on exit.
        .to(assembly, {time: 0, duration: .44, ease: 'none'}, .56);
      return () => {split?.revert(); split = null;};
    });
    return () => {media.revert(); split?.revert();};
  }, [trigger]);
  return <div ref={containerRef} className={styles.title}>{children}</div>;
}
export default TextOpacity;
