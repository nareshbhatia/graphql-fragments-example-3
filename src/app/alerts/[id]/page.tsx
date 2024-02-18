'use client';

import { AlertView } from './_components/AlertView';
import { graphql } from '@/generated/gql';
import { useQuery } from '@apollo/client';

const baseStyles = 'px-4 py-6 h-full flex flex-1 justify-center items-center';

/*
 * "query alertPage" generates:
 *   1. AlertPageQuery
 *   2. AlertPageQueryVariables
 *   3. AlertPageDocument
 */
const alertPageDocument = graphql(/* GraphQL */ `
  query alertPage($id: ID!) {
    alert(id: $id) {
      id
      ...AlertView
    }
  }
`);

export interface AlertPageProps {
  params: { id: string };
}

export default function AlertPage({ params }: AlertPageProps) {
  const { data, loading, error } = useQuery(alertPageDocument, {
    variables: {
      id: params.id,
    },
  });
  const alert = data?.alert;

  if (loading) {
    return <div className={baseStyles}>Loading...</div>;
  }

  if (error) {
    return <div className={baseStyles}>Error: {error.message}</div>;
  }

  if (!alert) {
    return <div className={baseStyles}>Error: Alert not found</div>;
  }

  return <AlertView alert={alert} />;
}
