import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as BaseApolloProvider,
  HttpLink,
} from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { useMemo } from 'react';

export interface ApolloProviderProps {
  baseApiUrl?: string;
  children?: React.ReactNode;
}

export function ApolloProvider({
  baseApiUrl = 'http://localhost:3000',
  children,
}: ApolloProviderProps) {
  const isInTestMode = process.env.NODE_ENV === 'test';

  /*
   * ApolloClient will throw an error because fetch is not defined in the Node environment.
   * We provide an alternative fetch client just for tests.
   */
  const { fetch } = require('cross-fetch') as {
    fetch: (
      input: RequestInfo | URL,
      init?: RequestInit | undefined,
    ) => Promise<Response>;
  };

  const client = useMemo(() => {
    if (process.env.NODE_ENV !== 'production') {
      loadDevMessages();
      loadErrorMessages();
    }

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: baseApiUrl,
        credentials: 'include',
        fetch: isInTestMode ? fetch : undefined,
      }),
      connectToDevTools: true,
    });
  }, [fetch, baseApiUrl, isInTestMode]);

  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
}
