import 'whatwg-fetch';
import '@testing-library/jest-dom';

import { server } from './src/__mocks__/__msw__';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
