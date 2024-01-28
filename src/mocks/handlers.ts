import type {
  AlertListQuery,
  AlertListQueryVariables,
  AlertViewQuery,
  AlertViewQueryVariables,
} from '@/generated/gql/graphql';
import { graphql, HttpResponse } from 'msw';
import { alerts } from './data';

export const handlers = [
  graphql.query<AlertListQuery, AlertListQueryVariables>('alertList', () =>
    HttpResponse.json({
      data: {
        alerts,
      },
    }),
  ),

  graphql.query<AlertViewQuery, AlertViewQueryVariables>(
    'alertView',
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
