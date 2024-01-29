import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatAsMoney } from '@/lib/utils';

/*
 * "fragment OrderView" generates:
 *   1. OrderViewFragment
 *   2. OrderViewFragmentDoc
 */
const OrderViewFragment = graphql(/* GraphQL */ `
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
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium">
            {account.firstName} {account.lastName}
          </CardTitle>
          <CardDescription>{account.email}</CardDescription>
        </div>
        <p className="text-xs text-muted-foreground">
          {order.id.split('-')[0]}
        </p>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${formatAsMoney(order.total)}</div>
      </CardContent>
    </Card>
  );
}
