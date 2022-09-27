import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MOVIE } from '../../../core/mocks';

import { MovieCard } from './MovieCard';

const spyScrollTo = jest.fn();
global.scrollTo = spyScrollTo;

jest.mock('../EditMovie', () => ({
  __esModule: true,
  EditMovie: () => {
    return <div>Edit movie</div>;
  },
}));

jest.mock('../DeleteMovie', () => ({
  __esModule: true,
  DeleteMovie: () => {
    return <div>Delete movie</div>;
  },
}));

const mockedOnSuccessModal = jest.fn();
const mockMovie = MOVIE;

describe('MovieCard component', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <MovieCard movie={mockMovie} onSuccessModal={mockedOnSuccessModal} />,
      { wrapper: BrowserRouter }
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render all genres', () => {
    render(
      <MovieCard movie={mockMovie} onSuccessModal={mockedOnSuccessModal} />,
      { wrapper: BrowserRouter }
    );

    const genres = screen.getAllByTestId('genre');

    expect(genres.length).toBe(mockMovie.genres.length);
  });

  it('show details on click picture', async () => {
    const user = userEvent.setup();

    render(
      <MovieCard movie={mockMovie} onSuccessModal={mockedOnSuccessModal} />,
      { wrapper: BrowserRouter }
    );

    await user.click(screen.getByTestId('showDetailsOnPicture'));

    expect(spyScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('show details on click title', async () => {
    const user = userEvent.setup();

    render(
      <MovieCard movie={mockMovie} onSuccessModal={mockedOnSuccessModal} />,
      { wrapper: BrowserRouter }
    );

    await user.click(screen.getByTestId('showDetailsOnTitle'));

    expect(spyScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('click edit button', async () => {
    const user = userEvent.setup();

    render(
      <MovieCard movie={mockMovie} onSuccessModal={mockedOnSuccessModal} />,
      { wrapper: BrowserRouter }
    );

    const [btnOpen] = screen.getAllByRole('button');
    await user.click(btnOpen);

    const btnEdit = screen.getByRole('button', { name: 'Edit' });

    await user.click(btnEdit);
    expect(screen.getByText('Edit movie')).toBeInTheDocument();
  });

  it('click delete button', async () => {
    const user = userEvent.setup();

    render(
      <MovieCard movie={mockMovie} onSuccessModal={mockedOnSuccessModal} />,
      { wrapper: BrowserRouter }
    );

    const [btnOpen] = screen.getAllByRole('button');
    await user.click(btnOpen);

    const btnDelete = screen.getByRole('button', { name: 'Delete' });

    await user.click(btnDelete);

    expect(screen.getByText('Delete movie')).toBeInTheDocument();
  });
});
