'use client';

import { ApolloProvider } from './ApolloProvider';
import { useMockServiceWorker } from './useMockServiceWorker';
import { ThemeProvider } from './ThemeProvider';

export interface AppProviderProps {
  children?: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const hasWorkerStarted = useMockServiceWorker();
  if (!hasWorkerStarted) {
    return undefined;
  }

  return (
    <ThemeProvider>
      <ApolloProvider>{children}</ApolloProvider>
    </ThemeProvider>
  );
}
