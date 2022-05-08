import styled from "styled-components";
import { FormattedMessage } from "react-intl";

import { Code } from "@app/ds/Code";
import { Badge } from "@app/ds/Badge";
import { Spinner } from "@app/ds/Spinner";
import { usePayment } from "@app/hooks/usePayment";
import { PageHeader } from "@app/components/PageHeader/PageHeader";
import { getBadgeColorForStatus } from "../../utils/getBadgeColorForStatus";

const Container = styled.div`
  padding: 0.5rem;
`

export const Payment = ({ id }: { id: Payment["id"] }): JSX.Element => {
  const { payment, isLoading, isError } = usePayment(id);

  return (
    <section>
      <PageHeader>
        <FormattedMessage id="pages.payment.title" defaultMessage="Payment" />{" "}
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
          <p>
            <strong>Customer:</strong> {payment.customer_name}
          </p>
          <p>
            <strong>Merchant:</strong> {payment.merchant.name}
          </p>
          <p>
            <strong>Amount:</strong> {payment.amount}
          </p>
          <p>
            <strong>Initiated On:</strong>{" "}
            {new Date(payment.created).toLocaleString()}
          </p>
          <Badge type={getBadgeColorForStatus(payment.status)}>
            <FormattedMessage
              id={`status.${payment.status}`}
              defaultMessage={payment.status}
            />
          </Badge>
        </Container>
      )}
    </section>
  );
};

export default Payment;
