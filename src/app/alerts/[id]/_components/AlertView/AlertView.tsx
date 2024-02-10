'use client';

import { OrderEventView } from './OrderEventView';
import { StatementEventView } from './StatementEventView';
import { graphql } from '@/generated/gql';
import { useQuery } from '@apollo/client';

/*
 * "query alertView" generates:
 *   1. AlertViewQuery
 *   2. AlertViewQueryVariables
 *   3. AlertViewDocument
 */
const alertViewDocument = graphql(/* GraphQL */ `
  query alertView($id: ID!) {
    alert(id: $id) {
      id
      event {
        ... on OrderEvent {
          id
        }
        ... on StatementEvent {
          id
        }
      }
      ...OrderEventView
      ...StatementEventView
    }
  }
`);

export interface AlertViewProps {
  alertId: string;
}

export function AlertView({ alertId }: AlertViewProps) {
  const { data, loading, error } = useQuery(alertViewDocument, {
    variables: {
      id: alertId,
    },
  });
  const alert = data?.alert;

  if (loading) {
    return <div className="p-4 h-full flex-1">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 h-full flex-1">Error: {error.message}</div>;
  }

  if (!alert) {
    return <div className="p-4 h-full flex-1">Error: Alert not found</div>;
  }

  const { event } = alert;

  return (
    <div className="px-4 py-6 h-full flex flex-1 flex-col">
      {event.__typename === 'OrderEvent' && <OrderEventView alert={alert} />}
      {event.__typename === 'StatementEvent' && (
        <StatementEventView alert={alert} />
      )}
    </div>
  );
}
