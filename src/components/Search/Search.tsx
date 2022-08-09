import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { I18Y, LOCALE } from '../../core/i18y';
import { ISearchProps } from './interfaces';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

import styles from './Search.module.scss';

export const Search: React.FC<ISearchProps> = ({ className }) => {
  const navigate = useNavigate();
  const { searchQuery } = useParams();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, [searchQuery]);

  const onSubmit = (values, setErrors) => {
    navigate(`/search/${values.search}`, { replace: true });
  };

  return (
    <div className={cn(styles.search, className)}>
      <div className={styles.title}>{I18Y[LOCALE].SEARCH_TITLE}</div>

      <Formik
        enableReinitialize
        initialValues={{ search }}
        onSubmit={(values, { setErrors }) => {
          onSubmit(values, setErrors);
        }}
      >
        {props => {
          const { values } = props;

          return (
            <Form className={styles.form}>
              <Input
                type='text'
                name='search'
                value={values.search}
                placeholder={I18Y[LOCALE].SEARCH_PLACEHOLDER}
                id='search'
                className={styles.input}
              />

              <Button type='submit' theme='default' className={styles.button}>
                {I18Y[LOCALE].SEARCH_BUTTON}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
