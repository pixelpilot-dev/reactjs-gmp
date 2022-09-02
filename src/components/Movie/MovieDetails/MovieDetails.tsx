import React from 'react';
import { useGetMovieByIdQuery } from '../../../core/store/movies/api';
import { getTime, getYear } from '../../../core/utils/date';
import { IMovieDetailsProps } from './interfaces';
import { IMovieProps } from '../../../core/types/IMovieProps';
import { replaceNotFoundImage } from '../../../core/utils/replaceNotFoundImage';

import styles from './MovieDetails.module.scss';
import { I18Y, LOCALE } from '../../../core/i18y';

export const MovieDetails: React.FC<IMovieDetailsProps> = ({ id }) => {
  const { data = {}, isLoading, isError } = useGetMovieByIdQuery(id);

  if (isLoading) return null;

  if (isError) return (
    <div className={styles.error}>
      <h2 className={styles.title}>{I18Y[LOCALE].ERROR_TEXT_FOR_API}</h2>
    </div>
  );

  const renderGenre = (item: string) => {
    return (
      <span key={item} className={styles.genre}>
        {item}
      </span>
    );
  };

  const renderGenresList = (items: string[]) => items.map(renderGenre);

  const { poster_path, title, vote_average, genres, release_date, runtime, overview } =
    data as IMovieProps;

  return (
    <section className={styles.details}>
      <div className={styles.picture}>
        <img
          src={poster_path}
          alt={title}
          onError={event => replaceNotFoundImage(event, styles.notFound)}
        />
      </div>

      <div className={styles.mainInfo}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.rate}>{vote_average}</span>
        </div>
        <div className={styles.genres}>{renderGenresList(genres)}</div>
        <div className={styles.options}>
          <span className={styles.optionsItem}>{getYear(release_date)}</span>
          <span className={styles.optionsItem}>{getTime(runtime)}</span>
        </div>
        <div className={styles.overview}>{overview}</div>
      </div>
    </section>
  );
};
