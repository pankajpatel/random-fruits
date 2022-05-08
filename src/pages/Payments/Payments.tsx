import { FormattedMessage } from "react-intl";
import { useLocation } from "wouter";

import { Badge } from "@app/ds/Badge";
import { Spinner } from "@app/ds/Spinner";
import { Table, TableCell } from "@app/ds/Table/Table";
import { SORT_DIRECTIONS } from "@app/constants/sorting";
import { usePayments } from "@app/hooks/usePayments";
import { getBadgeColorForStatus } from "@app/utils/getBadgeColorForStatus";
import { PageHeader } from "@app/components/PageHeader/PageHeader";

const CellConfig: Array<TableCell<PaymentInList>> = [
  {
    label: "Customer Name",
    key: "customer_name",
  },
  {
    label: "Merchant",
    key: "merchant",
    render: (row: PaymentInList) => row.merchant.name,
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
    render: (row: PaymentInList) => new Date(row.created).toLocaleDateString(),
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

export const Payments = (): JSX.Element => {
  const { payments, isError, isLoading, sortRows, filter } = usePayments();

  const [, gotTo] = useLocation();
  return (
    <section>
      <PageHeader>
        <FormattedMessage id="pages.payments.title" defaultMessage="Payments" />
      </PageHeader>
      <div>
        <input
          type="text"
          placeholder="Filter Payments"
          onChange={(e) => filter(e.target.value)}
        />
      </div>
      {isLoading && <Spinner />}
      {isError && <div>Failed to load</div>}
      {!isLoading && !isError && payments.length ? (
        <Table
          rows={payments}
          cells={CellConfig}
          onRowClick={(row: PaymentInList) => gotTo(`/payments/${row.id}`)}
          onHeaderClick={(key: keyof PaymentInList) => {
            sortRows(key as keyof PaymentInList, SORT_DIRECTIONS.ASC);
          }}
        />
      ) : null}
    </section>
  );
};

export default Payments;
