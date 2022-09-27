import { IMovieProps } from '../../../core/types/IMovieProps';
import { IPromoNotificationProps } from '../../UI/PromoNotification/interfaces';

export interface IMovieCardProps {
  movie: IMovieProps;
  className?: string;
  onSuccessModal?: (notification: IPromoNotificationProps) => void;
}
