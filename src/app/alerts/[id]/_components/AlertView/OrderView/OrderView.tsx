import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import { capitalCase } from 'change-case';

/*
 * "fragment OrderView" generates:
 *   1. OrderViewFragment
 *   2. OrderViewFragmentDoc
 */
const OrderViewFragment = graphql(/* GraphQL */ `
  # eslint-disable-next-line @graphql-eslint/no-one-place-fragments
  fragment OrderView on Order {
    id
    account {
      id
      firstName
      lastName
      email
    }
    total
  }
`);

interface OrderViewProps {
  order: FragmentType<typeof OrderViewFragment>;
}

export function OrderView({ order: orderProp }: OrderViewProps) {
  const order = getFragmentData(OrderViewFragment, orderProp);
  const { account } = order;
  return (
    <div className="flex-1 overflow-auto">
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {account.firstName} {account.lastName}
      </p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {account.email}
      </p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {order.id.split('-')[0]}
      </p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {order.total}
      </p>
    </div>
  );
}
