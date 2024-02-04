import type { Alert } from '@/generated/gql/graphql';
import {
  AlertType,
  OrderEventType,
  StatementEventType,
} from '@/generated/gql/graphql';
import { sortBy, groupBy } from 'lodash';

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

const PreferredAlertTypeOrder: AlertType[] = [
  AlertType.OrderReceived,
  AlertType.OrderShipped,
  AlertType.OrderDelayed,
  AlertType.StatementCreated,
];

export type AlertSortAndGroupPartial = Pick<Alert, 'id' | 'alertType'>;

const alertSort: ((alert: AlertSortAndGroupPartial) => unknown)[] = [
  (alert) => alert.id, // force deterministic sorting of alerts
];

/**
 * @returns
 *   {
 *     alertType: AlertType;
 *     alerts: AlertSortAndGroupPartial[];
 *   }[]
 */
export function sortAndGroupAlerts(alerts: AlertSortAndGroupPartial[]) {
  const groupedAlerts = groupBy(alerts, (alert) => alert.alertType);
  return PreferredAlertTypeOrder.map((alertType) => ({
    alertType,
    alerts: sortBy(groupedAlerts[alertType], alertSort),
  })).filter(({ alerts }) => alerts.length > 0);
}
