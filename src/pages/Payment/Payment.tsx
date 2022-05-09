import styled from 'styled-components';
import { FormattedDate, FormattedMessage } from 'react-intl';

import { Code } from '@app/ds/Code';
import { Badge } from '@app/ds/Badge';
import { Spinner } from '@app/ds/Spinner';
import { usePayment } from '@app/hooks/usePayment';
import { PageHeader } from '@app/components/PageHeader/PageHeader';
import { getBadgeColorForStatus } from '../../utils/getBadgeColorForStatus';

const Container = styled.div`
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;

  strong {
    display: block;
    font-size: 1.2rem;
    color: #aaa;
  }

  strong + span {
    font-size: 2rem;
    display: block;
    margin-bottom: 1.5rem;
  }
`;

export const Payment = ({ id }: { id: Payment['id'] }): JSX.Element => {
  const { payment, isLoading, isError } = usePayment(id);

  return (
    <section>
      <PageHeader>
        <FormattedMessage id="page.payment.title" defaultMessage="Payment" />{' '}
        <Code>{id}</Code>
      </PageHeader>
      {isLoading && <Spinner />}
      {isError && (
        <p>
          Failed to load payment <code>{id}</code> details
        </p>
      )}
      {!isLoading && !isError && payment && (
        <Container>
          <div>
            <strong>
              <FormattedMessage id="label.customer" defaultMessage="Customer" />
            </strong>
            <span>{payment.customer_name}</span>
          </div>
          <div>
            <strong>
              <FormattedMessage id="label.merchant" defaultMessage="Merchant" />
            </strong>
            <span>{payment.merchant.name}</span>
          </div>
          <div>
            <strong>
              <FormattedMessage id="label.amount" defaultMessage="Amount" />
            </strong>
            <span>{payment.amount} €</span>
          </div>
          <div>
            <strong>
              <FormattedMessage
                id="label.created"
                defaultMessage="Initiated On"
              />
            </strong>
            <span>
              <FormattedDate
                value={new Date(payment.created)}
                dateStyle="full"
              />
            </span>
          </div>
          <div>
            <strong>
              <FormattedMessage id="label.status" defaultMessage="" />
            </strong>
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
      )}
    </section>
  );
};

export default Payment;
