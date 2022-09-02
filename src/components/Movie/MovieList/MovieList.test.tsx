import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { getAllByTestId, render, screen, waitFor } from '@testing-library/react';
import { MOVIES } from '../../../core/mocks';

import { MovieList } from './MovieList';

const mockMovies = MOVIES;

describe('MovieList component', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <MovieList movies={mockMovies} />,
      { wrapper: BrowserRouter }
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render right count of movies', () => {
    render(
      <MovieList movies={mockMovies} />,
      { wrapper: BrowserRouter }
    );

    const cards = screen.getAllByTestId('movieCard');

    expect(cards.length).toBe(mockMovies.length);
  });
});