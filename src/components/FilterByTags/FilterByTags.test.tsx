import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GENRES_FOR_FILTER } from '../../core/constants';

import { FilterByTags } from './FilterByTags';

describe('FilterByTags component', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<FilterByTags options={GENRES_FOR_FILTER} />, {
      wrapper: BrowserRouter,
    });

    const buttonAll = 1;
    const numberOfButtons = GENRES_FOR_FILTER.length + buttonAll;
    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBe(numberOfButtons);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should has active tag on click', async () => {
    const user = userEvent.setup();
    render(<FilterByTags options={GENRES_FOR_FILTER} />, { wrapper: BrowserRouter });

    const buttons = screen.getAllByRole('button');
    const btn = buttons[2];

    await user.click(btn);

    expect(btn).toHaveClass('isActive');
  });
});
