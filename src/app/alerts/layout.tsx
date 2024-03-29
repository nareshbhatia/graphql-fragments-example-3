'use client';

import { AlertList } from './_components/AlertList';
import { graphql } from '@/generated/gql';
import { useQuery } from '@apollo/client';

const baseStyles = 'flex min-h-0 h-screen flex-1 gap-1';

/*
 * "query alertsPage" generates:
 *   1. AlertsPageQuery
 *   2. AlertsPageQueryVariables
 *   3. AlertsPageDocument
 */
const alertsPageDocument = graphql(/* GraphQL */ `
  query alertsPage {
    alertsWithCounts {
      alerts {
        id
        ...AlertItem
      }
      counts {
        orderAlerts
        statementAlerts
      }
    }
  }
`);

export interface AlertsLayoutProps {
  children: React.ReactNode;
}

export default function AlertsLayout({ children }: AlertsLayoutProps) {
  const { data, loading, error } = useQuery(alertsPageDocument);
  const alertsWithCounts = data?.alertsWithCounts;

  if (loading) {
    return <div className={baseStyles}>Loading...</div>;
  }

  if (error) {
    return <div className={baseStyles}>Error: {error.message}</div>;
  }

  if (!alertsWithCounts) {
    return <div className={baseStyles}>Error: Alerts not found</div>;
  }

  const { alerts, counts } = alertsWithCounts;
  console.log('----> counts', counts);

  return (
    <div className={baseStyles}>
      <AlertList alerts={alerts} />
      {children}
    </div>
  );
}
