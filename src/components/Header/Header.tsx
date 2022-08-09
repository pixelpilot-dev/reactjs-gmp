import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { LOCALE, I18Y } from '../../core/i18y';

import { useActions, useAppSelector } from '../../hooks/redux';
import useToggleModal from '../../hooks/useToggleModal';

import { Wrapper } from '../Wrapper';
import { Button } from '../UI/Button';
import { Search } from '../Search';
import { Icon } from '../UI/Icon';
import { Modal } from '../UI/Modal';
import { AddMovie } from '../Movie/AddMovie';
import { MovieDetails } from '../Movie/MovieDetails';

import styles from './Header.module.scss';

import logo from '../../assets/images/netflixroulette.svg';
import bgCover from '../../assets/images/movie-bg.jpg';
import plusIcon from '../../assets/sprites/plus.svg';
import searchIcon from '../../assets/sprites/search.svg';

export const Header: React.FC = () => {
  const { openedMovieId } = useAppSelector(state => state.movies);
  const { isOpenModal, onToggleModal } = useToggleModal();
  const [idMovieDetails, setIdMovieDetails] = useState(null);
  const [isShowSearch, setIsShowSearch] = useState<boolean>(true);
  const { setMovieDetails } = useActions();

  useEffect(() => {
    if (openedMovieId) {
      setIdMovieDetails(openedMovieId);
      setIsShowSearch(false);
    }
  }, [openedMovieId]);

  const handlerShowSearch = () => {
    setIsShowSearch(true);
    setIdMovieDetails(null);
    setMovieDetails(null);
  };

  return (
    <header className={cn(styles.header, { [styles.isShowMovie]: !isShowSearch })}>
      <div className={styles.cover}>
        <span style={{ backgroundImage: `url(${bgCover})` }} className={styles.img} />
      </div>
      <Wrapper className={styles.container}>
        <div className={styles.topPanel}>
          <a href='/' className={styles.logo}>
            <img src={logo} alt={I18Y[LOCALE].LOGOTYPE_ALT} />
          </a>

          <Button
            type='button'
            theme='info'
            className={styles.addMovieButton}
            onClick={() => onToggleModal()}
          >
            <Icon icon={plusIcon} /> {I18Y[LOCALE].BUTTON_ADD_MOVIE}
          </Button>

          <Modal isOpen={isOpenModal} onClose={onToggleModal}>
            <AddMovie />
          </Modal>

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
