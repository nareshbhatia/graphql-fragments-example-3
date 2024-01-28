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
  # eslint-disable-next-line @graphql-eslint/no-one-place-fragments
  fragment StatementEventView on StatementEvent {
    id
    statementEventType
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
  const { orders } = event;
  return (
    <div className="bg-elevation-1 flex-1">
      <p className="text-sm font-medium leading-6">
        {capitalCase(event.statementEventType)}
      </p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {orders.length} orders
      </p>
      {orders.map((order) => (
        <OrderView key={order.id} order={order} />
      ))}
    </div>
  );
}
