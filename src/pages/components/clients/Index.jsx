import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import Badge from '@src/pages/components/clients/components/Badge';
import clsx from 'clsx';
import { gsap } from 'gsap';
import styles from '@src/pages/components/clients/styles/clients.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';
import { useWindowSize } from '@darkroom.engineering/hamo';

function Clients() {
  const isMobile = useIsMobile();
  const textRefs = useRef([]);
  const badgeRefs = useRef([]);
  const rootRef = useRef();
  const windowSize = useWindowSize();

  const setupScrollAnimation = () => {
    const ctx = gsap.context(() => {
      if (!isMobile) {
        const vw = (coef) => windowSize.height * (coef / 100);
        textRefs.current.forEach((textRef, index) => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: rootRef.current,
                start: index === 0 ? `top-=${vw(35)}` : `top+=${vw(35 + 5.5555556 * index)}`,
                end: index === 0 ? `bottom-=${vw(35 + 5.5555556 * index)}` : `bottom+=${vw(25)}`,
                toggleActions: 'play none reverse none',
                scrub: true,
                scroller: document?.querySelector('main'),
                invalidateOnRefresh: true,
              },
            })
            .to(textRef, {
              top: `${10 + 30 * index + 5.5555556 * index}vw`,
            });
        });
      }
    });

    return ctx;
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = setupScrollAnimation(textRefs, rootRef, windowSize, isMobile);
    return () => ctx.kill();
  }, [isMobile, windowSize.height]);

  return (
    <section ref={rootRef} className={clsx(styles.root, 'layout-grid-inner')}>
      <h1 className={clsx(styles.sectionTitle, 'h1')}>
        <AppearByWords>Research directions</AppearByWords>
      </h1>
      {isMobile ? <div className={styles.mobileEmpty} /> : null}
      {isMobile ? (
        <div className={styles.mobileCount}>
          <AppearTitle>01</AppearTitle>
        </div>
      ) : null}
      <div
        ref={(el) => {
          badgeRefs.current[0] = el;
        }}
        className={styles.first}
      >
        <Badge name="models" />
      </div>
      {isMobile ? <div className={styles.mobileEmptySecond} /> : null}
      {isMobile ? (
        <div className={styles.textMobile}>
          <AppearTitle>
            <h4 className={clsx('h4', 'bold')}>Language models</h4>
          </AppearTitle>
          <AppearTitle>
            <div className="p-l">{"I study what changes during fine-tuning:"}</div>
<div className="p-l">{"capabilities gained, knowledge retained,"}</div>
<div className="p-l">{"and performance lost."}</div>
<div className="p-l">{"My work combines QLoRA adaptation,"}</div>
<div className="p-l">{"activation-drift analysis, and"}</div>
<div className="p-l">{"controlled benchmark evaluation."}</div>
<div className="p-l">{"Explore SFP and the QLoRA study."}</div>
          </AppearTitle>
        </div>
      ) : null}
      {!isMobile ? (
        <>
          <div className={styles.firstEmpty} />
          <div
            ref={(el) => {
              textRefs.current[0] = el;
            }}
            className={styles.firstText}
          >
            <AppearTitle>
              <h6 className="h6">01</h6>
            </AppearTitle>
            <AppearTitle>
              <h4 className={clsx('h4', 'bold', styles.title)}>Language models</h4>
            </AppearTitle>
            <AppearTitle>
              <div className="p-l">{"I study what changes during fine-tuning:"}</div>
<div className="p-l">{"capabilities gained, knowledge retained,"}</div>
<div className="p-l">{"and performance lost."}</div>
<div className="p-l">{"My work combines QLoRA adaptation,"}</div>
<div className="p-l">{"activation-drift analysis, and"}</div>
<div className="p-l">{"controlled benchmark evaluation."}</div>
<div className="p-l">{"Explore SFP and the QLoRA study."}</div>
            </AppearTitle>
          </div>
        </>
      ) : null}
      {!isMobile ? <div className={styles.secondEmpty} /> : null}
      {isMobile ? <div className={styles.mobileEmpty} /> : null}
      {isMobile ? (
        <div className={styles.mobileCount}>
          <AppearTitle>02</AppearTitle>
        </div>
      ) : null}
      <div
        ref={(el) => {
          badgeRefs.current[1] = el;
        }}
        className={styles.second}
      >
        <Badge name="agents" />
      </div>
      {isMobile ? <div className={styles.mobileEmptySecond} /> : null}
      {isMobile ? (
        <div className={styles.textMobile}>
          <AppearTitle>
            <h4 className={clsx('h4', 'bold')}>Agentic systems</h4>
          </AppearTitle>
          <AppearTitle>
            <div className="p-l">{"NexusAgent coordinates retrieval,"}</div>
<div className="p-l">{"guarded SQL, and evidence review"}</div>
<div className="p-l">{"through LangGraph workflows."}</div>
<div className="p-l">{"I build agents with explicit tool"}</div>
<div className="p-l">{"permissions and traceable decisions,"}</div>
<div className="p-l">{"and evaluate them against defined"}</div>
<div className="p-l">{"tasks and failure cases."}</div>
          </AppearTitle>
        </div>
      ) : null}
      {!isMobile ? (
        <>
          <div
            ref={(el) => {
              textRefs.current[1] = el;
            }}
            className={styles.secondText}
          >
            <AppearTitle>
              <h6 className="h6">02</h6>
            </AppearTitle>
            <AppearTitle>
              <h4 className={clsx('h4', 'bold', styles.title)}>Agentic systems</h4>
            </AppearTitle>
            <AppearTitle>
              <div className="p-l">{"NexusAgent coordinates retrieval,"}</div>
<div className="p-l">{"guarded SQL, and evidence review"}</div>
<div className="p-l">{"through LangGraph workflows."}</div>
<div className="p-l">{"I build agents with explicit tool"}</div>
<div className="p-l">{"permissions and traceable decisions,"}</div>
<div className="p-l">{"and evaluate them against defined"}</div>
<div className="p-l">{"tasks and failure cases."}</div>
            </AppearTitle>
          </div>
          <div className={styles.fourthEmpty} />
        </>
      ) : null}
      {isMobile ? <div className={styles.mobileEmpty} /> : null}
      {isMobile ? (
        <div className={styles.mobileCount}>
          <AppearTitle>03</AppearTitle>
        </div>
      ) : null}
      <div
        ref={(el) => {
          badgeRefs.current[2] = el;
        }}
        className={styles.third}
      >
        <Badge name="discovery" />
      </div>
      {isMobile ? <div className={styles.mobileEmptySecond} /> : null}
      {isMobile ? (
        <div className={styles.textMobile}>
          <AppearTitle>
            <h4 className={clsx('h4', 'bold')}>Scientific discovery</h4>
          </AppearTitle>
          <AppearTitle>
            <div className="p-l">{"Nova turns a research question into"}</div>
<div className="p-l">{"literature review, competing hypotheses,"}</div>
<div className="p-l">{"and iterative critique."}</div>
<div className="p-l">{"I’m interested in how agents can help"}</div>
<div className="p-l">{"scientists explore ideas and design"}</div>
<div className="p-l">{"experiments, with human judgement"}</div>
<div className="p-l">{"guiding what deserves testing."}</div>
          </AppearTitle>
        </div>
      ) : null}
      {!isMobile ? (
        <>
          <div className={styles.fifthEmpty} />
          <div
            ref={(el) => {
              textRefs.current[2] = el;
            }}
            className={styles.thirdText}
          >
            <AppearTitle>
              <h6 className="h6">03</h6>
            </AppearTitle>
            <AppearTitle>
              <h4 className={clsx('h4', 'bold', styles.title)}>Scientific discovery</h4>
            </AppearTitle>
            <AppearTitle>
              <div className="p-l">{"Nova turns a research question into"}</div>
<div className="p-l">{"literature review, competing hypotheses,"}</div>
<div className="p-l">{"and iterative critique."}</div>
<div className="p-l">{"I’m interested in how agents can help"}</div>
<div className="p-l">{"scientists explore ideas and design"}</div>
<div className="p-l">{"experiments, with human judgement"}</div>
<div className="p-l">{"guiding what deserves testing."}</div>
            </AppearTitle>
          </div>
        </>
      ) : null}
    </section>
  );
}

export default Clients;
