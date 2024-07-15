export type AlertType = 'success' | 'info' | 'warning' | 'error';

export interface AlertProps {
  title?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  description?: string;
  closable?: boolean;
  closeText?: string;
  showIcon?: boolean;
  center?: boolean;
  effect?: 'light' | 'dark';
}

export interface AlertEmits {
  (e: 'close'): void;
}

export interface AlertInstance {
  close: () => void;
  open: () => void;
}