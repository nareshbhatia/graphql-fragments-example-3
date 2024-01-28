import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import { capitalCase } from 'change-case';

/*
 * "fragment StatementAlertView" generates:
 *   1. StatementAlertViewFragment
 *   2. StatementAlertViewFragmentDoc
 */
const StatementAlertViewFragment = graphql(/* GraphQL */ `
  # eslint-disable-next-line @graphql-eslint/no-one-place-fragments
  fragment StatementAlertView on Alert {
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

interface StatementAlertViewProps {
  alert: FragmentType<typeof StatementAlertViewFragment>;
}

export function StatementAlertView({
  alert: alertProp,
}: StatementAlertViewProps) {
  const alert = getFragmentData(StatementAlertViewFragment, alertProp);
  const { event } = alert;
  return (
    <div className="bg-elevation-1 flex-1">
      <p className="text-sm font-medium leading-6">
        {capitalCase(event.statementEventType)}
      </p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {event.orders.length} orders
      </p>
    </div>
  );
}
