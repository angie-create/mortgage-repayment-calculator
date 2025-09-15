import type { RadioOption, MortgageFormData } from '../../types';
import FormField from '../FormField/FormField';
import RadioGroup from '../RadioGroup/RadioGroup';
import Button from '../Button/Button';
import styles from './MortgageForm.module.css';

const mortgageTypeOptions: RadioOption[] = [
  { value: 'repayment', label: 'Repayment' },
  { value: 'interestOnly', label: 'Interest Only' }
];

interface MortgageFormProps {
  formData: MortgageFormData;
  errors: Record<keyof MortgageFormData, string | null>;
  updateField: (name: keyof MortgageFormData, value: string) => void;
  validateFieldOnBlur: (name: keyof MortgageFormData) => void;
  calculateRepayments: () => Promise<void>;
  clearAll: () => void;
  isCalculating: boolean;
}

const MortgageForm: React.FC<MortgageFormProps> = ({
  formData,
  errors,
  updateField,
  validateFieldOnBlur,
  calculateRepayments,
  clearAll,
  isCalculating
}) => {

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Form submitted!'); // Debug log
    e.preventDefault();
    await calculateRepayments();
  };

  const handleClearAll = () => {
    clearAll();
    // Focus the first input after clearing
    setTimeout(() => {
      const firstInput = document.querySelector('input[name="amount"]') as HTMLInputElement;
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);
  };

  const CalculateIcon = () => (
    <svg className={styles.calculateIcon} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
    </svg>
  );

  return (
    <form className={styles.mortgageForm} onSubmit={handleSubmit} noValidate>
      <div className={styles.header}>
        <h1 className={styles.title}>Mortgage Calculator</h1>
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClearAll}
          aria-label="Clear all form fields"
        >
          Clear All
        </button>
      </div>

      <div className={styles.formFields}>
        <FormField
          label="Mortgage Amount"
          name="amount"
          type="number"
          prefix="£"
          placeholder="0"
          required
          value={formData.amount}
          onChange={(value) => updateField('amount', value)}
          onBlur={() => validateFieldOnBlur('amount')}
          error={errors.amount || undefined}
        />

        <div className={styles.termRateGroup}>
          <FormField
            label="Mortgage Term"
            name="term"
            type="number"
            suffix="years"
            placeholder="0"
            required
            value={formData.term}
            onChange={(value) => updateField('term', value)}
            onBlur={() => validateFieldOnBlur('term')}
            error={errors.term || undefined}
          />

          <FormField
            label="Interest Rate"
            name="rate"
            type="number"
            suffix="%"
            placeholder="0"
            required
            value={formData.rate}
            onChange={(value) => updateField('rate', value)}
            onBlur={() => validateFieldOnBlur('rate')}
            error={errors.rate || undefined}
          />
        </div>

        <RadioGroup
          name="type"
          options={mortgageTypeOptions}
          value={formData.type}
          onChange={(value) => updateField('type', value as 'repayment' | 'interestOnly')}
          error={errors.type || undefined}
        />
      </div>

      <div className={styles.submitSection}>
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isCalculating}
          icon={!isCalculating ? <CalculateIcon /> : undefined}
        >
          Calculate Repayments
        </Button>
      </div>
    </form>
  );
};

export default MortgageForm;