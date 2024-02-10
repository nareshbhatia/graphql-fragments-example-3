import { OrderView } from '@/app/alerts/[id]/_components/AlertView/OrderView';
import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import type { OrderEvent } from '@/generated/gql/graphql';
import { capitalCase } from 'change-case';

/*
 * "fragment OrderEventView" generates:
 *   1. OrderEventViewFragment
 *   2. OrderEventViewFragmentDoc
 */
const OrderEventViewFragment = graphql(/* GraphQL */ `
  fragment OrderEventView on Alert {
    id
    event {
      ... on OrderEvent {
        id
        orderEventType
        order {
          ...OrderView
        }
      }
    }
  }
`);

interface OrderEventViewProps {
  alert: FragmentType<typeof OrderEventViewFragment>;
}

export function OrderEventView({ alert: alertProp }: OrderEventViewProps) {
  const alert = getFragmentData(OrderEventViewFragment, alertProp);
  const { event } = alert;
  const orderEvent = event as OrderEvent;
  const { order, orderEventType } = orderEvent;

  return (
    <div className="flex-1 flex flex-col h-full gap-4">
      <p className="text-sm font-medium leading-6">
        {capitalCase(orderEventType)}
      </p>
      <OrderView order={order} />
    </div>
  );
}
