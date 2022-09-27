import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { LOCALE, I18Y } from '../../core/i18y';
import { NOTIFICATION_TYPES, QUERY_PARAMS_BY_MOVIES } from '../../core/constants';
import { IPromoNotificationProps } from '../UI/PromoNotification/interfaces';
import { TNotificationType } from '../../core/types/TNotificationType';

import useQueryParam from '../../hooks/useQueryParam';

import { Wrapper } from '../Wrapper';
import { Button } from '../UI/Button';
import { Search } from '../Search';
import { Icon } from '../UI/Icon';
import { Modal } from '../UI/Modal';
import { AddMovie } from '../Movie/AddMovie';
import { MovieDetails } from '../Movie/MovieDetails';
import { PromoNotification } from '../UI/PromoNotification';

import styles from './Header.module.scss';

import logo from '../../assets/images/netflixroulette.svg';
import bgCover from '../../assets/images/movie-bg.jpg';
import plusIcon from '../../assets/sprites/plus.svg';
import searchIcon from '../../assets/sprites/search.svg';

export const Header: React.FC = () => {
  const [idMovieDetails, setIdMovieDetails] = useQueryParam(QUERY_PARAMS_BY_MOVIES.MOVIE);
  const [isOpenModal, setStateModal] = useState(false);
  const [isOpenSuccessModal, setStateSuccessModal] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState<boolean>(true);
  const [notification, setNotification] = useState<IPromoNotificationProps>({
    title: '',
    message: '',
    type: NOTIFICATION_TYPES.SUCCESS as TNotificationType,
  });

  useEffect(() => {
    if (idMovieDetails) {
      setIdMovieDetails(idMovieDetails);
      setIsShowSearch(false);
    }
  }, [idMovieDetails]);

  const handlerShowSearch = () => {
    setIsShowSearch(true);
    setIdMovieDetails(null);
  };

  const onAddMovieSuccess = (state: boolean) => {
    if (!state) {
      return;
    }

    setNotification({
      title: I18Y[LOCALE].NOTIFICATION_TITLE_SUCCESS,
      message: I18Y[LOCALE].NOTIFICATION_MESSAGE_SUCCESS_FOR_ADD_MOVIE,
      type: NOTIFICATION_TYPES.SUCCESS as TNotificationType,
    });
    setStateModal(false);
    setStateSuccessModal(true);
  };

  const modalAddMovie = isOpenModal ? (
    <Modal isOpen={isOpenModal} onClose={setStateModal}>
      <AddMovie onSuccess={onAddMovieSuccess} />
    </Modal>
  ) : null;

  const modalSuccessAddMovie = isOpenSuccessModal ? (
    <Modal isOpen={isOpenSuccessModal} onClose={setStateSuccessModal}>
      <PromoNotification {...notification} />
    </Modal>
  ) : null;

  return (
    <header className={cn(styles.header, { [styles.isShowMovie]: !isShowSearch })}>
      <div className={styles.cover}>
        <span style={{ backgroundImage: `url(${bgCover})` }} className={styles.img} />
      </div>
      <Wrapper className={styles.container}>
        <div className={styles.topPanel}>
          <Link to='/' className={styles.logo}>
            <img src={logo} alt={I18Y[LOCALE].LOGOTYPE_ALT} />
          </Link>

          <Button
            type='button'
            theme='info'
            className={styles.addMovieButton}
            onClick={() => setStateModal(true)}
          >
            <Icon icon={plusIcon} /> {I18Y[LOCALE].BUTTON_ADD_MOVIE}
          </Button>

          {modalAddMovie}
          {modalSuccessAddMovie}

          <Button
            type='button'
            theme='invisible'
            className={styles.showSearchButton}
            onClick={handlerShowSearch}
          >
            <Icon icon={searchIcon} />
          </Button>
        </div>

        {isShowSearch && <Search className={styles.search} />}
        {idMovieDetails && <MovieDetails id={idMovieDetails} />}
      </Wrapper>
    </header>
  );
};
