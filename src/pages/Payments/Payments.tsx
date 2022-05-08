import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { useLocation } from "wouter";

import { Badge } from "../../components/Badge";
import { PageHeader } from "../../components/PageHeader";
import { Select } from "../../components/Select";
import { Spinner } from "../../components/Spinner";
import { Table, TableCell } from "../../components/Table/Table";
import { SORT_DIRECTIONS } from "../../constants/sorting";
import { usePayments } from "../../hooks/usePayments";
import { getBadgeColorForStatus } from "../../utils/getBadgeColorForStatus";

const CellConfig: Array<TableCell> = [
  {
    label: "Customer Name",
    key: "customer_name",
  },
  {
    label: "Amount",
    key: "amount",
    align: "right",
    sortable: true,
  },
  {
    label: "On",
    key: "created",
    render: (row: PaymentInList) => (
      <>{new Date(row.created).toLocaleDateString()}</>
    ),
  },
  {
    label: "Status",
    key: "status",
    render: (row: PaymentInList) => (
      <Badge type={getBadgeColorForStatus(row.status)}>
        <FormattedMessage
          id={`status.${row.status}`}
          defaultMessage={row.status}
        />
      </Badge>
    ),
    sortable: true,
  },
];

const H2 = styled.h2`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const Payments = (): JSX.Element => {
  const { payments, isError, isLoading, sortRows } = usePayments();

  const [, redirect] = useLocation();
  return (
    <section>
      <PageHeader>
        <H2>
          <FormattedMessage
            id="pages.payments.title"
            defaultMessage="Payments"
          />
        </H2>
        <Select>
          <option value="en">🇬🇧</option>
          <option value="fr">🇫🇷</option>
        </Select>
      </PageHeader>
      {isLoading && <Spinner />}
      {isError && <div>Failed to load</div>}
      {!isLoading && !isError && payments.length ? (
        <Table
          rows={payments}
          cells={CellConfig}
          onRowClick={(row) => redirect(`/payments/${row.id}`)}
          onHeaderClick={(key: string) => {
            console.log(payments);

            sortRows(key as keyof PaymentInList, SORT_DIRECTIONS.ASC);
          }}
        />
      ) : null}
    </section>
  );
};

export default Payments;
