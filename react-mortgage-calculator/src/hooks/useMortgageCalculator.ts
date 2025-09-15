import { useState, useCallback } from 'react';
import type { MortgageFormData, MortgageResults } from '../types';
import { calculateMortgage } from '../utils/calculations';
import { useFormValidation } from './useFormValidation';

const initialFormData: MortgageFormData = {
  amount: '',
  term: '',
  rate: '',
  type: 'repayment'
};

export const useMortgageCalculator = () => {
  const [results, setResults] = useState<MortgageResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const {
    formData,
    errors,
    touchedFields,
    updateField,
    validateFieldOnBlur,
    validateAllFields,
    clearForm,
    // clearErrors,
    isValid,
    hasErrors
  } = useFormValidation(initialFormData);

  const calculateRepayments = useCallback(async () => {
    setIsCalculating(true);
    
    // Validate all fields first
    const isFormValid = validateAllFields();
    
    if (!isFormValid) {
      setIsCalculating(false);
      return;
    }

    try {
      // Simulate a brief loading state for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const calculatedResults = calculateMortgage(formData);
      setResults(calculatedResults);
    } catch (error) {
      console.error('Calculation error:', error);
      // In a real app, you might want to show an error message to the user
    } finally {
      setIsCalculating(false);
    }
  }, [formData, validateAllFields]);

  const clearAll = useCallback(() => {
    clearForm();
    setResults(null);
  }, [clearForm]);

  const resetResults = useCallback(() => {
    setResults(null);
  }, []);

  return {
    // Form state
    formData,
    errors,
    touchedFields,
    updateField,
    validateFieldOnBlur,
    
    // Results state
    results,
    isCalculating,
    
    // Actions
    calculateRepayments,
    clearAll,
    resetResults,
    
    // Validation state
    isValid,
    hasErrors
  };
};