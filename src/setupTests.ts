// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { ReactNode } from 'react';

import { resetAPIMocks, server } from './testing/api-mocks';

import { withProviders, queryCache } from './testing/provider-setup';

global.queryCache = queryCache;
global.withProviders = withProviders;

jest.mock('react-intl', () => {
  const intl = jest.requireActual('react-intl');
  return {
    ...intl,
    FormattedMessage: ({ id }: { id: string }): ReactNode => id,
    FormattedDate: ({ value }: { value: Date }): ReactNode => value.toString(),
    FormattedNumber: ({ value }: { value: number }): ReactNode =>
      value.toString(),
  };
});

beforeAll(() => server.listen());

afterAll(() => server.close());

afterEach(() => {
  resetAPIMocks();
});
