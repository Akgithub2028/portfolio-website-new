import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import { toolkit, cloudExploration } from '@src/constants/expertise';
import clsx from 'clsx';
import styles from '@src/pages/about/components/toolkit/styles/toolkit.module.scss';

export default function Toolkit() {
  return <section id="technical-toolkit" aria-labelledby="toolkit-title" className={clsx(styles.root, 'layout-block-inner')}>
    <div className={styles.heading}>
      <AppearTitle><h2 id="toolkit-title" className="h2">Technical toolkit</h2></AppearTitle>
      <p className="h6">Tools I use across model training, agent workflows, speech systems, and evaluation.</p>
    </div>
    <dl className={styles.groups}>
      {toolkit.map(group => <div key={group.title} className={styles.group}>
        <dt><AppearTitle><h3 className="h5">{group.title}</h3></AppearTitle></dt>
        <dd><AppearTitle><p className="p-l">{group.tools.join(' · ')}</p></AppearTitle></dd>
      </div>)}
    </dl>
    <p className={clsx(styles.exploring, 'p-l')}>Also exploring {cloudExploration.slice(0, -1).join(', ')}, and {cloudExploration.at(-1)}.</p>
  </section>;
}
