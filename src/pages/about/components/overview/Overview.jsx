import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import clsx from 'clsx';
import styles from '@src/pages/about/components/overview/styles/overview.module.scss';

export default function Overview() {
  return <section className={clsx(styles.root, 'layout-grid-inner')}>
    <div className={styles.title}><AppearTitle>
      <h3 className="h3">AI engineering in practice.</h3>
      <h3 className="h3">Research through experiments.</h3>
    </AppearTitle></div>
    <div className={clsx(styles.text, 'p-l', styles.myStory)}><AppearTitle><span>Background &amp; experience</span></AppearTitle></div>
    <div className={styles.desc}><AppearTitle>
      <h6 className="h6">I’m a Chemical Engineering undergraduate at IIT Kharagpur,</h6>
      <h6 className="h6">pursuing a minor in Artificial Intelligence.</h6>
      <h6 className="h6">My independent work spans AI agents, language models,</h6>
      <h6 className="h6">multilingual speech, and time-series forecasting.</h6>
      <h6 className={clsx(styles.paddingTop, 'h6')}>I develop systems from model experiments through API</h6>
      <h6 className="h6">integration, evaluation, and deployment. Recent projects</h6>
      <h6 className="h6">include NexusAgent, Nova, and a seven-language voice translator.</h6>
      <h6 className={clsx(styles.paddingTop, 'h6')}>In research, I study continual learning, representation drift,</h6>
      <h6 className="h6">and the balance between model adaptation and retention.</h6>
      <h6 className={clsx(styles.paddingTop, 'h6')}>I placed 9th globally among more than 5,000 competitors</h6>
      <h6 className="h6">in Wunder Fund’s 2025 market forecasting challenge.</h6>
      <h6 className={clsx(styles.paddingTop, 'h6')}>Previously, as an Associate Member of Kharagpur Data</h6>
      <h6 className="h6">Analytics Group (KDAG), I led a nine-member team to</h6>
      <h6 className="h6">first place in its intra hackathon on multimodal medical AI.</h6>
      <h6 className="h6">Mar–Aug 2025 · IIT Kharagpur.</h6>
    </AppearTitle></div>
  </section>;
}
