export type TInputProperties = {
  name: string;
  type?: string;
  checked?: boolean;
  disabled?: boolean;
  max?: number;
  maxLength?: number;
  min?: number;
  minLength?: number;
  pattern?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
};

export type TButtonProps = {
  name: string;
  value?: string;
  autofocus?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  color?: 'secondary' | 'alert' | 'danger';
};
