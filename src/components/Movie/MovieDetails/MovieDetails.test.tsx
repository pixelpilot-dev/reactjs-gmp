import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, waitFor } from '@testing-library/react';
import { server } from '../../../core/test/server';
import { rest } from 'msw';
import { renderWithProviders } from '../../../core/test/test-utils';
import { MOVIE } from '../../../core/mocks';

import { MovieDetails } from './MovieDetails';

const mockApiResponse = MOVIE;

describe('MovieDetails component', () => {
  it('should render after fetching from API', async () => {
    server.use(
      rest.get(`*`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockApiResponse), ctx.delay(30));
      }),
    );

    const section = document.createElement('section');

    const { container } = renderWithProviders(<MovieDetails id={406997} />, {
      container: document.body.appendChild(section),
    });

    expect(container.childElementCount).toEqual(0);

    const picture = await screen.findByAltText('Wonder');

    await waitFor(() => {
      expect(picture).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should render error message if API fails', async () => {
    server.use(
      rest.get('*', (_req, res, ctx) =>
        res.once(ctx.status(500), ctx.json({ message: 'error' }))
      )
    );

    renderWithProviders(<MovieDetails id={111111112} />);

    const error = await screen.findByText(/Oh no, there was an error/i);

    await waitFor(() => {
      expect(error).toBeInTheDocument();
    });
  });
});