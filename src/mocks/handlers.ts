import type {
  AlertListQuery,
  AlertListQueryVariables,
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
];
