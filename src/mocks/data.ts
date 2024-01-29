import { faker } from '@faker-js/faker';
import { OrderEventType, StatementEventType } from '@/generated/gql/graphql';
import type {
  Account,
  Alert,
  Order,
  OrderEvent,
  StatementEvent,
} from '@/generated/gql/graphql';

faker.seed(42);

export const accounts: Account[] = Array.from(Array(100)).map(() => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    __typename: 'Account',
    id: faker.string.uuid(),
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
  };
});

/**
 * Creates some orders for each account
 */
export const orders: Order[] = accounts
  .map((account) => {
    const numOrders = faker.number.int({ min: 1, max: 20 });
    return Array.from(Array(numOrders)).map(() => {
      return {
        __typename: 'Order',
        id: faker.string.uuid(),
        account,
        total: faker.number.float({ min: 10, max: 2000, fractionDigits: 2 }),
      } as Order;
    });
  })
  .flat();

export const orderEvents: OrderEvent[] = Array.from(Array(100)).map(() => {
  return {
    __typename: 'OrderEvent',
    id: faker.string.uuid(),
    orderEventType: faker.helpers.enumValue(OrderEventType),
    order: faker.helpers.arrayElement(orders),
  };
});

/**
 * Creates a statement for each account
 */
export const statementEvents: StatementEvent[] = accounts.map((account) => {
  // collect orders for the account
  const filteredOrders = orders.filter(
    (order) => order.account.id === account.id,
  );

  return {
    __typename: 'StatementEvent',
    id: faker.string.uuid(),
    statementEventType: faker.helpers.enumValue(StatementEventType),
    account,
    orders: filteredOrders,
  };
});

export const orderAlerts: Alert[] = orderEvents.map((event) => {
  return {
    __typename: 'Alert',
    id: faker.string.uuid(),
    event,
  };
});

export const statementAlerts: Alert[] = statementEvents.map((event) => {
  return {
    __typename: 'Alert',
    id: faker.string.uuid(),
    event,
  };
});

export const alerts = faker.helpers.shuffle([
  ...orderAlerts,
  ...statementAlerts,
]);
