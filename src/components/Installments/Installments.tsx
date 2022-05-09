import { useState } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { useLocation } from 'wouter';

import { Badge } from '@app/ds/Badge';
import { Table, TableCell } from '@app/ds/Table/Table';
import { Amount } from '@app/components/Amount/Amount';
import { getBadgeColorForStatus } from '@app/utils/getBadgeColorForStatus';
import { SORT_DIRECTIONS, SORT_FUNCTIONS } from '@app/constants/sorting';

const CellConfig: Array<TableCell<Installment>> = [
  {
    label: (
      <FormattedMessage
        id="table.header.dueDate"
        defaultMessage="Processing Date"
      />
    ),
    key: 'due_date',
    sortable: true,
    render: (row: Installment) => (
      <FormattedDate value={new Date(row.due_date)} dateStyle="long" />
    ),
  },
  {
    label: (
      <FormattedMessage id="table.header.amount" defaultMessage="Amount (€)" />
    ),
    key: 'amount',
    align: 'right',
    sortable: true,
    render: (row: Installment) => <Amount value={row.amount} />,
  },
  {
    label: <FormattedMessage id="table.header.fee" defaultMessage="Fee (€)" />,
    key: 'fee',
    align: 'right',
    sortable: true,
    render: (row: Installment) => <Amount value={row.fee} />,
  },
  {
    label: (
      <FormattedMessage id="table.header.status" defaultMessage="Status" />
    ),
    key: 'status',
    align: 'right',
    render: (row: Installment) => (
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

export const Installments = ({ payment }: { payment: Payment }) => {
  const [, gotTo] = useLocation();
  const { paymentPlan } = payment;
  const [installments, setInstallments] = useState<Installment[]>(paymentPlan);

  const sortInstallments = (key: keyof Installment) => {
    const sortedInstallments = [...paymentPlan];
    sortedInstallments.sort(
      SORT_FUNCTIONS[SORT_DIRECTIONS.ASC]((obj) => obj[key])
    );
    setInstallments(sortedInstallments);
  };

  return (
    <Table
      rows={installments}
      cells={CellConfig}
      onRowClick={(row: Installment) =>
        gotTo(`/payments/${payment.id}/installments/${row.id}`)
      }
      onHeaderClick={(key: keyof Installment) => sortInstallments(key)}
      noResultsMessage={
        <FormattedMessage
          id="page.payment.installments.no_data"
          defaultMessage="No data"
        />
      }
    />
  );
};
