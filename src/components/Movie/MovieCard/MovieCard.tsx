/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import cn from 'classnames';
import { QUERY_PARAMS_BY_MOVIES, NOTIFICATION_TYPES } from '../../../core/constants';
import { I18Y, LOCALE } from '../../../core/i18y';
import { IMovieCardProps } from './interfaces';
import { TNotificationType } from '../../../core/types/TNotificationType';
import { getYear } from '../../../core/utils/date';
import { replaceNotFoundImage } from '../../../core/utils/replaceNotFoundImage';
import useQueryParam from '../../../hooks/useQueryParam';

import { MovieContextMenu } from '../MovieContextMenu';
import { Modal } from '../../UI/Modal';
import { EditMovie } from '../EditMovie';
import { DeleteMovie } from '../DeleteMovie';

import styles from './MovieCard.module.scss';

export const MovieCard: React.FC<IMovieCardProps> = ({ movie, className, onSuccessModal }) => {
  const [, setMovieQuery] = useQueryParam(QUERY_PARAMS_BY_MOVIES.MOVIE);
  const [movieEditing, setMovieEditing] = useState(null);
  const [movieDeleting, setMovieDeleting] = useState(null);
  const [isOpenEditModal, setStateEditModal] = useState(false);
  const [isOpenDeleteModal, setStateDeleteModal] = useState(false);

  const onEdit = (id: string | number) => {
    setStateEditModal(true);
    setMovieEditing(id);
  };

  const onDelete = (id: string | number) => {
    setStateDeleteModal(true);
    setMovieDeleting(id);
  };

  const onEditSuccess = (state: boolean) => {
    if (!state) {
      return;
    }

    const notification = {
      title: I18Y[LOCALE].NOTIFICATION_TITLE_SUCCESS,
      message: I18Y[LOCALE].NOTIFICATION_MESSAGE_SUCCESS_FOR_EDIT_MOVIE,
      type: NOTIFICATION_TYPES.SUCCESS as TNotificationType,
    };
    setStateEditModal(false);
    onSuccessModal(notification);
  };

  const onDeleteSuccess = (state: boolean) => {
    if (!state) {
      return;
    }

    const notification = {
      title: I18Y[LOCALE].NOTIFICATION_TITLE_SUCCESS,
      message: I18Y[LOCALE].NOTIFICATION_MESSAGE_SUCCESS_FOR_DELETE_MOVIE,
      type: NOTIFICATION_TYPES.SUCCESS as TNotificationType,
    };
    setStateDeleteModal(false);
    onSuccessModal(notification);
  };

  const handlerViewDetails = (
    event: React.MouseEvent<HTMLDivElement>,
    idMovie: string | number,
  ) => {
    event.preventDefault();

    setMovieQuery(idMovie);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderItem = (item: string) => {
    return (
      <span data-testid='genre' key={item} className={styles.genre}>
        {item}
      </span>
    );
  };

  const renderList = (items: string[]) => items.map(renderItem);

  const modalEdit = isOpenEditModal ? (
    <Modal isOpen={isOpenEditModal} onClose={setStateEditModal}>
      <EditMovie id={movieEditing} onSuccess={onEditSuccess} />
    </Modal>
  ) : null;

  const modalDelete = isOpenDeleteModal ? (
    <Modal isOpen={isOpenDeleteModal} onClose={setStateDeleteModal}>
      <DeleteMovie id={movieDeleting} onSuccess={onDeleteSuccess} />
    </Modal>
  ) : null;

  const { id, title, poster_path, genres, release_date } = movie;

  return (
    <div data-testid='movieCard' className={cn(styles.card, className)}>
      <MovieContextMenu className={styles.menuContext}>
        <button type='button' className={styles.actionBtn} onClick={() => onEdit(id)}>
          {I18Y[LOCALE].BUTTON_EDIT}
        </button>
        <button type='button' className={styles.actionBtn} onClick={() => onDelete(id)}>
          {I18Y[LOCALE].BUTTON_DELETE}
        </button>
      </MovieContextMenu>

      <div
        data-testid='showDetailsOnPicture'
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
          data-testid='showDetailsOnTitle'
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

      {modalEdit}
      {modalDelete}
    </div>
  );
};
