import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'wouter';

import { Spinner } from '@app/ds/Spinner';
import { Payment } from '@app/pages/Payment/Payment';
import { Payments } from '@app/pages/Payments/Payments';
import { Page404 } from './404';

const Index = () => <Redirect to="/payments" />;

export const RoutedApp = () => (
  <Switch>
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
    <Route path="/:rest*">
      <Page404 />
    </Route>
  </Switch>
);
