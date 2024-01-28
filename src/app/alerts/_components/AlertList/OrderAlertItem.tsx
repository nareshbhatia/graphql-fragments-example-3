import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import { capitalCase } from 'change-case';

/*
 * "fragment OrderAlertItem" generates:
 *   1. OrderAlertItemFragment
 *   2. OrderAlertItemFragmentDoc
 */
const OrderAlertItemFragment = graphql(/* GraphQL */ `
  # eslint-disable-next-line @graphql-eslint/no-one-place-fragments
  fragment OrderAlertItem on Alert {
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

interface OrderAlertItemProps {
  alert: FragmentType<typeof OrderAlertItemFragment>;
}

export function OrderAlertItem({ alert: alertProp }: OrderAlertItemProps) {
  const alert = getFragmentData(OrderAlertItemFragment, alertProp);
  const { event } = alert;
  return (
    <>
      <p className="text-sm font-medium leading-6">
        {capitalCase(event.orderEventType)}
      </p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {event.order.id.split('-')[0]}
      </p>
    </>
  );
}
