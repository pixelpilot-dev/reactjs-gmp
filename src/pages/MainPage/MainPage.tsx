import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QUERY_PARAMS_BY_MOVIES } from '../../core/constants';
import { I18Y, LOCALE } from '../../core/i18y';
import { useLazyGetMoviesQuery } from '../../core/store/movies/api';
import useQueryParam from '../../hooks/useQueryParam';
import { ErrorBoundary } from '../../components/UI/ErrorBoundary';
import { MovieList } from '../../components/Movie/MovieList';
import { FilterByTags } from '../../components/FilterByTags';
import { Sort } from '../../components/Sort';
import { Loader } from '../../components/UI/Loader';

import styles from './MainPage.module.scss';

const MainPage = () => {
  const sortByDefault = 'vote_average';
  const genresForFilter = ['Fantasy', 'Comedy', 'Family', 'Drama'];
  const optionsForSort = {
    release_date: I18Y[LOCALE].RELEASE_DATE,
    vote_average: I18Y[LOCALE].RATING,
  };
  const { searchQuery } = useParams();
  const [sorting, setSorting] = useQueryParam(QUERY_PARAMS_BY_MOVIES.SORT_BY);
  const [genre, setGenre] = useQueryParam(QUERY_PARAMS_BY_MOVIES.GENRE);
  const [movies, setMovies] = useState([]);
  const [getMovies, { data: filteredMovies = [], isLoading }] = useLazyGetMoviesQuery();

  useEffect(() => {
    if (filteredMovies.length) {
      setMovies(filteredMovies);
    }
  }, [filteredMovies]);

  useEffect(() => {
    let search = {};
    const filter = genre !== I18Y[LOCALE].FILTER_ALL_TAG_CAPTION ? [genre] : [];
    const sort = {
      sortBy: !sorting ? sortByDefault : sorting,
      sortOrder: 'desc',
    };

    if (searchQuery) {
      search = {
        search: searchQuery || null,
        searchBy: 'title',
      };
    }

    getMovies({
      filter,
      ...sort,
      ...search,
    });
  }, [genre, sorting, searchQuery]);

  return (
    <>
      <div className={styles.filterPanel}>
        <FilterByTags options={genresForFilter} />
        <Sort
          caption={I18Y[LOCALE].SORT_BY_CAPTION}
          id='sorting-movies'
          name='sorting-movies'
          value={sortByDefault}
          options={optionsForSort}
          className={styles.sort}
        />
      </div>

      {isLoading ? (
        <Loader className={styles.loader} />
      ) : (
        <ErrorBoundary>
          {movies.length > 0 && <MovieList movies={movies} />}
          {movies.length < 1 && <p>{I18Y[LOCALE].NO_RESULT_SEARCH}</p>}
        </ErrorBoundary>
      )}
    </>
  );
};

export default MainPage;
