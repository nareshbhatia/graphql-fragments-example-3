import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import { capitalCase } from 'change-case';

/*
 * "fragment StatementAlertItem" generates:
 *   1. StatementAlertItemFragment
 *   2. StatementAlertItemFragmentDoc
 */
const StatementAlertItemFragment = graphql(/* GraphQL */ `
  # eslint-disable-next-line @graphql-eslint/no-one-place-fragments
  fragment StatementAlertItem on Alert {
    id
    event {
      ... on StatementEvent {
        id
        statementEventType
        orders {
          id
        }
      }
    }
  }
`);

interface StatementAlertItemProps {
  alert: FragmentType<typeof StatementAlertItemFragment>;
}

export function StatementAlertItem({
  alert: alertProp,
}: StatementAlertItemProps) {
  const alert = getFragmentData(StatementAlertItemFragment, alertProp);
  const { event } = alert;
  return (
    <>
      <p className="text-sm font-medium leading-6">
        {capitalCase(event.statementEventType)}
      </p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {event.orders.length} orders
      </p>
    </>
  );
}
