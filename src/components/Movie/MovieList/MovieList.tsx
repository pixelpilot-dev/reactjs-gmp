import React, { useState } from 'react';
import { IMovieProps } from '../../../core/types/IMovieProps';
import { IMovieListProps } from './interfaces';

import useToggleModal from '../../../hooks/useToggleModal';

import { MovieCard } from '../MovieCard';
import { Modal } from '../../UI/Modal';
import { EditMovie } from '../EditMovie';
import { DeleteMovie } from '../DeleteMovie';

import styles from './MovieList.module.scss';

export const MovieList: React.FC<IMovieListProps> = ({ movies }) => {
  const [movieEditing, setMovieEditing] = useState(null);
  const [movieDeleting, setMovieDeleting] = useState(null);
  const { isOpenModal: isOpenEditModal, onToggleModal: onToggleEditModal } = useToggleModal();
  const { isOpenModal: isOpenDeleteModal, onToggleModal: onToggleDeleteModal } = useToggleModal();

  const handlerEditMovie = (id: string) => {
    setMovieEditing(id);
    onToggleEditModal();
  };

  const handlerDeleteMovie = (id: string) => {
    setMovieDeleting(id);
    onToggleDeleteModal();
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
        <EditMovie movieId={movieEditing} />
      </Modal>

      <Modal isOpen={isOpenDeleteModal} onClose={onToggleDeleteModal}>
        <DeleteMovie id={movieDeleting} />
      </Modal>
    </>
  );
};
