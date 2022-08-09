import * as React from 'react';
import cn from 'classnames';
import { ErrorMessage, useField } from 'formik';
import { IInputNumberProps } from './interfaces';

import styles from './InputNumber.module.scss';

export const InputNumber: React.FC<IInputNumberProps> = ({ className, ...props }) => {
  const [field, meta] = useField(props);

  const { id, placeholder, disabled, readonly, step = 1, min, max } = props;

  const isInvalid = !!(meta.touched && meta.error);

  return (
    <>
      <input
        id={id}
        type='number'
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        step={step}
        min={min}
        max={max}
        {...field}
        className={cn(styles.input, { [styles.isInvalid]: isInvalid }, className)}
      />

      <ErrorMessage component='span' name={field.name} className={styles.error} />
    </>
  );
};
