import { render, RenderOptions } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import type { PreloadedState } from '@reduxjs/toolkit';
import { setupStore, AppStore, RootState } from '../store';
import { setupListeners } from '@reduxjs/toolkit/dist/query'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {

  setupListeners(store.dispatch);

  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};