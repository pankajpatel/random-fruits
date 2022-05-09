import { render } from '@testing-library/react';

import { withProviders } from '@app/testing/provider-setup';
import mockPaymentJSON from '@app/fixtures/payment.json';

import { Installments } from './Installments';

jest.mock('react-intl', () => ({
  FormattedMessage: ({ id }: { id: string }): JSX.Element => <>{id}</>,
  FormattedDate: ({ value }: { value: Date }): JSX.Element => (
    <>{value.toString()}</>
  ),
  FormattedNumber: ({ value }: { value: number }): JSX.Element => (
    <>{value.toString()}</>
  ),
}));

describe('Installments', () => {
  it('should render without crashing', () => {
    const { container } = render(
      withProviders(<Installments payment={mockPaymentJSON as Payment} />)
    );
    expect(container).toMatchSnapshot();
  });
});
