import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer component', () => {
  it('should be render correctly', () => {
    const { asFragment } = render(<Footer />, { wrapper: BrowserRouter });

    expect(asFragment()).toMatchSnapshot();
  });
});
