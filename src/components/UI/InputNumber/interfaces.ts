import { IInputProps } from '../Input/interfaces';

export interface IInputNumberProps extends Omit<IInputProps, 'type'> {
  step?: string;
  min?: string;
  max?: string;
}
