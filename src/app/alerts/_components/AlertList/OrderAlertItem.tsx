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

export function OrderAlertItem(props: OrderAlertItemProps) {
  // eslint-disable-next-line react/destructuring-assignment
  const alert = getFragmentData(OrderAlertItemFragment, props.alert);
  const { event } = alert;
  return (
    <>
      <p className="text-sm font-medium leading-none">
        {capitalCase(event.orderEventType)}
      </p>
      <p className="text-sm text-muted-foreground">
        {event.order.id.split('-')[0]}
      </p>
    </>
  );
}
