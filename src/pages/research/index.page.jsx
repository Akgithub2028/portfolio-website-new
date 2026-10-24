/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */

import CustomHead from '@src/components/dom/CustomHead';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { gsap } from 'gsap';
import allProjects from '@src/constants/projects';
const projects = allProjects.filter(project => project.kind === 'research');
import styles from '@src/pages/projects/projects.module.scss';
import interestsStyles from '@src/pages/about/components/toolkit/styles/toolkit.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';
import { useWindowSize } from '@darkroom.engineering/hamo';

const seo = {title:'Aayaann Kausar — Research',description:"Independent studies of continual learning, representation drift, and QLoRA adaptation, with methods, results, and evaluation limits.",keywords:['Aayaann Kausar','Continual learning','LLM fine-tuning','QLoRA','Representation drift']};

const interests = [
  {title: 'Autonomous Scientific Discovery', description: 'Literature-grounded hypothesis generation, experimental design, and human–AI collaboration in scientific discovery.'},
  {title: 'Self-Improving Agents', description: 'Feedback-driven adaptation, agent memory, and tool use, evaluated for reliable improvement across tasks.'},
  {title: 'Large Language Models (LLMs)', description: 'Post-training and continual learning, particularly representation dynamics, knowledge retention, and robust generalisation.'},
  {title: 'Reinforcement Learning', description: 'Learning for reasoning and tool use, with a focus on credit assignment, reward design, and sample efficiency.'},
];

function Page() {
  const isMobile = useIsMobile();

  const windowSize = useWindowSize();
  const rootRef = useRef();
  const projectRefs = useRef([]);
  const [isLoading] = useStore(useShallow((state) => [state.isLoading]));

  const setupProjectAnimations = () => {
    const ctx = gsap.context(() => {
      if (!isLoading) {
        projectRefs.current.slice(0, -1).forEach((projectRef, index) => {
          gsap.set(projectRef, { yPercent: 0 });
          gsap
            .timeline({
              scrollTrigger: {
                id: `projectRef-${index}`,
                trigger: rootRef.current,
                start: `top+=${windowSize.height * index}`,
                end: () => `+=${Math.max(1, projectRefs.current.length - 2) * windowSize.height}`,
                scrub: true,
                scroller: document?.querySelector('main'),
                invalidateOnRefresh: true,
              },
            })
            .to(projectRef, {
              yPercent: 100,
              stagger: 1,
            });
        });
      }
    });

    return ctx;
  };

  useIsomorphicLayoutEffect(() => {
    const ctx = setupProjectAnimations();
    return () => ctx.kill();
  }, [isLoading, windowSize.height]);

  return (
    <>
      <CustomHead {...seo} />
      <section className={clsx(styles.titleContainer, 'layout-block-inner')}>
        <h1 className={clsx(styles.title, 'h1')}>Research</h1>
      </section>
      <section id="research-interests" aria-labelledby="research-interests-title" className={clsx(interestsStyles.root, 'layout-block-inner')}>
        <div className={interestsStyles.heading}>
          <AppearTitle><h2 id="research-interests-title" className="h2">Research interests</h2></AppearTitle>
          <p className="h6">Directions I am open to exploring through research and collaboration.</p>
        </div>
        <dl className={interestsStyles.groups}>
          {interests.map(interest => <div key={interest.title} className={interestsStyles.group}>
            <dt><AppearTitle><h3 className="h5">{interest.title}</h3></AppearTitle></dt>
            <dd><AppearTitle><p className="p-l">{interest.description}</p></AppearTitle></dd>
          </div>)}
        </dl>
      </section>
      <section className={clsx(styles.titleContainer, 'layout-block-inner')} style={{paddingTop: 0}}>
        <h2 id="selected-studies-title" className="h2">Selected studies</h2>
      </section>
      <section ref={rootRef} aria-labelledby="selected-studies-title" className={clsx(styles.root, 'layout-block-inner')}>
        <div className={styles.innerContainer}>
          {projects.map((project, index) => (
            <Link aria-label={`Go ${project.title}`} id={project.id} key={project.id} scroll={false} href={project.link} className={clsx(styles.card)}>
              <div
                style={
                  !isMobile
                    ? {
                        height: index === projects.length - 1 ? '200svh' : `${200 + 100 * index}svh`,
                        top: index === 0 ? '0px' : '-100svh',
                      }
                    : {
                        height: index === projects.length - 1 ? '100svh' : `${200 + 100 * index}svh`,
                        top: index === 0 ? '0px' : '-50svh',
                      }
                }
                className={styles.projectsWrap}
              >
                <div className={clsx(styles.container, 'layout-grid-inner')}>
                  <div className={styles.projectsDetails}>
                    <h6 className={clsx(styles.text, 'h6')}>{project.date}</h6>
                    <h3 className={clsx(styles.text, 'h3')}>{project.title}</h3>
                  </div>
                  <div className={styles.imageContainer}>
                    <Image priority={index === 0} sizes="100%" src={project.img} fill alt={project.title} />
                  </div>
                </div>
              </div>
              <div
                ref={(el) => {
                  projectRefs.current[index] = el;
                }}
                className={styles.canvas}
              >
                <Image
                  priority={index === 0}
                  sizes="100%"
                  className={index === 0 ? styles.firstCard : index === projects.length - 1 ? styles.lastCard : undefined}
                  src={project.img}
                  fill
                  alt={project.title}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Page;
