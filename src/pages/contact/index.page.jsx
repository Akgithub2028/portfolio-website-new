import CustomHead from '@src/components/dom/CustomHead';
import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import styles from '@src/pages/about/components/overview/styles/overview.module.scss';
import titleStyles from '@src/pages/projects/projects.module.scss';
import clsx from 'clsx';
export default function Contact(){return <>
 <CustomHead title="Aayaann Kausar — Contact" description="Contact Aayaann Kausar for AI engineering, independent research, or technical collaboration."/>
 <section className={clsx(titleStyles.titleContainer,'layout-block-inner')}><h1 className={clsx(titleStyles.title,'h1')}>Let’s talk.</h1></section>
 <section className={clsx(styles.root,'layout-grid-inner')}>
 <div className={styles.title}><AppearTitle><h3 className="h3">An idea to explore.</h3><h3 className="h3">A system to build.</h3><h3 className="h3">Let’s talk it through.</h3></AppearTitle></div>
 <div className={clsx(styles.text,'p-l',styles.myStory)}><AppearTitle><span>Get in touch</span></AppearTitle></div>
 <div className={styles.desc}><AppearTitle><h6 className="h6"><a href="mailto:aayaannkausar@gmail.com">aayaannkausar@gmail.com ↗</a></h6><h6 className="h6">IIT Kharagpur · India</h6><h6 className={clsx(styles.paddingTop,'h6')}>Tell me what you’re working on, the question you’re asking,</h6><h6 className="h6">and where my experience could contribute.</h6></AppearTitle><div style={{display:'flex',flexWrap:'wrap',gap:'1.5rem',marginTop:'2rem'}}><ButtonLink href="mailto:aayaannkausar@gmail.com" label="EMAIL ME"/><ButtonLink target href="/cv/Aayaann-Kausar-CV.pdf" label="VIEW CV"/></div></div>
 </section></>;}
