import { OrderView } from '@/app/alerts/[id]/_components/AlertView/OrderView';
import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import { capitalCase } from 'change-case';

/*
 * "fragment StatementEventView" generates:
 *   1. StatementEventViewFragment
 *   2. StatementEventViewFragmentDoc
 */
const StatementEventViewFragment = graphql(/* GraphQL */ `
  fragment StatementEventView on StatementEvent {
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
`);

interface StatementEventViewProps {
  event: FragmentType<typeof StatementEventViewFragment>;
}

export function StatementEventView({
  event: eventProp,
}: StatementEventViewProps) {
  const event = getFragmentData(StatementEventViewFragment, eventProp);
  const { account, orders } = event;
  return (
    <div className="flex-1 flex flex-col h-full gap-4">
      <div>
        <p className="text-lg font-medium leading-6">
          {capitalCase(event.statementEventType)}
        </p>
        <p className="text-xs text-muted-foreground">
          {orders.length} orders for {account.firstName} {account.lastName}
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-auto">
        {orders.map((order) => (
          <OrderView key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
