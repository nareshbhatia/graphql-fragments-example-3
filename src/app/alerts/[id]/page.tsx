import { AlertView } from './_components/AlertView';

export interface AlertPageProps {
  params: { id: string };
}

export default function AlertPage({ params }: AlertPageProps) {
  return <AlertView alertId={params.id} />;
}
