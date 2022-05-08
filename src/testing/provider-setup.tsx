import { Router } from "wouter";
import { IntlProvider } from "react-intl";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const withProviders = (children: JSX.Element): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale="en">
        <Router>{children}</Router>
      </IntlProvider>
    </QueryClientProvider>
  );
};
