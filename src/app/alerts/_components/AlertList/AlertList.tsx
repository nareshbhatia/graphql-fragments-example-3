'use client';

import { graphql } from '@/generated/gql';
import { useQuery } from '@apollo/client';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { isOrderEvent, isStatementEvent } from '@/models';
import { cn } from '@/lib/utils';
import { OrderAlertItem } from './OrderAlertItem';
import { StatementAlertItem } from './StatementAlertItem';
import Link from 'next/link';

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
          id
        }
        ... on StatementEvent {
          id
        }
      }
      ...OrderAlertItem
      ...StatementAlertItem
    }
  }
`);

export function AlertList() {
  const { data, loading, error } = useQuery(alertListDocument);

  // extract selectedAlertId from a pathname like '/alerts/[id]'
  const pathname = usePathname();
  const [_blank, _alerts, selectedAlertId] = pathname.split('/');

  if (loading) {
    return <div className="p-4 w-80 shrink-0">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 w-80 shrink-0">Error: {error.message}</div>;
  }

  const alerts = data?.alerts;
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
                {isOrderEvent(event) ? (
                  <OrderAlertItem alert={alert} />
                ) : undefined}
                {isStatementEvent(event) ? (
                  <StatementAlertItem alert={alert} />
                ) : undefined}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
