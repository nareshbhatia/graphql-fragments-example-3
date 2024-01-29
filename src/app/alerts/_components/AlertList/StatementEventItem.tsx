import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';
import { capitalCase } from 'change-case';

/*
 * "fragment StatementEventItem" generates:
 *   1. StatementEventItemFragment
 *   2. StatementEventItemFragmentDoc
 */
const StatementEventItemFragment = graphql(/* GraphQL */ `
  # eslint-disable-next-line @graphql-eslint/no-one-place-fragments
  fragment StatementEventItem on StatementEvent {
    id
    statementEventType
    orders {
      id
    }
  }
`);

interface StatementEventItemProps {
  event: FragmentType<typeof StatementEventItemFragment>;
}

export function StatementEventItem({
  event: eventProp,
}: StatementEventItemProps) {
  const event = getFragmentData(StatementEventItemFragment, eventProp);
  return (
    <>
      <p className="text-sm font-medium leading-6">
        {capitalCase(event.statementEventType)}
      </p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {event.orders.length} orders
      </p>
    </>
  );
}