import { FormattedMessage } from 'react-intl';

import { Code } from '@app/ds/Code';
import { Label } from '@app/ds/Label';
import { Spinner } from '@app/ds/Spinner';
import { PageHeader } from '@app/components/PageHeader/PageHeader';
import { PaymentDetails } from '@app/components/PaymentDetails/PaymentDetails';
import { Installments } from '@app/components/Installments/Installments';

import { usePayment } from '@app/hooks/usePayment';
import { ContainerOnlyWithGutter } from '@app/ds/Container';

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
        <>
          <PaymentDetails payment={payment} />

          <ContainerOnlyWithGutter>
            <Label>Installments related to this payment:</Label>
            <Installments payment={payment} />
          </ContainerOnlyWithGutter>
        </>
      )}
    </section>
  );
};

export default Payment;
