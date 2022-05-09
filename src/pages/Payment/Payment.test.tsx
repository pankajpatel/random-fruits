import { render, screen } from '@testing-library/react';
import { Payment } from './Payment';

import { mockEndpoint, MockableHTTPMethods } from '@app/testing/api-mocks';
import { withProviders } from '@app/testing/provider-setup';

import mockPaymentJSON from '@app/fixtures/payment.json';

const mockPayment = {
  id: 'payment_i2NJhL',
};

describe('Payment', () => {
  it('should render without crashing', async () => {
    mockEndpoint({
      url: '/payments/*',
      response: mockPaymentJSON,
    });
    const { container } = render(
      withProviders(<Payment id={mockPayment.id} />)
    );
    expect(container).toMatchSnapshot();

    await screen.findByText('label.customer');
    expect(container).toMatchSnapshot();
    expect(screen.getByText(mockPaymentJSON.customer_name)).toBeInTheDocument();

    expect(screen.getByRole('table')).toBeInTheDocument();
    // + 1 for the Header row
    expect(screen.getAllByRole('row')).toHaveLength(
      mockPaymentJSON.paymentPlan.length + 1
    );
  });
});
