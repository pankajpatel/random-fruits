import { useQuery, UseQueryResult } from 'react-query';
import { useEffect, useState } from 'react';

import { get } from '../api';
import { SORT_DIRECTIONS, SORT_FUNCTIONS } from '../constants/sorting';

interface UsePayments {
  payments: PaymentInList[];
  sortRows: (
    sortByKey: keyof PaymentInList,
    sortDirection: keyof typeof SORT_DIRECTIONS
  ) => void;
  filter: (val: string) => void;
}

export const usePayments = (): UsePayments &
  UseQueryResult<PaymentInList[]> => {
  const [payments, setPayments] = useState<PaymentInList[]>([]);
  const queryResult = useQuery<PaymentInList[], unknown>(
    'payments',
    () => get('/payments'),
    {
      retry: false,
    }
  );

  const { data } = queryResult;

  useEffect(() => {
    if (data) {
      setPayments(data);
    }
  }, [data]);

  const sortRows = (
    sortByKey: keyof PaymentInList,
    sortDirection: keyof typeof SORT_DIRECTIONS
  ) => {
    if (sortByKey === 'merchant') {
      return;
    }
    const sortedRows = [...payments].sort(
      SORT_FUNCTIONS[sortDirection]((obj) => obj[sortByKey])
    );
    setPayments(sortedRows);
  };

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
