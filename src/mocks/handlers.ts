import type {
  AlertPageQuery,
  AlertPageQueryVariables,
  AlertsPageQuery,
  AlertsPageQueryVariables,
} from '@/generated/gql/graphql';
import { graphql, HttpResponse } from 'msw';
import { alerts, orderAlerts, statementAlerts } from './data';

export const handlers = [
  graphql.query<AlertsPageQuery, AlertsPageQueryVariables>('alertsPage', () => {
    const alertsWithCounts = {
      alerts,
      counts: {
        orderAlerts: orderAlerts.length,
        statementAlerts: statementAlerts.length,
      },
    };
    console.log('---> msw-handler:alertsPage', alertsWithCounts);
    return HttpResponse.json({
      data: {
        alertsWithCounts,
      },
    });
  }),

  graphql.query<AlertPageQuery, AlertPageQueryVariables>(
    'alertPage',
    ({ variables }) => {
      const { id } = variables;

      return HttpResponse.json({
        data: {
          alert: alerts.find((alert) => alert.id === id),
        },
      });
    },
  ),
];
