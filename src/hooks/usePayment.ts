import { useQuery } from "react-query";

import { get } from "../api";

export const usePayment = (id: string) => {
  return useQuery<Payment, unknown>(
    ["payment", id],
    () => get(`/payments/${id}`),
    {
      enabled: Boolean(id),
      retry: false,
    }
  );
};
