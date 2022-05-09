import { Router } from 'wouter';
import { IntlProvider } from 'react-intl';
import { QueryCache } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryCache = new QueryCache();

export const queryClient = new QueryClient({
  queryCache,
});

export const withProviders = (children: JSX.Element): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="en">
        <Router>{children}</Router>
      </IntlProvider>
    </QueryClientProvider>
  );
};
