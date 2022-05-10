import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { get } from '@app/api';

export const usePayment = (id: string) => {
  const paymentQuery = useQuery<Payment, unknown>(
    ['payment', id],
    () => get(`/payments/${id}`),
    {
      enabled: Boolean(id),
      retry: false,
    }
  );

  const { data } = paymentQuery;

  const [payment, setPayment] = useState<Payment | undefined>();
  useEffect(() => {
    data && setPayment(data);
  }, [data]);

  return {
    ...paymentQuery,
    payment,
  };
};
