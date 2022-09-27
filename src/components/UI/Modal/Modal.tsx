import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IModalProps } from './interfaces';
import { Icon } from '../Icon';

import styles from './Modal.module.scss';

import closeIcon from '../../../assets/sprites/close.svg';

const OVERFLOW_CLASS = 'overflow';

const modalRoot = document.createElement('div')
modalRoot.setAttribute('id', 'modal-root')
document.body.appendChild(modalRoot)

export const Modal: React.FC<IModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  useEffect(() => {
    document.body.classList.add(OVERFLOW_CLASS);

    return () => {
      document.body.classList.remove(OVERFLOW_CLASS);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} />

      <div className={styles.modal}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <button className={styles.close} type='button' onClick={() => onClose(false)}>
              <Icon icon={closeIcon} />
            </button>

            {children}
          </div>
        </div>
      </div>
    </>,
    modalRoot,
  );
};
