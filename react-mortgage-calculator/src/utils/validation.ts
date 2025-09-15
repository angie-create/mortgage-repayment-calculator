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
  console.log(`Validating ${name} with value:`, value, 'rules:', rules); // Debug log
  
  if (rules.required && (!value || value.trim() === '')) {
    console.log(`${name} failed: required field is empty`); // Debug log
    return rules.required;
  }

  if (value && 'pattern' in rules && rules.pattern && !rules.pattern.value.test(value)) {
    console.log(`${name} failed: pattern validation`, rules.pattern.value, 'test result:', rules.pattern.value.test(value)); // Debug log
    return rules.pattern.message;
  }

  const numValue = parseFloat(value);
  console.log(`${name} parsed number value:`, numValue); // Debug log
  
  if (value && 'min' in rules && rules.min && numValue < rules.min.value) {
    console.log(`${name} failed: min value check`, numValue, '<', rules.min.value); // Debug log
    return rules.min.message;
  }

  if (value && 'max' in rules && rules.max && numValue > rules.max.value) {
    console.log(`${name} failed: max value check`, numValue, '>', rules.max.value); // Debug log
    return rules.max.message;
  }

  console.log(`${name} passed validation`); // Debug log
  return null;
};

export const validateForm = (data: MortgageFormData): Record<keyof MortgageFormData, string | null> => {
  const result = {
    amount: validateField('amount', data.amount),
    term: validateField('term', data.term),
    rate: validateField('rate', data.rate),
    type: validateField('type', data.type)
  };
  console.log('Validation results for each field:', result); // Debug log
  return result;
};

export const hasFormErrors = (errors: Record<keyof MortgageFormData, string | null> | null | undefined): boolean => {
  console.log('hasFormErrors called with:', errors); // Debug log
  if (!errors) {
    console.log('hasFormErrors: no errors object, returning false'); // Debug log
    return false;
  }
  const errorValues = Object.values(errors);
  const hasErrors = errorValues.some(error => error !== null);
  console.log('hasFormErrors: error values:', errorValues, 'has errors:', hasErrors); // Debug log
  return hasErrors;
};