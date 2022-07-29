import React, { useState } from 'react';
import cn from 'classnames';
import { IFilterByTagsProps } from './interfaces';
import { TGenresProps } from '../../core/types/TGenresProps';
import { LOCALE, I18Y } from '../../core/i18y';

import styles from './FilterByTags.module.scss';

export const FilterByTags: React.FC<IFilterByTagsProps> = ({ options, onClick }) => {
  const [active, setActive] = useState(I18Y[LOCALE].FILTER_ALL_TAG_CAPTION);

  const handleActiveItem = (item: string) => {
    setActive(item);
    onClick(item);
  };

  const renderItem = (item: string) => {
    const isAllItem = item === I18Y[LOCALE].FILTER_ALL_TAG_CAPTION;
    const caption = isAllItem ? I18Y[LOCALE].FILTER_ALL_TAG_CAPTION : item;

    return (
      <button
        key={item}
        className={cn(styles.button, { [styles.isActive]: active === caption })}
        type='button'
        onClick={() => handleActiveItem(caption)}
      >
        {caption}
      </button>
    );
  };

  const renderList = (items: TGenresProps) => items.map(renderItem);

  return (
    <div className={styles.filter}>
      {renderItem(I18Y[LOCALE].FILTER_ALL_TAG_CAPTION)}
      {renderList(options)}
    </div>
  );
};
