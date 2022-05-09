import { render } from '@testing-library/react';

import { withProviders } from '@app/testing/provider-setup';
import mockPaymentJSON from '@app/fixtures/payment.json';

import { Installments } from './Installments';

describe('Installments', () => {
  it('should render without crashing', () => {
    const { container } = render(
      withProviders(<Installments payment={mockPaymentJSON as Payment} />)
    );
    expect(container).toMatchSnapshot();
  });
});
