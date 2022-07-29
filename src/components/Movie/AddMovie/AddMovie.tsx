import React from 'react';
import { I18Y, LOCALE } from '../../../core/i18y';
import { IAddMovieProps } from './interfaces';
import { MovieForm } from '../MovieForm';

import styles from './AddMovie.module.scss';

export const AddMovie: React.FC<IAddMovieProps> = ({ onSuccess }) => {
  return (
    <div className={styles.addMovie}>
      <h2 className={styles.title}>{I18Y[LOCALE].POPUP_TITLE_ADD_MOVIE}</h2>
      <MovieForm onSuccess={onSuccess} />
    </div>
  );
};
