import { OrderView } from '@/app/alerts/[id]/_components/AlertView/OrderView';
import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import { capitalCase } from 'change-case';

/*
 * "fragment OrderEventView" generates:
 *   1. OrderEventViewFragment
 *   2. OrderEventViewFragmentDoc
 */
const OrderEventViewFragment = graphql(/* GraphQL */ `
  # eslint-disable-next-line @graphql-eslint/no-one-place-fragments
  fragment OrderEventView on OrderEvent {
    id
    orderEventType
    order {
      ...OrderView
    }
  }
`);

interface OrderEventViewProps {
  event: FragmentType<typeof OrderEventViewFragment>;
}

export function OrderEventView({ event: eventProp }: OrderEventViewProps) {
  const event = getFragmentData(OrderEventViewFragment, eventProp);
  return (
    <div className="flex-1 overflow-auto">
      <p className="text-sm font-medium leading-6">
        {capitalCase(event.orderEventType)}
      </p>
      <OrderView order={event.order} />
    </div>
  );
}
