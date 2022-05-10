import { useQuery, UseQueryResult } from 'react-query';
import { useCallback, useEffect, useState } from 'react';

import { get } from '@app/api';
import { SORT_DIRECTIONS, SORT_FUNCTIONS } from '@app/constants/sorting';

type SortDirection = keyof typeof SORT_DIRECTIONS;

interface UsePayments {
  payments?: PaymentInList[];
  sortRows: (
    sortByKey: keyof PaymentInList,
    sortDirection?: SortDirection
  ) => void;
  filter: (val: string) => void;
}

type SortOrder = [keyof PaymentInList, SortDirection] | null | undefined;

const getSortDirection = (
  key: keyof PaymentInList,
  direction?: SortDirection,
  previousSortOrder?: SortOrder
) => {
  if (direction) {
    return direction;
  }

  if (!previousSortOrder) {
    return SORT_DIRECTIONS.ASC;
  }

  return previousSortOrder[0] === key &&
    previousSortOrder[1] === SORT_DIRECTIONS.ASC
    ? SORT_DIRECTIONS.DESC
    : SORT_DIRECTIONS.ASC;
};

export const usePayments = (): UsePayments &
  UseQueryResult<PaymentInList[]> => {
  const [sortOrder, setSortOrder] = useState<SortOrder>();
  const [payments, setPayments] = useState<PaymentInList[]>();
  const queryResult = useQuery<PaymentInList[], unknown>(
    'payments',
    () => get('/payments'),
    {
      retry: false,
      refetchOnMount: true,
    }
  );

  const { data } = queryResult;

  const sortRows = useCallback(
    (sortByKey: keyof PaymentInList, sortDirection?: SortDirection) => {
      if (sortByKey === 'merchant') {
        return;
      }
      const direction = getSortDirection(sortByKey, sortDirection, sortOrder);

      const sortedRows = [...(data ?? [])].sort(
        SORT_FUNCTIONS[direction]((obj) => obj[sortByKey])
      );
      setSortOrder([sortByKey, direction]);
      setPayments(sortedRows);
    },
    [data, sortOrder]
  );

  useEffect(() => {
    if (data && sortOrder?.[0] !== 'status' && sortOrder?.[1] !== 'ASC') {
      sortRows('status', SORT_DIRECTIONS.ASC);
    }
    // Adding sortRows to the dependencies array will cause the infinite loop as the callback is called again
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const filter = (_val: string) => {
    const val = _val.toLowerCase();
    const filteredRows = (data || []).filter((row) => {
      return (
        row.customer_name.toLowerCase().includes(val) ||
        row.merchant.name.toLowerCase().includes(val)
      );
    });
    setPayments(filteredRows);
  };

  return {
    ...queryResult,
    payments,
    sortRows,
    filter,
  };
};
