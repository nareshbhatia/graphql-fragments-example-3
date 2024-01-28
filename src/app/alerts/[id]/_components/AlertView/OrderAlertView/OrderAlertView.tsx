import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import { capitalCase } from 'change-case';

/*
 * "fragment OrderAlertView" generates:
 *   1. OrderAlertViewFragment
 *   2. OrderAlertViewFragmentDoc
 */
const OrderAlertViewFragment = graphql(/* GraphQL */ `
  # eslint-disable-next-line @graphql-eslint/no-one-place-fragments
  fragment OrderAlertView on Alert {
    id
    event {
      ... on OrderEvent {
        id
        orderEventType
        order {
          id
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
  return (
    <div className="flex-1 overflow-auto">
      <p className="text-sm font-medium leading-6">
        {capitalCase(event.orderEventType)}
      </p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {event.order.id.split('-')[0]}
      </p>
    </div>
  );
}
