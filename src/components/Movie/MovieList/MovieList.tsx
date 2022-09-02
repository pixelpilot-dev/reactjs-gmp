import React, { useState } from 'react';
import { NOTIFICATION_TYPES } from '../../../core/constants';
import { IMovieProps } from '../../../core/types/IMovieProps';
import { IMovieListProps } from './interfaces';
import { TNotificationType } from '../../../core/types/TNotificationType';
import { IPromoNotificationProps } from '../../UI/PromoNotification/interfaces';
import { PromoNotification } from '../../UI/PromoNotification';

import { Modal } from '../../UI/Modal';
import { MovieCard } from '../MovieCard';

import styles from './MovieList.module.scss';

export const MovieList: React.FC<IMovieListProps> = ({ movies }) => {
  const [notification, setNotification] = useState<IPromoNotificationProps>({
    title: '',
    message: '',
    type: NOTIFICATION_TYPES.SUCCESS as TNotificationType,
  });
  const [isOpenSuccessModal, setStateSuccessModal] = useState(false);

  const onSuccessModal = (notify: IPromoNotificationProps) => {
    setNotification(notify);
    setStateSuccessModal(true);
  };

  const renderCard = (movie: IMovieProps) => {
    return (
      <MovieCard
        key={movie.id}
        movie={movie}
        className={styles.cardItem}
        onSuccessModal={onSuccessModal}
      />
    );
  };
  const renderList = (items: IMovieProps[]) => items.map(renderCard);

  const modalSuccess = isOpenSuccessModal ? (
    <Modal isOpen={isOpenSuccessModal} onClose={setStateSuccessModal}>
      <PromoNotification {...notification} />
    </Modal>
  ) : null;

  return (
    <>
      <div className={styles.list}>{renderList(movies)}</div>
      {modalSuccess}
    </>
  );
};
