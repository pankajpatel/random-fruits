import { useQuery } from "react-query";
import { useEffect, useState } from "react";

import { get } from "../api";
import { SORT_DIRECTIONS, SORT_FUNCTIONS } from "../constants/sorting";

export const usePayments = () => {
  const [payments, setPayments] = useState<PaymentInList[]>([]);
  const queryResult = useQuery<PaymentInList[], unknown>(
    "payments",
    () => get("/payments"),
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
    if (sortByKey === "merchant") {
      return;
    }
    const sortedRows = [...payments].sort(
      SORT_FUNCTIONS[sortDirection]((obj) => obj[sortByKey])
    );
    setPayments(sortedRows);
  };

  return {
    ...queryResult,
    payments,
    sortRows,
  };
};
