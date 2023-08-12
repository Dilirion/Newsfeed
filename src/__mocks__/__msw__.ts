import { rest as mswRest } from 'msw';
import { setupServer } from 'msw/node';

export const server = setupServer();
export const rest = mswRest;
