import React from 'react';
import cn from 'classnames';
import { QUERY_PARAMS_BY_MOVIES } from '../../core/constants';
import { ISortProps } from './interfaces';
import useQueryParam from '../../hooks/useQueryParam';
import { Select } from '../UI/Select';

import styles from './Sort.module.scss';

export const Sort: React.FC<ISortProps> = ({ value, caption, className, ...selectProps }) => {
  const [sort, setSort] = useQueryParam(QUERY_PARAMS_BY_MOVIES.SORT_BY);

  return (
    <div className={cn(styles.sort, className)}>
      <div className={styles.caption}>{caption}</div>
      <Select {...selectProps} value={!sort ? value : sort} onChange={setSort} />
    </div>
  );
};
