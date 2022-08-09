import React, { useEffect } from 'react';
import { useDeleteMovieMutation } from '../../../core/store/movies/api';
import { I18Y, LOCALE } from '../../../core/i18y';
import { IDeleteMovieProps } from './interfaces';

import { Button } from '../../UI/Button';
import { Notification } from '../../UI/Notification';

import styles from './DeleteMovie.module.scss';

export const DeleteMovie: React.FC<IDeleteMovieProps> = ({ id, onSuccess }) => {
  const [deleteMovie, { isError, isLoading, isSuccess }] = useDeleteMovieMutation();

  useEffect(() => {
    if (isSuccess) {
      onSuccess(isSuccess);
    }
  }, [isSuccess]);

  const handleDelete = () => {
    deleteMovie(id);
  };

  return (
    <div className={styles.deleteMovie}>
      <h2 className={styles.title}>{I18Y[LOCALE].POPUP_TITLE_DELETE_MOVIE}</h2>
      <p>{I18Y[LOCALE].POPUP_TEXT_DELETE_MOVIE}</p>

      {isError && <Notification type='error'>{I18Y[LOCALE].ERROR_TEXT}</Notification>}

      <div className={styles.buttons}>
        <Button type='button' theme='default' onClick={handleDelete}>
          {I18Y[LOCALE].BUTTON_CONFIRM}
        </Button>
      </div>
    </div>
  );
};
