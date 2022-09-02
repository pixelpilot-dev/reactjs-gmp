import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MovieContextMenu } from './MovieContextMenu';

describe('MovieContextMenu component', () => {
  it('should show on click btnOpen', async () => {
    const user = userEvent.setup();

    render(
      <MovieContextMenu>
        <div>Children</div>
      </MovieContextMenu>
    );

    const [btnOpen] = screen.getAllByRole('button');

    await user.click(btnOpen);

    expect(screen.getByTestId('menu')).toHaveClass('isShow');
    expect(screen.getByText(/Children/i)).toBeInTheDocument();
  });

  it('should hide on click btnClose', async () => {
    const user = userEvent.setup();

    render(
      <MovieContextMenu>
        <div>Children</div>
      </MovieContextMenu>
    );

    const [btnOpen, btnClose] = screen.getAllByRole('button');

    await user.click(btnOpen);

    expect(screen.getByTestId('menu')).toHaveClass('isShow');
    expect(screen.getByText(/Children/i)).toBeInTheDocument();

    await user.click(btnClose);

    expect(screen.getByTestId('menu')).not.toHaveClass('isShow');
  });
});