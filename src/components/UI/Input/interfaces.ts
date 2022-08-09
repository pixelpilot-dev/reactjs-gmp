export interface IInputProps {
  id: string;
  type: 'text' | 'password' | 'tel' | 'email' | 'url';
  placeholder?: string;
  value: string | number | null;
  name: string;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
}
