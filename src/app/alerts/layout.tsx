import { AlertList } from './_components/AlertList';

export interface AlertsLayoutProps {
  children: React.ReactNode;
}

export default function AlertsLayout({ children }: AlertsLayoutProps) {
  return (
    <div className="flex min-h-0 h-screen flex-1 gap-1">
      <AlertList />
      {children}
    </div>
  );
}
