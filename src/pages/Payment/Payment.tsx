import { FormattedMessage } from 'react-intl';

import { Label } from '@app/ds/Label';
import { Spinner } from '@app/ds/Spinner';
import { PageHeader } from '@app/components/PageHeader/PageHeader';
import { PaymentDetails } from '@app/components/PaymentDetails/PaymentDetails';
import { Installments } from '@app/components/Installments/Installments';

import { usePayment } from '@app/hooks/usePayment';
import { ContainerOnlyWithGutter } from '@app/ds/Container';
import { Button } from '@app/ds/Button';
import { Link } from 'wouter';

export const Payment = ({ id }: { id: Payment['id'] }): JSX.Element => {
  const { payment, isLoading, isError } = usePayment(id);

  return (
    <section>
      <PageHeader>
        <Button as={Link} href="/payments">
          <svg
            height="1rem"
            version="1.1"
            viewBox="0 0 50.999 85.999"
            width="1rem"
          >
            <path d="M44.998,80.094c1.338,1.352,1.338,3.541,0,4.893c-1.336,1.35-3.506,1.352-4.844,0L1.003,45.447  c-1.338-1.352-1.338-3.543,0-4.895l39.15-39.539c1.338-1.352,3.506-1.352,4.844,0S46.335,4.555,45,5.906L9.294,43L44.998,80.094z" />
          </svg>
        </Button>
        <span>
          <FormattedMessage id="page.payment.title" defaultMessage="Payment" />
        </span>
      </PageHeader>
      {isLoading && <Spinner />}
      {isError && (
        <p>
          Failed to load payment <code>{id}</code> details
        </p>
      )}
      {!isLoading && !isError && payment && (
        <>
          <PaymentDetails payment={payment} />

          <ContainerOnlyWithGutter>
            <Label>
              <FormattedMessage id="page.payment.installments.label" />
            </Label>
            <Installments payment={payment} />
          </ContainerOnlyWithGutter>
        </>
      )}
    </section>
  );
};

export default Payment;
