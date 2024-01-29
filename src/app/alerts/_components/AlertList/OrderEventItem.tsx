import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import { capitalCase } from 'change-case';

/*
 * "fragment OrderEventItem" generates:
 *   1. OrderEventItemFragment
 *   2. OrderEventItemFragmentDoc
 */
const OrderEventItemFragment = graphql(/* GraphQL */ `
  # eslint-disable-next-line @graphql-eslint/no-one-place-fragments
  fragment OrderEventItem on OrderEvent {
    id
    orderEventType
    order {
      id
      account {
        id
        firstName
        lastName
      }
    }
  }
`);

interface OrderEventItemProps {
  event: FragmentType<typeof OrderEventItemFragment>;
}

export function OrderEventItem({ event: eventProp }: OrderEventItemProps) {
  const event = getFragmentData(OrderEventItemFragment, eventProp);
  const {
    order: { account },
  } = event;

  return (
    <>
      <p className="text-sm font-medium leading-6">
        {capitalCase(event.orderEventType)}
      </p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {account.firstName} {account.lastName}
      </p>
    </>
  );
}
