import React, { ReactNode, useRef } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  DehydratedState,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getEnvVar } from '@utils/env';

interface ReactQueryProviderProps {
  children: ReactNode;
  dehydratedState?: DehydratedState;
  enableDevtools?: boolean;
}

export const ReactQueryProvider = ({
  children,
  dehydratedState,
  enableDevtools = getEnvVar('NODE_ENV') === 'development',
}: ReactQueryProviderProps) => {
  const queryClientRef = useRef<QueryClient | null>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000,
          gcTime: 15 * 60 * 1000,
          retry: (failureCount, error: any) => {
            if (error?.response?.status === 404) return false;
            return failureCount < 3;
          },
          refetchOnWindowFocus: false,
        },
      },
    });
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <HydrationBoundary state={dehydratedState}>
        {children}
        {enableDevtools && <ReactQueryDevtools initialIsOpen={false} />}
      </HydrationBoundary>
    </QueryClientProvider>
  );
};
