import '@testing-library/jest-dom';
import { server } from './core/test/server';
import { moviesApi } from './core/store/movies/api';
import { setupStore } from './core/store';

const store = setupStore({});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(moviesApi.util.resetApiState());
});

afterAll(() => server.close());
