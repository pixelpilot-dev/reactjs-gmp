import React, { useState } from 'react';
import { I18Y, LOCALE } from '../../../core/i18y';
import { NOTIFICATION_TYPES } from '../../../core/constants';
import { IMovieProps } from '../../../core/types/IMovieProps';
import { IMovieListProps } from './interfaces';
import { IPromoNotificationProps } from '../../UI/PromoNotification/interfaces';
import { TNotificationType } from '../../../core/types/TNotificationType';

import useToggleModal from '../../../hooks/useToggleModal';

import { MovieCard } from '../MovieCard';
import { Modal } from '../../UI/Modal';
import { EditMovie } from '../EditMovie';
import { DeleteMovie } from '../DeleteMovie';
import { PromoNotification } from '../../UI/PromoNotification';

import styles from './MovieList.module.scss';

export const MovieList: React.FC<IMovieListProps> = ({ movies }) => {
  const [movieEditing, setMovieEditing] = useState(null);
  const [movieDeleting, setMovieDeleting] = useState(null);
  const [notification, setNotification] = useState<IPromoNotificationProps>({
    title: '',
    message: '',
    type: NOTIFICATION_TYPES.SUCCESS as TNotificationType,
  });
  const { isOpenModal: isOpenEditModal, onToggleModal: onToggleEditModal } = useToggleModal();
  const { isOpenModal: isOpenDeleteModal, onToggleModal: onToggleDeleteModal } = useToggleModal();
  const { isOpenModal: isOpenSuccessModal, onToggleModal: onToggleSuccessModal } = useToggleModal();

  const handlerEditMovie = (id: string) => {
    setMovieEditing(id);
    onToggleEditModal();
  };

  const handlerDeleteMovie = (id: string) => {
    setMovieDeleting(id);
    onToggleDeleteModal();
  };

  const onEditSuccess = (state: boolean) => {
    if (!state) {
      return;
    }

    setNotification({
      title: I18Y[LOCALE].NOTIFICATION_TITLE_SUCCESS,
      message: I18Y[LOCALE].NOTIFICATION_MESSAGE_SUCCESS_FOR_EDIT_MOVIE,
      type: NOTIFICATION_TYPES.SUCCESS as TNotificationType,
    });
    onToggleEditModal();
    onToggleSuccessModal();
  };

  const onDeleteSuccess = (state: boolean) => {
    if (!state) {
      return;
    }

    setNotification({
      title: I18Y[LOCALE].NOTIFICATION_TITLE_SUCCESS,
      message: I18Y[LOCALE].NOTIFICATION_MESSAGE_SUCCESS_FOR_DELETE_MOVIE,
      type: NOTIFICATION_TYPES.SUCCESS as TNotificationType,
    });
    onToggleDeleteModal();
    onToggleSuccessModal();
  };

  const renderCard = (movie: IMovieProps) => {
    return (
      <MovieCard
        key={movie.id}
        movie={movie}
        className={styles.card}
        onEdit={handlerEditMovie}
        onDelete={handlerDeleteMovie}
      />
    );
  };
  const renderList = (items: IMovieProps[]) => items.map(renderCard);

  return (
    <>
      <div className={styles.list}>{renderList(movies)}</div>

      <Modal isOpen={isOpenEditModal} onClose={onToggleEditModal}>
        <EditMovie id={movieEditing} onSuccess={onEditSuccess} />
      </Modal>

      <Modal isOpen={isOpenDeleteModal} onClose={onToggleDeleteModal}>
        <DeleteMovie id={movieDeleting} onSuccess={onDeleteSuccess} />
      </Modal>

      <Modal isOpen={isOpenSuccessModal} onClose={onToggleSuccessModal}>
        <PromoNotification {...notification} />
      </Modal>
    </>
  );
};
