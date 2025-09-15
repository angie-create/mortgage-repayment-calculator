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
    setTouchedFields(prevTouched => {
      if (prevTouched.has(name)) {
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
      }
      return prevTouched;
    });
  }, []);

  const validateFieldOnBlur = useCallback((name: keyof MortgageFormData) => {
    setTouchedFields(prev => new Set(prev).add(name));
    setFormData(currentFormData => {
      const error = validateField(name, currentFormData[name]);
      setErrors(prev => ({ ...prev, [name]: error }));
      return currentFormData;
    });
  }, []);

  const validateAllFields = useCallback(() => {
    return new Promise<boolean>((resolve) => {
      setFormData(currentFormData => {
        console.log('validateAllFields called with formData:', currentFormData); // Debug log
        const allErrors = validateForm(currentFormData);
        console.log('validateAllFields: allErrors:', allErrors); // Debug log
        setErrors(allErrors);
        setTouchedFields(new Set(['amount', 'term', 'rate', 'type']));
        const hasErrors = hasFormErrors(allErrors);
        console.log('validateAllFields: hasErrors:', hasErrors); // Debug log
        const isValid = !hasErrors;
        console.log('validateAllFields: isValid:', isValid); // Debug log
        resolve(isValid);
        return currentFormData;
      });
    });
  }, []);

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