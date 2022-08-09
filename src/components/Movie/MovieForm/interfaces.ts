import { IMovieProps } from '../../../core/types/IMovieProps';

export interface IMovieFormProps {
  movie?: IMovieProps;
  onSuccess: (state: boolean) => void;
}
