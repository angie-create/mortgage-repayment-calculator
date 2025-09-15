export interface MortgageFormData {
  amount: string;
  term: string;
  rate: string;
  type: 'repayment' | 'interestOnly';
}

export interface MortgageResults {
  monthlyRepayment: number;
  totalRepayment: number;
}

export interface ValidationError {
  field: keyof MortgageFormData;
  message: string;
}

export interface FormFieldProps {
  label: string;
  name: keyof MortgageFormData;
  type?: 'text' | 'number';
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export interface RadioGroupProps {
  name: keyof MortgageFormData;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export interface RadioOption {
  value: string;
  label: string;
}