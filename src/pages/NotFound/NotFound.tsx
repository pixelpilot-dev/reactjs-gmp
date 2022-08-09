import React from 'react';
import { Link } from 'react-router-dom';
import { I18Y, LOCALE } from '../../core/i18y';

import styles from './NotFound.module.scss';

import notFoundImage from '../../assets/images/404.gif';

const NotFound = () => {
  return (
    <div className={styles.notfound}>
      <img src={notFoundImage} alt={I18Y[LOCALE].PAGE_NOT_FOUND_TITLE} className={styles.image} />
      <h1 className={styles.title}>{I18Y[LOCALE].PAGE_NOT_FOUND_TITLE}</h1>
      <p className={styles.text}>
        {I18Y[LOCALE].PAGE_NOT_FOUND_TEXT}
        <Link to='/'>{I18Y[LOCALE].PAGE_NOT_FOUND_LINK_HOME}</Link>
      </p>
    </div>
  );
};

export default NotFound;
