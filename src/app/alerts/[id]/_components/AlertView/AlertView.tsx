'use client';

import { OrderAlertView } from './OrderAlertView';
import { StatementAlertView } from './StatementAlertView';
import { graphql } from '@/generated/gql';
import { isOrderEvent, isStatementEvent } from '@/models';
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
      ...OrderAlertView
      ...StatementAlertView
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

  if (loading) {
    return <div className="p-4 h-full flex-1">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 h-full flex-1">Error: {error.message}</div>;
  }

  const alert = data?.alert;
  if (!alert) {
    return <div className="p-4 h-full flex-1">Error: Alert not found</div>;
  }

  const { event } = alert;

  return (
    <div className="flex flex-1 flex-col gap-1">
      {isOrderEvent(event) ? <OrderAlertView alert={alert} /> : undefined}
      {isStatementEvent(event) ? (
        <StatementAlertView alert={alert} />
      ) : undefined}
    </div>
  );
}
