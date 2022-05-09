import { FormattedDate, FormattedMessage } from 'react-intl';
import { useLocation } from 'wouter';

import { Badge } from '@app/ds/Badge';
import { Spinner } from '@app/ds/Spinner';
import { Table, TableCell } from '@app/ds/Table/Table';
import { SORT_DIRECTIONS } from '@app/constants/sorting';
import { usePayments } from '@app/hooks/usePayments';
import { getBadgeColorForStatus } from '@app/utils/getBadgeColorForStatus';
import { PageHeader } from '@app/components/PageHeader/PageHeader';
import { Amount } from '@app/components/Amount/Amount';
import { FilterBar } from '@app/components/FilterBar/FilterBar';

const CellConfig: Array<TableCell<PaymentInList>> = [
  {
    label: (
      <FormattedMessage
        id="table.header.customer"
        defaultMessage="Customer Name"
      />
    ),
    key: 'customer_name',
    maxWidth: '30%',
  },
  {
    label: (
      <FormattedMessage id="table.header.merchant" defaultMessage="Merchant" />
    ),
    key: 'merchant',
    render: (row: PaymentInList) => row.merchant.name,
    maxWidth: '30%',
  },
  {
    label: (
      <FormattedMessage id="table.header.amount" defaultMessage="Amount (€)" />
    ),
    key: 'amount',
    align: 'right',
    sortable: true,
    render: (row: PaymentInList) => <Amount value={row.amount} />,
  },
  {
    label: <FormattedMessage id="table.header.created" defaultMessage="On" />,
    key: 'created',
    render: (row: PaymentInList) => (
      <FormattedDate value={new Date(row.created)} dateStyle="long" />
    ),
  },
  {
    label: (
      <FormattedMessage id="table.header.status" defaultMessage="Status" />
    ),
    key: 'status',
    render: (row: PaymentInList) => (
      <Badge type={getBadgeColorForStatus(row.status)}>
        <FormattedMessage
          id={`status.${row.status}`}
          defaultMessage={row.status}
        />
      </Badge>
    ),
    sortable: true,
    align: 'right',
  },
];

export const Payments = (): JSX.Element => {
  const { payments, isError, isLoading, sortRows, filter } = usePayments();

  const [, gotTo] = useLocation();

  return (
    <section>
      <PageHeader>
        <FormattedMessage id="page.payments.title" defaultMessage="Payments" />
      </PageHeader>
      <FilterBar onChange={filter} />
      {isLoading && <Spinner />}
      {isError && <div>Failed to load</div>}
      {!isLoading && !isError && payments ? (
        <Table
          rows={payments}
          cells={CellConfig}
          onRowClick={(row: PaymentInList) => gotTo(`/payments/${row.id}`)}
          onHeaderClick={(key: keyof PaymentInList) => {
            sortRows(key as keyof PaymentInList, SORT_DIRECTIONS.ASC);
          }}
          noResultsMessage={
            <FormattedMessage
              id="page.payments.table.no_data"
              defaultMessage="No data"
            />
          }
        />
      ) : null}
    </section>
  );
};

export default Payments;
