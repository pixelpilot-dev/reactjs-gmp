import { IMovieFiltering } from '../../types/IMovieFiltering';
import { IMovieProps } from '../../types/IMovieProps';

export interface IMoviesResponse {
  data: IMovieProps[];
  total: number;
  offset: number;
  limit: number;
}

export interface IMoviesState {
  openedMovieId: string | number;
  filteringParams: IMovieFiltering;
}
