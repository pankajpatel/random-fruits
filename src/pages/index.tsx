import { Suspense } from "react";
import { IntlProvider } from "react-intl";
import { Redirect, Route, Router } from "wouter";
import { QueryClientProvider } from "react-query";

import { Payments } from "./Payments/Payments";
import { Payment } from "./Payment/Payment";
import { Spinner } from "../components/Spinner";
import { queryClient } from "../utils/queryClient";
import { GlobalStyles } from "../GlobalStyles";

import localeEN from "../locales/en.json";
import localeFR from "../locales/fr.json";

const LOCALES = {
  en: localeEN,
  fr: localeFR,
}

const Index = () => <Redirect to="/payments" />;

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <IntlProvider locale={navigator.language || "en"} messages={LOCALES.en}>
      <GlobalStyles />
      <Router>
        <Route path="/payments/:id">
          {(params) => (
            <Suspense fallback={<Spinner />}>
              <Payment id={params.id} />
            </Suspense>
          )}
        </Route>
        <Route path="/payments">
          <Suspense fallback={<Spinner />}>
            <Payments />
          </Suspense>
        </Route>
        <Route path="/">
          <Index />
        </Route>
      </Router>
    </IntlProvider>
  </QueryClientProvider>
);
