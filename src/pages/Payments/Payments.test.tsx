import { render, screen } from '@testing-library/react';
import paymentsJSON from '@app/fixtures/payments.json';
import { withProviders, queryCache } from '@app/testing/provider-setup';
import { mockEndpoint, resetAPIMocks } from '@app/testing/api-mocks';

import { Payments } from './Payments';

describe('Payments', () => {
  beforeEach(() => {
    resetAPIMocks();
    queryCache.clear();
  });

  it('should render when transactions are present', async () => {
    mockEndpoint({
      url: '/payments',
      response: paymentsJSON,
      delayInMs: 0,
    });
    const { container } = render(withProviders(<Payments />));
    expect(container).toMatchSnapshot();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await screen.findAllByText('table.header.customerName');

    expect(container).toMatchSnapshot();
    expect(screen.getByRole('table')).toBeInTheDocument();
    // + 1 for the Header row
    expect(screen.getAllByRole('row')).toHaveLength(paymentsJSON.length + 1);
  });
});
