import { useState, useCallback } from 'react';
import type { MortgageFormData } from '../types';
import { validateField, validateForm, hasFormErrors } from '../utils/validation';

export const useFormValidation = (initialData: MortgageFormData) => {
  const [formData, setFormData] = useState<MortgageFormData>(initialData);
  const [errors, setErrors] = useState<Record<keyof MortgageFormData, string | null>>({
    amount: null,
    term: null,
    rate: null,
    type: null
  });
  const [touchedFields, setTouchedFields] = useState<Set<keyof MortgageFormData>>(new Set());

  const updateField = useCallback((name: keyof MortgageFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation for touched fields
    if (touchedFields.has(name)) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touchedFields]);

  const validateFieldOnBlur = useCallback((name: keyof MortgageFormData) => {
    setTouchedFields(prev => new Set(prev).add(name));
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [formData]);

  const validateAllFields = useCallback(() => {
    const allErrors = validateForm(formData);
    setErrors(allErrors);
    setTouchedFields(new Set(['amount', 'term', 'rate', 'type']));
    return !hasFormErrors(allErrors);
  }, [formData]);

  const clearForm = useCallback(() => {
    setFormData({
      amount: '',
      term: '',
      rate: '',
      type: 'repayment'
    });
    setErrors({
      amount: null,
      term: null,
      rate: null,
      type: null
    });
    setTouchedFields(new Set());
  }, []);

  // const clearErrors = useCallback(() => {
  //   setErrors({
  //     amount: null,
  //     term: null,
  //     rate: null,
  //     type: null
  //   });
  // }, []);

  return {
    formData,
    errors,
    touchedFields,
    updateField,
    validateFieldOnBlur,
    validateAllFields,
    clearForm,
    // clearErrors,
    isValid: !hasFormErrors(errors),
    hasErrors: hasFormErrors(errors)
  };
};