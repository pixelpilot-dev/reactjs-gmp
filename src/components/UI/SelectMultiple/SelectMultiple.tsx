import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import { useField } from 'formik';
import { ISelectMultipleProps } from './interfaces';
import useClickOutside from '../../../hooks/useClickOutside';

import { Icon } from '../Icon';
import { Input } from '../Input';

import styles from './SelectMultiple.module.scss';

import checkIcon from '../../../assets/sprites/indicator.svg';

export const SelectMultiple: React.FC<ISelectMultipleProps> = ({
  initialOptions,
  options,
  className,
  ...inputProps
}) => {
  const [field, meta, { setValue }] = useField(inputProps);
  const ref = useRef();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [chosenOptions, setChosenOptions] = useState([]);

  useClickOutside(ref, () => setIsOpen(false));

  useEffect(() => {
    if (initialOptions?.length) {
      setChosenOptions(initialOptions);
    }
  }, [initialOptions]);

  useEffect(() => {
    setValue(chosenOptions.map(item => item));
  }, [chosenOptions, options]);

  const handlerOpen = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const handlerOnClickOption = (option: string) => {
    if (chosenOptions.includes(option)) {
      setChosenOptions(chosenOptions.filter(item => item !== option));
    } else {
      setChosenOptions([...chosenOptions, option]);
    }
  };

  const renderOption = (option: string) => {
    const isActiveOption = chosenOptions.includes(option);

    return (
      <div
        key={option}
        className={cn(styles.option, { [styles.isActive]: isActiveOption })}
        onClick={() => handlerOnClickOption(option)}
        role='button'
        aria-hidden='true'
      >
        <span className={styles.check}>
          <Icon icon={checkIcon} className={styles.checkIcon} />
        </span>
        {option}
      </div>
    );
  };

  const renderList = (optionsGroup: string[]) => optionsGroup.map(renderOption);

  return (
    <div ref={ref} className={cn(styles.select, className)}>
      <div className={styles.field} onClick={handlerOpen} role='button' aria-hidden='true'>
        <Input type='text' readonly className={styles.input} {...inputProps} {...field} />
      </div>
      {isOpen && <div className={styles.list}>{renderList(options)}</div>}
    </div>
  );
};
