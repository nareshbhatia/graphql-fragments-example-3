'use client';

import { OrderEventItem } from './OrderEventItem';
import { StatementEventItem } from './StatementEventItem';
import { graphql } from '@/generated/gql';
import { cn } from '@/lib/utils';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

/*
 * "query alertList" generates:
 *   1. AlertListQuery
 *   2. AlertListQueryVariables
 *   3. AlertListDocument
 */
const alertListDocument = graphql(/* GraphQL */ `
  query alertList {
    alerts {
      id
      event {
        ... on OrderEvent {
          ...OrderEventItem
        }
        ... on StatementEvent {
          ...StatementEventItem
        }
      }
    }
  }
`);

export function AlertList() {
  const { data, loading, error } = useQuery(alertListDocument);
  const alerts = data?.alerts;

  // extract selectedAlertId from a pathname like '/alerts/[id]'
  const pathname = usePathname();
  const [_blank, _alerts, selectedAlertId] = pathname.split('/');

  const router = useRouter();

  React.useEffect(() => {
    if (alerts && alerts.length > 0 && !selectedAlertId) {
      router.push(`/alerts/${alerts[0].id}`);
    }
  }, [alerts, router, selectedAlertId]);

  if (loading) {
    return <div className="p-4 w-80 shrink-0">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 w-80 shrink-0">Error: {error.message}</div>;
  }

  if (!alerts) {
    return <div className="p-4 w-80 shrink-0">Error: Alerts not found</div>;
  }

  return (
    <div className="p-4 w-80 shrink-0 overflow-auto">
      <ul role="list" className="divide-y divide-border">
        {alerts.map((alert) => {
          const { event } = alert;
          const selected = alert.id === selectedAlertId;
          return (
            <li
              key={alert.id}
              data-id={alert.id}
              className={cn(
                'px-4 py-4 hover:bg-accent',
                selected && 'bg-selected',
              )}
            >
              <Link href={`/alerts/${alert.id}`}>
                {event.__typename === 'OrderEvent' && (
                  <OrderEventItem event={event} />
                )}
                {event.__typename === 'StatementEvent' && (
                  <StatementEventItem event={event} />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
