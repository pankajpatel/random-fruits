import { render, screen } from '@testing-library/react';

import { withProviders } from '@app/testing/provider-setup';
import mockPaymentJSON from '@app/fixtures/payment.json';

import { PaymentDetails } from './PaymentDetails';

describe('Payment Details', () => {
  it('should render without crashing', () => {
    const { container } = render(
      withProviders(<PaymentDetails payment={mockPaymentJSON as Payment} />)
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with payment data', () => {
    render(
      withProviders(<PaymentDetails payment={mockPaymentJSON as Payment} />)
    );
    expect(screen.getByText('label.customer')).toBeInTheDocument();
    expect(screen.getByText(mockPaymentJSON.customer_name)).toBeInTheDocument();
    expect(screen.getByText('label.merchant')).toBeInTheDocument();
    expect(screen.getByText(mockPaymentJSON.merchant.name)).toBeInTheDocument();
    expect(screen.getByText('label.amount')).toBeInTheDocument();
    expect(screen.getByText(`${mockPaymentJSON.amount} €`)).toBeInTheDocument();
    expect(screen.getByText('label.created')).toBeInTheDocument();
    expect(screen.getByText('label.status')).toBeInTheDocument();
    expect(
      screen.getByText(`status.${mockPaymentJSON.status}`)
    ).toBeInTheDocument();
  });
});
