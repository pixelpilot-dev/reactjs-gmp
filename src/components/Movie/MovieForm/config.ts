import * as Yup from 'yup';
import { ERROR_CAPTION_FOR_FORMS } from '../../../core/constants';
import { IMovieProps } from '../../../core/types/IMovieProps';
import { fillPlaceholderWithValue } from '../../../core/utils/fillPlaceholderWithValue';

export const initialValues: Omit<IMovieProps, 'id'> = {
  title: '',
  vote_average: 0,
  release_date: '',
  poster_path: '',
  overview: '',
  runtime: 0,
  genres: [],
  tagline: '',
  vote_count: 0,
  budget: 0,
  revenue: 0,
};

const { REQUIRED, IS_NUMBER, IS_MAX, IS_MIN, IS_URL } = ERROR_CAPTION_FOR_FORMS;

export const validationSchema = Yup.object({
  title: Yup.string().required(REQUIRED),
  vote_average: Yup.number()
    .min(0, fillPlaceholderWithValue(IS_MIN, 0))
    .max(10, fillPlaceholderWithValue(IS_MAX, 10)),
  release_date: Yup.string().required(REQUIRED),
  poster_path: Yup.string().url(IS_URL).required(REQUIRED),
  tagline: Yup.string().required(REQUIRED),
  overview: Yup.string().required(REQUIRED),
  runtime: Yup.number().integer(IS_NUMBER).required(REQUIRED),
  genres: Yup.array().min(1).required(REQUIRED),
});
