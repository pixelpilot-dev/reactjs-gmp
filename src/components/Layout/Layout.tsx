import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Wrapper } from '../Wrapper';
import { Header } from '../Header';
import { Footer } from '../Footer';

import styles from './Layout.module.scss';

export const Layout: React.FC = () => (
  <>
    <Header />
    <main className={styles.main}>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </main>
    <Footer />
  </>
);
