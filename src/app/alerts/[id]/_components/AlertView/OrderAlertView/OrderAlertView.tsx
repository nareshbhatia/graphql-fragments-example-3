import { OrderView } from '@/app/alerts/[id]/_components/AlertView/OrderView';
import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import type { OrderEvent } from '@/generated/gql/graphql';
import { capitalCase } from 'change-case';

/*
 * "fragment OrderAlertView" generates:
 *   1. OrderAlertViewFragment
 *   2. OrderAlertViewFragmentDoc
 */
const OrderAlertViewFragment = graphql(/* GraphQL */ `
  fragment OrderAlertView on Alert {
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

interface OrderAlertViewProps {
  alert: FragmentType<typeof OrderAlertViewFragment>;
}

export function OrderAlertView({ alert: alertProp }: OrderAlertViewProps) {
  const alert = getFragmentData(OrderAlertViewFragment, alertProp);
  const { event } = alert;
  const orderEvent = event as OrderEvent;
  const { order, orderEventType } = orderEvent;

  return (
    <div className="flex-1 flex flex-col h-full gap-4">
      <p className="text-sm font-medium leading-6">
        {capitalCase(orderEventType)}
      </p>
      {/* @ts-expect-error suppress type error ts(2559) TODO: fix */}
      <OrderView order={order} />
    </div>
  );
}
