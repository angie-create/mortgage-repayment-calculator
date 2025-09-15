import type { FormFieldProps } from '../../types';
import { formatNumber, addCommas } from '../../utils/calculations';
import styles from './FormField.module.css';

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  prefix,
  suffix,
  placeholder,
  required = false,
  error,
  value,
  onChange,
  onBlur
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    
    if (type === 'number') {
      inputValue = formatNumber(inputValue);
    }
    
    onChange(inputValue);
  };

  const displayValue = type === 'number' && value ? addCommas(value) : value;
  const hasError = Boolean(error);
  
  const inputId = `input-${name}`;
  const errorId = `error-${name}`;

  return (
    <div className={styles.formField}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
        {required && <span aria-label="required"> *</span>}
      </label>
      
      <div className={`${styles.inputWrapper} ${hasError ? styles.error : ''}`}>
        {prefix && (
          <span className={styles.prefix} aria-hidden="true">
            {prefix}
          </span>
        )}
        
        <input
          id={inputId}
          name={name}
          type="text"
          inputMode={type === 'number' ? 'decimal' : 'text'}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleInputChange}
          onBlur={onBlur}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={styles.input}
          autoComplete="off"
        />
        
        {suffix && (
          <span className={styles.suffix} aria-hidden="true">
            {suffix}
          </span>
        )}
      </div>
      
      {hasError && (
        <div 
          id={errorId}
          className={styles.errorMessage}
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default FormField;