import { IInputProps } from '../Input/interfaces';

export interface ISelectMultipleProps extends Omit<IInputProps, 'value' | 'type'> {
  options: string[];
  value: string[];
  initialOptions: string[];
  className?: string;
}
