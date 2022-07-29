import React from 'react';
import cn from 'classnames';
import { INotificationProps } from './interfaces';

import styles from './Notification.module.scss';

export const Notification: React.FC<INotificationProps> = ({ type, children, className }) => {
  return (
    <div className={cn(styles.notification, { [styles[type]]: type }, className)}>{children}</div>
  );
};
