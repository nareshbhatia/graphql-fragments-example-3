import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';

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

export function StatementAlertItem(props: StatementAlertItemProps) {
  // eslint-disable-next-line react/destructuring-assignment
  const alert = getFragmentData(StatementAlertItemFragment, props.alert);
  const { event } = alert;
  return (
    <>
      <p className="text-sm font-medium leading-none">
        {event.statementEventType}
      </p>
      <p className="text-sm text-muted-foreground">
        {event.orders.length} orders
      </p>
    </>
  );
}
