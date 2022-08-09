import React from 'react';
import cn from 'classnames';
import { Formik, Form } from 'formik';
import { I18Y, LOCALE } from '../../core/i18y';
import { ISearchProps } from './interfaces';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

import styles from './Search.module.scss';

export const Search: React.FC<ISearchProps> = ({ className }) => {
  const onSubmit = values => {};

  return (
    <div className={cn(styles.search, className)}>
      <div className={styles.title}>{I18Y[LOCALE].SEARCH_TITLE}</div>

      <Formik initialValues={{ search: '' }} onSubmit={onSubmit}>
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
