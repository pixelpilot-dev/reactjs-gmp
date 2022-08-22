import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Search } from './Search';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Search component', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<Search />, { wrapper: BrowserRouter });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should navigate after submit', async () => {
    const user = userEvent.setup();
    render(<Search />, { wrapper: BrowserRouter });

    const input = screen.getByPlaceholderText(/What do you want to watch/i);
    expect(input).toBeInTheDocument();
    await user.type(input, 'Alice');

    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
    await user.click(button);

    await waitFor(() =>
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/search/Alice', { replace: true }),
    );
  });
});
