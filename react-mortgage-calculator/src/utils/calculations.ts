import type { MortgageFormData, MortgageResults } from '../types';

export const calculateMortgage = (data: MortgageFormData): MortgageResults => {
  const principal = parseFloat(data.amount);
  const termYears = parseInt(data.term);
  const annualRate = parseFloat(data.rate) / 100;
  
  if (data.type === 'interestOnly') {
    const monthlyInterest = (principal * annualRate) / 12;
    const totalRepayment = (monthlyInterest * termYears * 12) + principal;
    
    return {
      monthlyRepayment: monthlyInterest,
      totalRepayment
    };
  }
  
  // Repayment mortgage calculation
  const monthlyRate = annualRate / 12;
  const numberOfPayments = termYears * 12;
  
  if (monthlyRate === 0) {
    // If no interest, just divide principal by number of payments
    const monthlyRepayment = principal / numberOfPayments;
    return {
      monthlyRepayment,
      totalRepayment: principal
    };
  }
  
  // Standard mortgage payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
  const monthlyRepayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  const totalRepayment = monthlyRepayment * numberOfPayments;
  
  return {
    monthlyRepayment,
    totalRepayment
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatNumber = (value: string): string => {
  // Remove any non-numeric characters except decimal point
  const cleaned = value.replace(/[^\d.]/g, '');
  
  // Ensure only one decimal point
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }
  
  return cleaned;
};

export const addCommas = (value: string): string => {
  const parts = value.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};