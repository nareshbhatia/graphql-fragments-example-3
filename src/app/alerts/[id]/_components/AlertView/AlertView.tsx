import { OrderAlertView } from './OrderAlertView';
import { StatementAlertView } from './StatementAlertView';
import type { FragmentType } from '@/generated/gql';
import { graphql, getFragmentData } from '@/generated/gql';

/*
 * "fragment AlertView" generates:
 *   1. AlertViewFragment
 *   2. AlertViewFragmentDoc
 */
const AlertViewFragment = graphql(/* GraphQL */ `
  fragment AlertView on Alert {
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
`);

export interface AlertViewProps {
  alert: FragmentType<typeof AlertViewFragment>;
}

export function AlertView({ alert: alertProp }: AlertViewProps) {
  const alert = getFragmentData(AlertViewFragment, alertProp);
  const { event } = alert;

  return (
    <div className="px-4 py-6 h-full flex flex-1 flex-col">
      {event.__typename === 'OrderEvent' && <OrderAlertView alert={alert} />}
      {event.__typename === 'StatementEvent' && (
        <StatementAlertView alert={alert} />
      )}
    </div>
  );
}
