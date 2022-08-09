import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { IMovieFormProps } from './interfaces';
import { IMovieProps } from '../../../core/types/IMovieProps';

import { GENRES } from '../../../core/constants';

import { InputWithLabel } from '../../UI/Input';
import { DatePickerInputWithLabel } from '../../UI/DatePickerInput';
import { TextareaWithLabel } from '../../UI/Textarea';
import { SelectMultipleWithLabel } from '../../UI/SelectMultiple';
import { Button } from '../../UI/Button';

import styles from './MovieForm.module.scss';

export const MovieForm: React.FC<IMovieFormProps> = ({ movie }) => {
  const [movieData, setMovieData] = useState<IMovieProps>({
    title: '',
    tagline: '',
    vote_average: 0,
    vote_count: 0,
    release_date: '',
    poster_path: '',
    overview: '',
    budget: 0,
    revenue: 0,
    runtime: 0,
    genres: [],
    id: '',
  });

  useEffect(() => {
    if (movie) {
      setMovieData(movie);
    }
  }, [movie]);

  const handleInputChange = event => {
    const { target } = event;
    const { type, name } = target;
    const value = type === 'checkbox' ? target.checked : target.value;

    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  const handlerChangeDate = (date: Date) => {
    setMovieData({ ...movieData, release_date: date });
  };

  const handleSelectMultipleChange = () => {};

  const { tagline, title, genres, release_date, runtime, overview, vote_average } = movieData;

  return (
    <form className={styles.form}>
      <div className={styles.field}>
        <InputWithLabel
          type='text'
          name='title'
          value={title}
          label='Title'
          placeholder='Title'
          id='movie-title'
          forId='movie-title'
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.field}>
        <DatePickerInputWithLabel
          placeholder='Select date'
          id='movie-release-date'
          label='Release date'
          forId='movie-release-date'
          startDateCurrent={release_date}
          onChange={handlerChangeDate}
        />
      </div>
      <div className={styles.field}>
        <InputWithLabel
          type='text'
          name='tagline'
          value={tagline}
          label='Tagline'
          placeholder=''
          id='movie-tagline'
          forId='movie-tagline'
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.field}>
        <InputWithLabel
          type='text'
          name='rating'
          value={vote_average}
          label='Rating'
          placeholder='7.8'
          id='movie-rating'
          forId='movie-rating'
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.field}>
        <SelectMultipleWithLabel
          type='text'
          name='genre'
          value={genres}
          label='Genre'
          placeholder='Select genre'
          id='movie-genre'
          forId='movie-genre'
          onChange={handleSelectMultipleChange}
          options={GENRES}
        />
      </div>
      <div className={styles.field}>
        <InputWithLabel
          type='text'
          name='runtime'
          value={runtime}
          label='Runtime'
          placeholder='minutes'
          id='movie-runtime'
          forId='movie-runtime'
          onChange={handleInputChange}
        />
      </div>
      <div className={cn(styles.field, styles.full)}>
        <TextareaWithLabel
          name='overview'
          value={overview}
          label='Overview'
          placeholder='Movie description'
          id='movie-overview'
          forId='movie-overview'
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='reset' theme='ghost' className={styles.btn}>
          Reset
        </Button>

        <Button type='submit' theme='default' className={styles.btn}>
          Submit
        </Button>
      </div>
    </form>
  );
};
