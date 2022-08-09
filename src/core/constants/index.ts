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

export const GENRES = {
  action: 'Action',
  adventure: 'Adventure',
  drama: 'Drama',
  biographical: 'Biography',
  music: 'Music',
  oscar: 'Oscar winning Movie',
  doc: 'Documentary',
  comedy: 'Comedy',
  horror: 'Horror',
  criminal: 'Crime',
  romance: 'Romance',
  animation: 'Animation',
  family: 'Family',
  fantasy: 'Fantasy',
  scf: 'Science Fiction',
};
