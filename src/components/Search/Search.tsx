import React, { useState } from 'react';
import cn from 'classnames';
import { I18Y, LOCALE } from '../../core/i18y';
import { ISearchProps } from './interfaces';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

import styles from './Search.module.scss';

export const Search: React.FC<ISearchProps> = ({ className }) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = event;

    setValue(currentTarget.value);
  };

  const handleSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValue('');
  };

  return (
    <div className={cn(styles.search, className)}>
      <div className={styles.title}>{I18Y[LOCALE].SEARCH_TITLE}</div>

      <form onSubmit={handleSubmitForm} className={styles.form}>
        <Input
          type='text'
          id='search'
          name='search'
          value={value}
          placeholder={I18Y[LOCALE].SEARCH_PLACEHOLDER}
          onChange={handleChange}
          className={styles.input}
        />

        <Button type='submit' theme='default' className={styles.button}>
          {I18Y[LOCALE].SEARCH_BUTTON}
        </Button>
      </form>
    </div>
  );
};
