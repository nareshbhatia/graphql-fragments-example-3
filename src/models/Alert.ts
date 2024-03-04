import {
  AlertType,
  OrderEventType,
  StatementEventType,
} from '@/generated/gql/graphql';

export const OrderEventTypeToAlertType: Record<OrderEventType, AlertType> = {
  [OrderEventType.OrderDelayed]: AlertType.OrderDelayed,
  [OrderEventType.OrderReceived]: AlertType.OrderReceived,
  [OrderEventType.OrderShipped]: AlertType.OrderShipped,
};

export const StatementEventTypeToAlertType: Record<
  StatementEventType,
  AlertType
> = {
  [StatementEventType.StatementCreated]: AlertType.StatementCreated,
};

export const PreferredAlertTypeOrder: AlertType[] = [
  AlertType.OrderReceived,
  AlertType.OrderShipped,
  AlertType.OrderDelayed,
  AlertType.StatementCreated,
];
