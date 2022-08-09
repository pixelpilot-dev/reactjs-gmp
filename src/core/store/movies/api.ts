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
          limit: 15,
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
    addMovie: build.mutation({
      query: body => ({
        url: 'movies',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Movies' }],
    }),
    updateMovie: build.mutation({
      query: body => ({
        url: 'movies',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Movies' }],
    }),
    deleteMovie: build.mutation({
      query: id => ({
        url: `movies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Movies' }],
    }),
  }),
});

export const {
  useLazyGetMoviesQuery,
  useGetMovieByIdQuery,
  useAddMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} = moviesApi;
