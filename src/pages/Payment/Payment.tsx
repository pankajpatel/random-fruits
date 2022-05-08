import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Badge } from "../../components/Badge";
import { Spinner } from "../../components/Spinner";
import { usePayment } from "../../hooks/usePayment";

const Code = styled.code`
  font-weight: normal;
  background-color: #eee;
  border-radius: 0.25rem;
  padding: 0.25rem;
  font-style: italic;
`

export const Payment = ({ id }: { id: Payment["id"] }): JSX.Element => {
  const [payment, setPayment] = useState<Payment | undefined>();
  const {data, isLoading, isError} = usePayment(id)
  useEffect(() => {
    data && setPayment(data);
  }, [data])
  return (
    <section>
      <h2>
        <FormattedMessage id="pages.payment.title" defaultMessage="Payment" />{" "}
        <Code>{id}</Code>
      </h2>
      <hr />
      {isLoading && <Spinner />}
      {isError && (
        <p>
          Failed to load payment <code>{id}</code> details
        </p>
      )}
      {!isLoading && !isError && payment && (
        <div>
          <p>{payment.id}</p>
          <p>{payment.amount}</p>
          <p>{payment.created}</p>
          <p>{payment.customer_name}</p>
          <Badge type="info">{payment.status}</Badge>
        </div>
      )}
    </section>
  );
};

export default Payment
