import React, { useState, useRef } from 'react';
import cn from 'classnames';
import { IMovieContextMenuProps } from './interfaces';

import useClickOutside from '../../../hooks/useClickOutside';

import { Icon } from '../../UI/Icon';

import styles from './MovieContextMenu.module.scss';

import dotIcon from '../../../assets/sprites/dot-burger.svg';
import closeIcon from '../../../assets/sprites/close.svg';

export const MovieContextMenu: React.FC<IMovieContextMenuProps> = ({ children, className }) => {
  const ref = useRef();
  const [isShow, setIsShow] = useState<boolean>(false);

  useClickOutside(ref, () => setIsShow(false));

  const onOpen = () => setIsShow(true);
  const onClose = () => setIsShow(false);

  return (
    <div
      data-testid='menu'
      ref={ref}
      className={cn(styles.menu, { [styles.isShow]: isShow }, className)}
    >
      <button className={styles.btnOpen} type='button' onClick={onOpen}>
        <Icon icon={dotIcon} />
      </button>

      <button className={styles.btnClose} type='button' onClick={onClose}>
        <Icon icon={closeIcon} />
      </button>

      {isShow && <div className={styles.list}>{children}</div>}
    </div>
  );
};
