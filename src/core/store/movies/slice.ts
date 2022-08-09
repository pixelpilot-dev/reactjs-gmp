import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMoviesState } from './interfaces';
import { IMovieFiltering } from '../../types/IMovieFiltering';

const initialState: IMoviesState = {
  openedMovieId: null,
  filteringParams: {
    sortBy: '',
    sortOrder: '',
    search: '',
    searchBy: '',
    filter: [],
  },
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovieDetails: (state, action: PayloadAction<string | number>) => {
      state.openedMovieId = action.payload;
    },
    setFilteringParams: (state, action: PayloadAction<IMovieFiltering>) => {
      state.filteringParams = action.payload;
    },
  },
});

export const moviesActions = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;
