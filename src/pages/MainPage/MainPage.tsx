import React, { useEffect, useState } from 'react';
import { I18Y, LOCALE } from '../../core/i18y';
import { useLazyGetMoviesQuery } from '../../core/store/movies/api';
import { ErrorBoundary } from '../../components/UI/ErrorBoundary';
import { Layout } from '../../components/Layout';
import { MovieList } from '../../components/Movie/MovieList';
import { FilterByTags } from '../../components/FilterByTags';
import { Sort } from '../../components/Sort';
import { Loader } from '../../components/UI/Loader';

import styles from './MainPage.module.scss';

const MainPage = () => {
  const [sorting, setSorting] = useState('release_date');
  const [tag, setTag] = useState('');
  const [movies, setMovies] = useState([]);
  const [getMovies, { data: filteredMovies = [], isLoading }] = useLazyGetMoviesQuery();

  useEffect(() => {
    if (filteredMovies.length) {
      setMovies(filteredMovies);
    }
  }, [filteredMovies]);

  useEffect(() => {
    const filter = tag !== I18Y[LOCALE].FILTER_ALL_TAG_CAPTION ? [tag] : [];
    const sort = {
      sortBy: sorting,
      sortOrder: 'desc',
    };

    getMovies({
      filter,
      ...sort,
    });
  }, [tag, sorting]);

  const genresForFilter = ['Fantasy', 'Comedy', 'Family', 'Drama'];

  const optionsForSort = {
    release_date: I18Y[LOCALE].RELEASE_DATE,
    vote_average: I18Y[LOCALE].RATING,
  };

  const handleFilter = (item: string) => {
    setTag(item);
  };

  return (
    <Layout>
      <div className={styles.filterPanel}>
        <FilterByTags options={genresForFilter} onClick={handleFilter} />
        <Sort
          caption={I18Y[LOCALE].SORT_BY_CAPTION}
          id='sorting-movies'
          name='sorting-movies'
          value={sorting}
          options={optionsForSort}
          onChange={setSorting}
          className={styles.sort}
        />
      </div>

      {isLoading ? (
        <Loader className={styles.loader} />
      ) : (
        <ErrorBoundary>
          <MovieList movies={movies} />
        </ErrorBoundary>
      )}
    </Layout>
  );
};

export default MainPage;
