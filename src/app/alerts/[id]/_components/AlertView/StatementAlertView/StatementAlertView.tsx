import { OrderView } from '@/app/alerts/[id]/_components/AlertView/OrderView';
import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import type { StatementEvent } from '@/generated/gql/graphql';
import { capitalCase } from 'change-case';

/*
 * "fragment StatementAlertView" generates:
 *   1. StatementAlertViewFragment
 *   2. StatementAlertViewFragmentDoc
 */
const StatementAlertViewFragment = graphql(/* GraphQL */ `
  fragment StatementAlertView on Alert {
    id
    event {
      ... on StatementEvent {
        id
        statementEventType
        account {
          id
          firstName
          lastName
        }
        orders {
          id
          ...OrderView
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
  const statementEvent = event as StatementEvent;
  const { account, orders, statementEventType } = statementEvent;
  return (
    <div className="flex-1 flex flex-col h-full gap-4">
      <div>
        <p className="text-lg font-medium leading-6">
          {capitalCase(statementEventType)}
        </p>
        <p className="text-xs text-muted-foreground">
          {orders.length} orders for {account.firstName} {account.lastName}
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-auto">
        {orders.map((order) => (
          // @ts-expect-error suppress type error ts(2559) TODO: fix
          <OrderView key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
