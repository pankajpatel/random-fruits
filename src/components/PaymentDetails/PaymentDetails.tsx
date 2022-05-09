import styled from 'styled-components';
import { FormattedDate, FormattedMessage } from 'react-intl';

import { Badge } from '@app/ds/Badge';
import { Label } from '@app/ds/Label';
import { getBadgeColorForStatus } from '@app/utils/getBadgeColorForStatus';
import { Amount } from '../Amount/Amount';

const Container = styled.div`
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;

  ${Label} + span {
    font-size: 2rem;
    display: block;
    margin-bottom: 1.5rem;
  }
`;

export const PaymentDetails = ({
  payment,
}: {
  payment: Payment;
}): JSX.Element => (
  <Container>
    <div>
      <Label>
        <FormattedMessage id="label.customer" defaultMessage="Customer" />
      </Label>
      <span>{payment.customer_name}</span>
    </div>
    <div>
      <Label>
        <FormattedMessage id="label.merchant" defaultMessage="Merchant" />
      </Label>
      <span>{payment.merchant.name}</span>
    </div>
    <div>
      <Label>
        <FormattedMessage id="label.amount" defaultMessage="Amount" />
      </Label>
      <span>
        <Amount value={payment.amount} />
      </span>
    </div>
    <div>
      <Label>
        <FormattedMessage id="label.created" defaultMessage="Initiated On" />
      </Label>
      <span>
        <FormattedDate value={new Date(payment.created)} dateStyle="full" />
      </span>
    </div>
    <div>
      <Label>
        <FormattedMessage id="label.status" defaultMessage="" />
      </Label>
      <span>
        <Badge type={getBadgeColorForStatus(payment.status)}>
          <FormattedMessage
            id={`status.${payment.status}`}
            defaultMessage={payment.status}
          />
        </Badge>
      </span>
    </div>
  </Container>
);
