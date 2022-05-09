import { Suspense } from 'react';
import { Redirect, Route, Router } from 'wouter';

import { Spinner } from '@app/ds/Spinner';
import { Payment } from '@app/pages/Payment/Payment';
import { Payments } from '@app/pages/Payments/Payments';

const Index = () => <Redirect to="/payments" />;

export const RoutedApp = () => (
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
);
