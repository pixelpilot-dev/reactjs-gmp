import { IGenresProps } from '../../core/types/IGenresProps';

export interface IFilterByTagsProps {
  options: IGenresProps;
  onClick: (item: string) => void;
}
