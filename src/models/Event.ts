import type { RecursivePartial } from './types';
import type { Event } from '@/generated/gql/graphql';

export function isOrderEvent(event: RecursivePartial<Event>) {
  return event.__typename === 'OrderEvent';
}

export function isStatementEvent(event: RecursivePartial<Event>) {
  return event.__typename === 'StatementEvent';
}
