import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMovieProps } from '../../types/IMovieProps';
import { IMoviesResponse } from './interfaces';
import { IMovieFiltering } from '../../types/IMovieFiltering';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  tagTypes: ['Movies'],
  endpoints: build => ({
    getMovies: build.query<IMovieProps[], IMovieFiltering>({
      query: params => ({
        url: '/movies',
        params: {
          ...params,
        },
      }),
      transformResponse: (response: IMoviesResponse) => response.data,
      providesTags: (response: IMovieProps[]) =>
        response
          ? [
              ...response.map(({ id }) => ({ type: 'Movies' as const, id })),
              { type: 'Movies', id: 'LIST' },
            ]
          : [{ type: 'Movies', id: 'LIST' }],
    }),
    getMovieById: build.query<IMovieProps, string | number>({
      query: (id: string | number) => `movies/${id}`,
      providesTags: (result, error, id) => [{ type: 'Movies', id }],
    }),
  }),
});

export const { useLazyGetMoviesQuery, useGetMovieByIdQuery } = moviesApi;
