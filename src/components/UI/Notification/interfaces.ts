import { TNotificationType } from '../../../core/types/TNotificationType';

export interface INotificationProps {
  type: TNotificationType;
  children: React.ReactNode;
  className?: string;
}
