import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import useQueryParam from '../../hooks/useQueryParam';
import { QUERY_PARAMS_BY_MOVIES } from '../../core/constants';
import { LOCALE, I18Y } from '../../core/i18y';
import { IFilterByTagsProps } from './interfaces';
import { TGenresProps } from '../../core/types/TGenresProps';

import styles from './FilterByTags.module.scss';

export const FilterByTags: React.FC<IFilterByTagsProps> = ({ options }) => {
  const CAPTION_ALL = I18Y[LOCALE].FILTER_ALL_TAG_CAPTION;
  const [tag, setTag] = useQueryParam(QUERY_PARAMS_BY_MOVIES.GENRE);
  const [active, setActive] = useState('');

  useEffect(() => {
    setActive(!tag ? CAPTION_ALL : tag);
  }, [tag]);

  const handleActiveItem = (item: string) => {
    setActive(item);
    setTag(item);
  };

  const renderItem = (item: string) => {
    const caption = item === CAPTION_ALL ? CAPTION_ALL : item;

    return (
      <button
        key={item}
        className={cn(styles.button, { [styles.isActive]: active === caption })}
        onClick={() => handleActiveItem(item)}
        type='button'
      >
        {caption}
      </button>
    );
  };

  const renderList = (items: TGenresProps) => items.map(renderItem);

  return (
    <div className={styles.filter}>
      {renderItem(CAPTION_ALL)}
      {renderList(options)}
    </div>
  );
};
