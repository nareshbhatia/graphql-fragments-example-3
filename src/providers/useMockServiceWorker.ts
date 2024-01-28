import * as React from 'react';

export function useMockServiceWorker() {
  const [hasWorkerStarted, setWorkerStarted] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'object') {
      const { worker } = require('@/mocks/browser');
      worker.start({ onUnhandledRequest: 'bypass' }).then(() => {
        setWorkerStarted(true);
      });
    } else {
      setWorkerStarted(true);
    }
  }, []);

  return hasWorkerStarted;
}
