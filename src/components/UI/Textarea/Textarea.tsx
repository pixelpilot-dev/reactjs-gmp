import React from 'react';
import cn from 'classnames';
import { ErrorMessage, useField } from 'formik';
import { ITextareaProps } from './interfaces';

import styles from './Textarea.module.scss';

export const Textarea: React.FC<ITextareaProps> = ({ className, ...props }) => {
  const [field, meta] = useField(props);

  const { id, placeholder, disabled, cols, rows } = props;

  const isInvalid = !!(meta.touched && meta.error);

  return (
    <>
      <textarea
        id={id}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        {...field}
        className={cn(styles.textarea, { [styles.isInvalid]: isInvalid }, className)}
      />

      <ErrorMessage component='span' name={field.name} className={styles.error} />
    </>
  );
};
