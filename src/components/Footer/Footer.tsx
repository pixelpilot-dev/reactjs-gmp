import * as React from 'react';
import { Link } from 'react-router-dom';
import { LOCALE, I18Y } from '../../core/i18y';
import { Wrapper } from '../Wrapper';
import logo from '../../assets/images/netflixroulette.svg';

import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Wrapper className={styles.container}>
        <Link to='/' className={styles.logo}>
          <img src={logo} alt={I18Y[LOCALE].LOGOTYPE_ALT} />
        </Link>
      </Wrapper>
    </footer>
  );
};
