import React from 'react';
import { NOTIFICATION_TYPES } from '../../../core/constants';
import { IPromoNotificationProps } from './interfaces';

import styles from './PromoNotification.module.scss';

import iconSuccess from '../../../assets/images/success.svg';
import iconError from '../../../assets/images/error.svg';

export const PromoNotification: React.FC<IPromoNotificationProps> = ({ title, message, type }) => {
  const icon = type === NOTIFICATION_TYPES.SUCCESS ? iconSuccess : iconError;
  return (
    <div className={styles.notification}>
      <img src={icon} alt={title} className={styles.icon} />
      <h2 className={styles.title}>{title}</h2>
      <p>{message}</p>
    </div>
  );
};
