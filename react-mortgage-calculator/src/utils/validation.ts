import type { MortgageFormData } from '../types';

export const validationRules = {
  amount: {
    required: 'This field is required',
    pattern: {
      value: /^\d+(\.\d{1,2})?$/,
      message: 'Please enter a valid amount'
    },
    min: {
      value: 1,
      message: 'Amount must be greater than 0'
    },
    max: {
      value: 10000000,
      message: 'Amount cannot exceed £10,000,000'
    }
  },
  term: {
    required: 'This field is required',
    pattern: {
      value: /^\d+$/,
      message: 'Please enter a valid number of years'
    },
    min: {
      value: 1,
      message: 'Term must be at least 1 year'
    },
    max: {
      value: 50,
      message: 'Term cannot exceed 50 years'
    }
  },
  rate: {
    required: 'This field is required',
    pattern: {
      value: /^\d+(\.\d{1,4})?$/,
      message: 'Please enter a valid interest rate'
    },
    min: {
      value: 0.01,
      message: 'Interest rate must be greater than 0%'
    },
    max: {
      value: 50,
      message: 'Interest rate cannot exceed 50%'
    }
  },
  type: {
    required: 'Please select a mortgage type'
  }
};

export const validateField = (name: keyof MortgageFormData, value: string): string | null => {
  const rules = validationRules[name];
  
  if (rules.required && (!value || value.trim() === '')) {
    return rules.required;
  }

  if (value && 'pattern' in rules && rules.pattern && !rules.pattern.value.test(value)) {
    return rules.pattern.message;
  }

  const numValue = parseFloat(value);
  
  if (value && 'min' in rules && rules.min && numValue < rules.min.value) {
    return rules.min.message;
  }

  if (value && 'max' in rules && rules.max && numValue > rules.max.value) {
    return rules.max.message;
  }

  return null;
};

export const validateForm = (data: MortgageFormData): Record<keyof MortgageFormData, string | null> => {
  return {
    amount: validateField('amount', data.amount),
    term: validateField('term', data.term),
    rate: validateField('rate', data.rate),
    type: validateField('type', data.type)
  };
};

export const hasFormErrors = (errors: Record<keyof MortgageFormData, string | null>): boolean => {
  return Object.values(errors).some(error => error !== null);
};