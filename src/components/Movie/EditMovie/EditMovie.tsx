import React from 'react';
import { I18Y, LOCALE } from '../../../core/i18y';
import { useGetMovieByIdQuery } from '../../../core/store/movies/api';
import { IEditMovieProps } from './interfaces';
import { IMovieProps } from '../../../core/types/IMovieProps';
import { MovieForm } from '../MovieForm';

import styles from './EditMovie.module.scss';

export const EditMovie: React.FC<IEditMovieProps> = ({ id, onSuccess }) => {
  const { data = {}, isLoading } = useGetMovieByIdQuery(id);

  return (
    <div className={styles.editMovie}>
      <h2 className={styles.title}>{I18Y[LOCALE].POPUP_TITLE_EDIT_MOVIE}</h2>
      <MovieForm movie={data as IMovieProps} onSuccess={onSuccess} />
    </div>
  );
};
