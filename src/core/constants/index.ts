import { range } from 'lodash';
import { getYear } from '../utils/date';

export const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const YEARS = range(1700, getYear(new Date()) + 1, 1);

export const GENRES = [
  'Action',
  'Adventure',
  'Drama',
  'Biography',
  'Music',
  'Oscar winning Movie',
  'Documentary',
  'Comedy',
  'Horror',
  'Crime',
  'Romance',
  'Animation',
  'Family',
  'Fantasy',
  'Science Fiction',
  'History',
  'Thriller',
  'Mystery',
  'Film-Noir',
  'War',
  'Western',
  'Musical',
  'Sport',
];

export const ERROR_CAPTION_FOR_FORMS = {
  REQUIRED: 'Required',
  IS_EMAIL: 'Email is invalid',
  IS_NUMBER: 'Should only contain numbers',
  IS_MIN: 'Must be greader {0}',
  IS_MAX: 'Must be less than or equal to {0}',
  IS_URL: 'Must be url',
};

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
};
