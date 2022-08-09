/* eslint-disable no-param-reassign */
import React from 'react';
import cn from 'classnames';
import { I18Y, LOCALE } from '../../../core/i18y';
import { IMovieCardProps } from './interfaces';
import { getYear } from '../../../core/utils/date';
import { replaceNotFoundImage } from '../../../core/utils/replaceNotFoundImage';
import { useActions } from '../../../hooks/redux';

import { MovieContextMenu } from '../MovieContextMenu';

import styles from './MovieCard.module.scss';

export const MovieCard: React.FC<IMovieCardProps> = ({ movie, className, onEdit, onDelete }) => {
  const { setMovieDetails } = useActions();
  const { id, title, poster_path, genres, release_date } = movie;

  const handlerViewDetails = (
    event: React.MouseEvent<HTMLDivElement>,
    idMovie: string | number,
  ) => {
    event.preventDefault();

    setMovieDetails(idMovie);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderItem = (item: string) => {
    return (
      <span key={item} className={styles.genre}>
        {item}
      </span>
    );
  };

  const renderList = (items: string[]) => items.map(renderItem);

  return (
    <div className={cn(styles.card, className)}>
      <MovieContextMenu className={styles.menuContext}>
        <button type='button' className={styles.actionBtn} onClick={() => onEdit(id)}>
          {I18Y[LOCALE].BUTTON_EDIT}
        </button>
        <button type='button' className={styles.actionBtn} onClick={() => onDelete(id)}>
          {I18Y[LOCALE].BUTTON_DELETE}
        </button>
      </MovieContextMenu>

      <div
        role='button'
        aria-hidden='true'
        className={styles.preview}
        onClick={event => handlerViewDetails(event, id)}
      >
        <img
          src={poster_path}
          alt={title}
          onError={event => replaceNotFoundImage(event, styles.notFound)}
        />
      </div>

      <div className={styles.info}>
        <div
          role='button'
          aria-hidden='true'
          className={styles.title}
          onClick={event => handlerViewDetails(event, id)}
        >
          {title}
        </div>
        <span className={styles.year}>{getYear(release_date)}</span>
      </div>
      <div className={styles.genres}>{renderList(genres)}</div>
    </div>
  );
};
