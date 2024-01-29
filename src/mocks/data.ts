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

export const orders: Order[] = Array.from(Array(100)).map(() => {
  return {
    __typename: 'Order',
    id: faker.string.uuid(),
    account: faker.helpers.arrayElement(accounts),
    total: faker.number.float({ min: 10, max: 2000, fractionDigits: 2 }),
  };
});

export const orderEvents: OrderEvent[] = Array.from(Array(100)).map(() => {
  return {
    __typename: 'OrderEvent',
    id: faker.string.uuid(),
    orderEventType: faker.helpers.enumValue(OrderEventType),
    order: faker.helpers.arrayElement(orders),
  };
});

export const statementEvents: StatementEvent[] = Array.from(Array(100)).map(
  () => {
    return {
      __typename: 'StatementEvent',
      id: faker.string.uuid(),
      statementEventType: faker.helpers.enumValue(StatementEventType),
      orders: faker.helpers.arrayElements(orders, { min: 1, max: 10 }),
    };
  },
);

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

export const alerts = faker.helpers.arrayElements(
  [...orderAlerts, ...statementAlerts],
  50,
);
