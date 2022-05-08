import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  },
});
