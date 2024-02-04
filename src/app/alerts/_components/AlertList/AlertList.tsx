'use client';

import { OrderEventItem } from './OrderEventItem';
import { StatementEventItem } from './StatementEventItem';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { graphql } from '@/generated/gql';
import { AlertType } from '@/generated/gql/graphql';
import type { AlertSortAndGroupPartial } from '@/models';
import { sortAndGroupAlerts } from '@/models';
import { cn } from '@/lib/utils';
import { useQuery } from '@apollo/client';
import { capitalCase } from 'change-case';
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
      alertType
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

  // define interface for sorting and grouping
  interface GroupedAlerts {
    alertType: AlertType;
    alerts: typeof alerts;
  }

  // extract selectedAlertId from a pathname like '/alerts/[id]'
  const pathname = usePathname();
  const [_blank, _alerts, selectedAlertId] = pathname.split('/');

  const router = useRouter();

  React.useEffect(() => {
    if (alerts && alerts.length > 0 && !selectedAlertId) {
      const groupedAlerts = sortAndGroupAlerts(
        alerts as AlertSortAndGroupPartial[],
      ) as GroupedAlerts[];
      if (groupedAlerts.length > 0 && groupedAlerts[0].alerts) {
        router.push(`/alerts/${groupedAlerts[0]?.alerts[0].id}`);
      }
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

  const groupedAlerts = sortAndGroupAlerts(
    alerts as AlertSortAndGroupPartial[],
  ) as GroupedAlerts[];

  /*
   * The structure under AccordionItem is to make sure that accordion headers
   * an accordion content are peers. This is required for the sticky headers
   * to work correctly (position: sticky).
   */
  return (
    <div className="bg-background w-80 shrink-0 overflow-auto">
      <Accordion
        type="multiple"
        defaultValue={groupedAlerts.map((group) => group.alertType)}
        asChild
      >
        <ul>
          {groupedAlerts.map(({ alertType, alerts }) => {
            return alerts !== undefined ? (
              <AccordionItem value={alertType} asChild>
                <>
                  <li className="bg-background sticky top-0 z-10">
                    <AccordionTrigger className="px-4 py-4">
                      {capitalCase(alertType)}
                    </AccordionTrigger>
                  </li>
                  <AccordionContent asChild>
                    <li>
                      <ul>
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
                    </li>
                  </AccordionContent>
                </>
              </AccordionItem>
            ) : undefined;
          })}
        </ul>
      </Accordion>
    </div>
  );
}
