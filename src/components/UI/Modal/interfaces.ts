export interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: (state: boolean) => void;
}
