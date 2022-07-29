import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Formik, Form } from 'formik';
import { useAddMovieMutation, useUpdateMovieMutation } from '../../../core/store/movies/api';
import { initialValues, validationSchema } from './config';
import { IMovieFormProps } from './interfaces';

import { GENRES } from '../../../core/constants';

import { InputWithLabel } from '../../UI/Input';
import { InputNumberWithLabel } from '../../UI/InputNumber';
import { DatePickerInputWithLabel } from '../../UI/DatePickerInput';
import { TextareaWithLabel } from '../../UI/Textarea';
import { SelectMultipleWithLabel } from '../../UI/SelectMultiple';
import { Button } from '../../UI/Button';

import styles from './MovieForm.module.scss';

export const MovieForm: React.FC<IMovieFormProps> = ({ movie, onSuccess }) => {
  const [addMovie, { error, isError, isSuccess }] = useAddMovieMutation();
  const [updateMovie, { error: errorUpdate, isError: isErrorUpdate, isSuccess: isSuccessUpdate }] =
    useUpdateMovieMutation();
  const [formData, setFormData] = useState(initialValues);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (movie) {
      setFormData(movie);
      setIsEdit(true);
    }
  }, [movie]);

  useEffect(() => {
    if (isSuccess) {
      onSuccess(isSuccess);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessUpdate) {
      onSuccess(isSuccessUpdate);
    }
  }, [isSuccessUpdate]);

  const onSubmit = values => {
    const payload = {
      ...values,
    };

    if (isEdit) {
      updateMovie(payload).unwrap();
    } else {
      addMovie(payload).unwrap();
    }
  };

  const renderMessage = (message: string) => <div key='message'>{message}</div>;

  const renderErrors = response => {
    const errors = response?.data?.messages;

    return errors.map(renderMessage);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {props => {
        const { values } = props;

        return (
          <>
            {isError ||
              (isErrorUpdate && (
                <div className={styles.errors}>{renderErrors(error || errorUpdate)}</div>
              ))}
            <Form className={styles.form}>
              <div className={styles.field}>
                <InputWithLabel
                  type='text'
                  name='title'
                  value={values.title}
                  label='Title'
                  placeholder='Title'
                  id='movie-title'
                  forId='movie-title'
                />
              </div>
              <div className={styles.field}>
                <DatePickerInputWithLabel
                  placeholder='Select date'
                  id='movie-release-date'
                  label='Release date'
                  name='release_date'
                  forId='movie-release-date'
                  startDateCurrent={values.release_date}
                />
              </div>
              <div className={styles.field}>
                <InputWithLabel
                  type='url'
                  name='poster_path'
                  value={values.poster_path}
                  label='Poster url'
                  placeholder='https://'
                  id='movie-poster-path'
                  forId='movie-poster-path'
                />
              </div>
              <div className={styles.field}>
                <InputNumberWithLabel
                  name='vote_average'
                  value={values.vote_average}
                  label='Rating'
                  placeholder='7.8'
                  step='0.1'
                  min='0'
                  max='10'
                  id='movie-rating'
                  forId='movie-rating'
                />
              </div>
              <div className={styles.field}>
                <SelectMultipleWithLabel
                  id='movie-genre'
                  forId='movie-genre'
                  name='genres'
                  value={values.genres}
                  initialOptions={movie?.genres}
                  label='Genre'
                  placeholder='Select genre'
                  options={GENRES}
                />
              </div>
              <div className={styles.field}>
                <InputNumberWithLabel
                  name='runtime'
                  value={values.runtime}
                  label='Runtime'
                  step='1'
                  placeholder='minutes'
                  id='movie-runtime'
                  forId='movie-runtime'
                />
              </div>
              <div className={cn(styles.field, styles.full)}>
                <InputWithLabel
                  type='text'
                  name='tagline'
                  value={values.tagline}
                  label='Tagline'
                  placeholder='Movie tagline'
                  id='movie-tagline'
                  forId='movie-tagline'
                />
              </div>
              <div className={cn(styles.field, styles.full)}>
                <TextareaWithLabel
                  name='overview'
                  value={values.overview}
                  label='Overview'
                  placeholder='Movie description'
                  id='movie-overview'
                  forId='movie-overview'
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
            </Form>
          </>
        );
      }}
    </Formik>
  );
};
