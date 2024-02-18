import type {
  AlertListQuery,
  AlertListQueryVariables,
  AlertPageQuery,
  AlertPageQueryVariables,
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
