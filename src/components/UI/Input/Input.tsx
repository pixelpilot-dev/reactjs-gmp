import * as React from 'react';
import cn from 'classnames';
import { ErrorMessage, useField } from 'formik';
import { IInputProps } from './interfaces';

import styles from './Input.module.scss';

export const Input: React.FC<IInputProps> = ({ className, ...props }) => {
  const [field, meta] = useField(props);

  const { id, type, placeholder, disabled, readonly } = props;

  const isInvalid = !!(meta.touched && meta.error);

  return (
    <>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        {...field}
        className={cn(styles.input, { [styles.isInvalid]: isInvalid }, className)}
      />

      <ErrorMessage component='span' name={field.name} className={styles.error} />
    </>
  );
};
