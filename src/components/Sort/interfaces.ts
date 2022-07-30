import { ISelectProps } from '../UI/Select/interfaces';

export interface ISortProps extends Omit<ISelectProps, 'onChange'> {
  caption: string;
  className?: string;
}
