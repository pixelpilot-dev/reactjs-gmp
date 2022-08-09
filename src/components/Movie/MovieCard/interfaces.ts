import { IMovieProps } from '../../../core/types/IMovieProps';

export interface IMovieCardProps {
  movie: IMovieProps;
  className?: string;
  onEdit: (id: string | number) => void;
  onDelete: (id: string | number) => void;
}
