import React from 'react';
import cn from 'classnames';
import { fill } from 'lodash';
import { ILoaderProps } from './interfaces';

import styles from './Loader.module.scss';

export const Loader: React.FC<ILoaderProps> = ({ className }) => {
  const divs = fill(Array(9), 2);
  const renderDivs = items => items.map(i => <div key={i * Math.random()} />);

  return <div className={cn(styles.loader, className)}>{renderDivs(divs)}</div>;
};
