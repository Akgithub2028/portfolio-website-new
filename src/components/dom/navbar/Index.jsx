import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import MenuButton from '@src/components/dom/navbar/components/MenuButton';
import MenuLinks from '@src/components/dom/navbar/components/MenuLinks';
import clsx from 'clsx';
import styles from '@src/components/dom/navbar/styles/index.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';

function Navbar() {
  const isMobile = useIsMobile();

  return (
    <>
      <MenuLinks />

      <header className={styles.root} role="banner">
        <div className={styles.innerHeader}>
          <span aria-hidden="true" />

          <div className={styles.rightContainer}>
            {!isMobile && <ButtonLink href="mailto:aayaannkausar@gmail.com" label="GET IN TOUCH" />}
            <MenuButton />
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
