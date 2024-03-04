import { OrderEventItem } from './OrderEventItem';
import { StatementEventItem } from './StatementEventItem';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import { PreferredAlertTypeOrder } from '@/models';
import { cn } from '@/lib/utils';
import { capitalCase } from 'change-case';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { sortBy, groupBy } from 'lodash';
import * as React from 'react';

const baseStyles = 'bg-background w-80 shrink-0 overflow-auto';

/*
 * "fragment AlertItem" generates:
 *   1. AlertItemFragment
 *   2. AlertItemFragmentDoc
 */
const AlertItemFragment = graphql(/* GraphQL */ `
  fragment AlertItem on Alert {
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
`);

export interface AlertListProps {
  alerts: FragmentType<typeof AlertItemFragment>[];
}

export function AlertList({ alerts: alertsProp }: AlertListProps) {
  const alerts = getFragmentData(AlertItemFragment, alertsProp);

  // extract selectedAlertId from a pathname like '/alerts/[id]'
  const pathname = usePathname();
  const [_blank, _alerts, selectedAlertId] = pathname.split('/');

  const router = useRouter();

  React.useEffect(() => {
    if (alerts && alerts.length > 0 && !selectedAlertId) {
      // TODO: extract into `sortAndGroupAlerts()` function with correct types
      const groupedAlertsStep1 = groupBy(alerts, (alert) => alert.alertType);
      const groupedAlerts = PreferredAlertTypeOrder.map((alertType) => ({
        alertType,
        alerts: sortBy(groupedAlertsStep1[alertType], [(alert) => alert.id]),
      })).filter(({ alerts }) => alerts.length > 0);
      if (groupedAlerts.length > 0 && groupedAlerts[0].alerts) {
        router.push(`/alerts/${groupedAlerts[0]?.alerts[0].id}`);
      }
    }
  }, [alerts, router, selectedAlertId]);

  // TODO: extract into `sortAndGroupAlerts()` function with correct types
  const groupedAlertsStep1 = groupBy(alerts, (alert) => alert.alertType);
  const groupedAlerts = PreferredAlertTypeOrder.map((alertType) => ({
    alertType,
    alerts: sortBy(groupedAlertsStep1[alertType], [(alert) => alert.id]),
  })).filter(({ alerts }) => alerts.length > 0);

  /*
   * The structure under AccordionItem is to make sure that accordion headers
   * an accordion content are peers. This is required for the sticky headers
   * to work correctly (position: sticky).
   */
  return (
    <div className={baseStyles}>
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
