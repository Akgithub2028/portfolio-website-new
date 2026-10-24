import TextOpacity from '@src/components/animationComponents/textOpacity/Index';
import clsx from 'clsx';
import styles from '@src/pages/components/quote/styles/quote.module.scss';
import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';
import quote from '@src/constants/quote';

function Quote() {
  const [isLoading] = useStore(useShallow((state) => [state.isLoading]));

  const rootRef = useRef();
  const textRef = useRef();

  return (
    <section id="homepage-quote" ref={rootRef} className={clsx(styles.root, 'layout-block-inner')} aria-label="Research inspiration">
      <figure ref={textRef} className={styles.text}>
        {!isLoading && (
          <>
            <blockquote cite={quote.source} className={clsx(styles.quotation, 'h3')}>
              <TextOpacity trigger={rootRef.current}>{quote.text}</TextOpacity>
            </blockquote>
            <figcaption className={clsx(styles.attribution, 'p-l')}>
              <a href={quote.source} target="_blank" rel="noopener noreferrer">— {quote.author} · {quote.publication}, {quote.year} ↗</a>
            </figcaption>
          </>
        )}
      </figure>
    </section>
  );
}

export default Quote;
